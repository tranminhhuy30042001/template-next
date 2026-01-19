import { askFormConfig } from "./core/promptForm.mjs";
import { generateAutoForm } from "./generators/generateAutoForm.mjs";

const componentDir = "app/components";

const config = await askFormConfig();

generateAutoForm({
  name: config.name,
  pascal: config.pascal,
  fields: config.fields,
  componentDir,
});

console.log("✅ AutoForm generated successfully");
