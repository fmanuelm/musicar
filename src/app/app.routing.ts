import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            /*
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },*/ {
                path: 'components',
                loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
            }, {
                path: 'forms',
                loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
            }, {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            }, {
                path: 'maps',
                loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
            }, {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            }, {
                path: 'charts',
                loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
            }, {
                path: 'calendar',
                loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
            }, {
                path: 'clientes',
                loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'clientes-grupos',
                loadChildren: () => import('./clientsgroups/clientsgroups.module').then(m => m.ClientsgroupsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'disponibilidad-usuario',
                loadChildren: () => import('./usersavailability/usersavailability.module').then(m => m.UsersavailabilityModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'contratos',
                loadChildren: () => import('./contrats/contrats.module').then(m => m.ContratsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'sucursal-instalacion',
                loadChildren: () => import('./branch-facility/branch-facility.module').then(m => m.BranchFacilityModule),
                canActivate: [AuthGuard]
            }, {
                path: 'equipos',
                loadChildren: () => import('./equipment/equipment.module').then(m => m.EquipmentModule),
                canActivate: [AuthGuard]
            }, {
                path: 'puntos',
                loadChildren: () => import('./points/points.module').then(m => m.PointsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'monitor-equipos',
                loadChildren: () => import('./equipment-monitor/equipment-monitor.module').then(m => m.EquipmentMonitorModule),
                canActivate: [AuthGuard]
            }, {
                path: 'grupos-puntos',
                loadChildren: () => import('./points-groups/points-groups.module').then(m => m.PointsGroupsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'usuarios',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                canActivate: [AuthGuard]
            }, {
                path: 'mensajes',
                loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
                canActivate: [AuthGuard]
            }, {
                path: '',
                loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
            }, {
                path: '',
                loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
        },

    ]
    },
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [Auth2Guard]
    }
];
