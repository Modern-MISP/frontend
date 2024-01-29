export interface ActionBarEntry {
  icon: string;
  label: string;
  action: string | (() => void);
}
