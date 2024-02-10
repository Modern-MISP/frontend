export type Module = {
  id?: string;
  scope?: string;
  name?: string;
  icon?: string;
  icon_class?: string;
  inputs?: number;
  outputs?: number;
  description?: string;
  module_type?: string;
  version?: string;
  blocking?: boolean;
  misp_core_format?: boolean;
  expect_misp_core_format?: boolean;
  misp_module?: boolean;
  is_custom?: boolean;
  disabled?: boolean;
  support_filters?: boolean;
  html_template?: string;
  params?: ModuleParam[];
};

export type ModuleParam = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  options?: { [key: string]: string };
};
