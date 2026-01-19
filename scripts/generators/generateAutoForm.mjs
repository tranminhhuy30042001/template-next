import path from 'path'
import fs from 'fs'
import { ensureDir } from '../core/fs.mjs'
import { writeFile } from '../core/rollback.mjs'

export function generateAutoForm({
  name,
  pascal,
  fields,
  componentDir,
}) {
  const dir = path.join(componentDir, name)
  ensureDir(dir)

  const schemaFile = path.join(dir, `${pascal}.schema.ts`)
  const formFile = path.join(dir, `${pascal}Form.tsx`)
  const indexFile = path.join(dir, `index.ts`)

  // ===== Schema =====
  const schemaFields = fields.map((f) => {
    const rules = f.required
      ? `rules: [{ required: true, message: '${f.label} is required' }],`
      : ''

    return `{
  name: "${f.name}" as keyof ${pascal},
  label: "${f.label}",
  type: "${f.type}",
  ${rules}
  ${f.api ? `api: "${f.api}",` : ''}
  ${f.dependsOn ? `dependsOn: "${f.dependsOn}",` : ''}
  colSpan: ${f.colSpan ?? 24},
}`
  })

  const schemaCode = `
import type { FieldSchema } from "@/components-v2/AutoForm";
import type { ${pascal} } from "@/types/${name}";

export const ${name}Schema: FieldSchema<${pascal}>[] = [
${schemaFields.join(',\n')}
];
`.trim()

  // ===== Form =====
  const formCode = `
"use client";
import { AutoForm } from "@/components-v2/AutoForm";
import { ${name}Schema } from "./${pascal}.schema";
import type { ${pascal} } from "@/types/${name}";
import { Form } from "antd";

type Props = {
  initialValues?: Partial<${pascal}>;
  onSubmit: (values: ${pascal}) => void;
};

export function ${pascal}Form({ initialValues, onSubmit }: Props) {
  const [form] = Form.useForm<${pascal}>();

  return (
    <AutoForm<${pascal}>
      form={form}
      schema={${name}Schema}
      onSubmit={onSubmit}
    />
  );
}
`.trim()

  writeFile(schemaFile, schemaCode)
  writeFile(formFile, formCode)

  // ===== index.ts =====
  const exportLine = `export * from "./${pascal}Form";`
  if (fs.existsSync(indexFile)) {
    const old = fs.readFileSync(indexFile, 'utf-8')
    if (!old.includes(exportLine)) {
      writeFile(indexFile, `${old}\n${exportLine}`)
    }
  } else {
    writeFile(indexFile, exportLine)
  }
}
