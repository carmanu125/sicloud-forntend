import { Routes } from '@angular/router';
import { EmpresaList } from './features/empresas/pages/empresa-list/empresa-list';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './features/dashboard/pages/dashboard-home/dashboard-home';
import { EmpresaCreate } from './features/empresas/pages/empresa-create/empresa-create';
import { EmpresaEdit } from './features/empresas/pages/empresa-edit/empresa-edit';
import { PresupuestoList } from './features/presupuesto/pages/presupuesto-list/presupuesto-list';
import { PresupuestoCreate } from './features/presupuesto/pages/presupuesto-create/presupuesto-create';
import { CdpList } from './features/cdp/pages/cdp-list/cdp-list';

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
          path: 'presupuesto',
          component: PresupuestoList
        },
        {
          path: 'presupuesto/nuevo',
          component: PresupuestoCreate
        },
        {
          path: 'cdp',
          component: CdpList
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }

      ]
    }
];
