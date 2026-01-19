"use client";
import React from "react";
import { Form, Input, Select, AutoComplete, InputNumber, Checkbox, Upload, Button } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { FieldSchema, Option } from "./AutoForm";
import type { UploadFile } from "antd/es/upload/interface";

interface AutoFieldProps<T> {
  field: FieldSchema<T>;
  options: Option[];
  loading: boolean;
  disabled: boolean;
}

// Chỉnh sửa normFile để định nghĩa type rõ ràng
const normFile = (e: { fileList: UploadFile[] } | UploadFile[]) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

export const AutoField = <T extends Record<string, unknown>>({
  field,
  options,
  loading,
  disabled,
}: AutoFieldProps<T>) => {
  const { type, label, placeholder, rules, prefix, suffix, autoComplete, name } = field;
  const nameStr = String(name);

  switch (type) {
    case "input":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <Input placeholder={placeholder} />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <Select
            placeholder={placeholder ?? `Chọn ${label}`}
            options={[{ value: "", label: "-- Trống --" }, ...options]}
            loading={loading}
            disabled={disabled}
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      );

    case "multi-select":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <Select
            mode="multiple"
            placeholder={placeholder ?? `Chọn ${label}`}
            options={options}
            loading={loading}
            disabled={disabled}
            showSearch
            allowClear
            maxTagCount="responsive"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      );

    case "number":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <InputNumber style={{ width: "100%" }} prefix={prefix} suffix={suffix} />
        </Form.Item>
      );

    case "checkbox":
      return (
        <Form.Item name={nameStr} valuePropName="checked" rules={rules}>
          <Checkbox>{label}</Checkbox>
        </Form.Item>
      );

    case "textarea":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <Input.TextArea showCount maxLength={200} placeholder={placeholder} />
        </Form.Item>
      );

    case "upload":
    case "dragger":
      const isDragger = type === "dragger";
      return (
        <Form.Item
          name={nameStr}
          label={label}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={rules}
        >
          {isDragger ? (
            <Upload.Dragger name="files" action="/api/upload" multiple>
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Kéo thả file vào đây</p>
            </Upload.Dragger>
          ) : (
            <Upload name="file" action="/api/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Upload file</Button>
            </Upload>
          )}
        </Form.Item>
      );

    case "autocomplete":
      return (
        <Form.Item name={nameStr} label={label} rules={rules}>
          <AutoComplete
            options={autoComplete?.map((v) => ({ value: v, label: v }))}
            placeholder={placeholder}
          >
            <Input />
          </AutoComplete>
        </Form.Item>
      );

    default:
      return null;
  }
};