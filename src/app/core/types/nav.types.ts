export interface NavItem {
  name: string;
  icon?: string;
  href: string;
  childrens?: NavItem[];
  expanded?: boolean;
  external?: boolean;
}

export enum NavStatus{
  Collapsed = 'Collapsed',
  Expand = 'Expand',
  Pinned = 'Pinned'
}
