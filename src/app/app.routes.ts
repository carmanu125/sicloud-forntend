import { Routes } from '@angular/router';
import { EmpresaList } from './features/empresas/pages/empresa-list/empresa-list';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './features/dashboard/pages/dashboard-home/dashboard-home';
import { EmpresaCreate } from './features/empresas/pages/empresa-create/empresa-create';
import { EmpresaEdit } from './features/empresas/pages/empresa-edit/empresa-edit';

export const routes: Routes = [
    {
      path: '',
      component: DashboardLayout,
      children: [

        {
          path: 'dashboard',
          component: DashboardHome
        },

        {
          path: 'empresas',
          component: EmpresaList
        },
        {
          path: 'empresas/nueva',
          component: EmpresaCreate
        },

        {
          path: 'empresas/editar/:id',
          component: EmpresaEdit
        },

        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }

      ]
    }
];
