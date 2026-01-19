"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Button, FormInstance } from "antd";
import type { Rule } from "antd/es/form";
import { AutoField } from "./AutoField";
import { NamePath } from "antd/es/form/interface";

export interface Option {
  value: string | number;
  label: string;
}

export type FieldType =
  | "input" | "select" | "autocomplete" | "number"
  | "checkbox" | "textarea" | "upload" | "dragger"
  | "multi-select";

export interface FieldSchema<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  rules?: Rule[];
  api?: string;
  dependsOn?: keyof T;
  colSpan?: number;
  placeholder?: string;
  options?: Option[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: string[];
}

interface AutoFormProps<T extends Record<string, unknown>> {
  schema: FieldSchema<T>[];
  onSubmit: (values: T) => void;
  form?: FormInstance<T>;
  renderButtons?: (form: FormInstance<T>) => React.ReactNode;
}

export const AutoForm = <T extends Record<string, unknown>>({
  schema,
  onSubmit,
  form,
  renderButtons,
}: AutoFormProps<T>) => {
  const [internalForm] = Form.useForm<T>();
  const usedForm = form || internalForm;

  const [optionsMap, setOptionsMap] = useState<Record<string, Option[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const hasStaticOptions = (field: FieldSchema<T>) =>
    Array.isArray(field.options) && field.options.length > 0;

  useEffect(() => setMounted(true), []);

  const fetchOptions = useCallback(async (fieldName: keyof T, api: string, parentValue?: unknown) => {
    const key = String(fieldName);
    // Chuyển parentValue về string an toàn để gắn vào URL
    const param = parentValue !== undefined && parentValue !== null ? String(parentValue) : "";
    const url = param ? `${api}?parent=${param}` : api;

    console.log(`🚀 [Fetch API] Field: ${key} | URL: ${url}`);
    setLoadingMap((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = (await res.json()) as Option[];

      console.log(`✅ [Success] Field: ${key}`, data);
      setOptionsMap((prev) => ({ ...prev, [key]: data }));
    } catch (err) {
      console.error(`❌ [Error] Field: ${key}:`, err);
      setOptionsMap((prev) => ({ ...prev, [key]: [] }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  useEffect(() => {
    schema.forEach((f) => {
      if (f.type === "select" && !f.dependsOn) {
        if (hasStaticOptions(f)) {
          setOptionsMap((prev) => ({
            ...prev,
            [String(f.name)]: f.options!,
          }));
        } else if (f.api) {
          fetchOptions(f.name, f.api);
        }
      }
    });
  }, [schema, fetchOptions]);

  const handleValuesChange = (changedValues: Partial<T>) => {
    const changedKey = Object.keys(changedValues)[0] as keyof T;
    const newValue = changedValues[changedKey];

    schema.forEach((field) => {
      if (field.dependsOn === changedKey) {
        const fieldKey = String(field.name);
        const targetPath = field.name as unknown as NamePath<T>;

        console.log(`[Reset] ${fieldKey} due to ${String(changedKey)} change`);

        usedForm.setFieldValue(targetPath, undefined);

        if (hasStaticOptions(field)) {
          setOptionsMap((prev) => ({
            ...prev,
            [fieldKey]: field.options!,
          }));
          return;
        }

        setOptionsMap((prev) => ({
          ...prev,
          [fieldKey]: [],
        }));

        if (
          field.api &&
          newValue !== undefined &&
          newValue !== null &&
          newValue !== ""
        ) {
          fetchOptions(field.name, field.api, newValue);
        }
      }
    });
  };

  if (!mounted) return null;

  return (
    <Form<T>
      form={usedForm}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={[16, 0]}>
        {schema.map((field) => {
          const fieldNameStr = String(field.name);

          const isFieldDisabled = field.dependsOn
            ? !usedForm.getFieldValue(field.dependsOn as unknown as NamePath<T>)
            : false;

          return (
            <Col key={fieldNameStr} span={field.colSpan ?? 24}>
              <AutoField<T>
                field={field}
                options={optionsMap[fieldNameStr] ?? field.options ?? []}
                loading={loadingMap[fieldNameStr] ?? false}
                disabled={isFieldDisabled}
              />
            </Col>
          );
        })}
      </Row>

      <div style={{ marginTop: 24 }}>
        {renderButtons ? (
          renderButtons(usedForm)
        ) : (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};