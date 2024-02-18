export interface Route {
  name: string;
  icon: string;
  href: string;
  hidden?: boolean;
  userAccess?: 'viewOnly' | 'none';
}
