import { Route } from '@angular/router';
import { Home } from './pages/home/home';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
];
