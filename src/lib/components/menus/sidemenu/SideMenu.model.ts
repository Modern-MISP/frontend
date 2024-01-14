import type { Route } from '$lib/models/Route.interface';
export type SideMenuRoute = Route & { children?: Route[] };
