export type Module = {
  id?: string;
  name?: string;
  icon?: string;
  description?: string;
  module_type?: string;
  version?: string;
  blocking?: boolean;
  expect_misp_core_format?: boolean;
  misp_module?: boolean;
  is_custom?: boolean;
  disabled?: boolean;
};
