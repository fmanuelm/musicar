import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
// export const ROUTES: RouteInfo[] = [{
//     path: '/dashboard',
//     title: 'Dashboard',
//     type: 'link',
//     icontype: 'dashboard'
// }, {
//     path: '/components',
//     title: 'Components',
//     type: 'sub',
//     icontype: 'apps',
//     collapse: 'components',
//     children: [
//         { path: 'buttons', title: 'Buttons', ab: 'B' },
//         { path: 'grid', title: 'Grid System', ab: 'GS' },
//         { path: 'panels', title: 'Panels', ab: 'P' },
//         { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
//         { path: 'notifications', title: 'Notifications', ab: 'N' },
//         { path: 'icons', title: 'Icons', ab: 'I' },
//         { path: 'typography', title: 'Typography', ab: 'T' }
//     ]
// }, {
//     path: '/forms',
//     title: 'Forms',
//     type: 'sub',
//     icontype: 'content_paste',
//     collapse: 'forms',
//     children: [
//         { path: 'regular', title: 'Regular Forms', ab: 'RF' },
//         { path: 'extended', title: 'Extended Forms', ab: 'EF' },
//         { path: 'validation', title: 'Validation Forms', ab: 'VF' },
//         { path: 'wizard', title: 'Wizard', ab: 'W' }
//     ]
// }, {
//     path: '/tables',
//     title: 'Tables',
//     type: 'sub',
//     icontype: 'grid_on',
//     collapse: 'tables',
//     children: [
//         { path: 'regular', title: 'Regular Tables', ab: 'RT' },
//         { path: 'extended', title: 'Extended Tables', ab: 'ET' },
//         { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
//     ]
// }, {
//     path: '/maps',
//     title: 'Maps',
//     type: 'sub',
//     icontype: 'place',
//     collapse: 'maps',
//     children: [
//         { path: 'google', title: 'Google Maps', ab: 'GM' },
//         { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
//         { path: 'vector', title: 'Vector Map', ab: 'VM' }
//     ]
// }, {
//     path: '/widgets',
//     title: 'Widgets',
//     type: 'link',
//     icontype: 'widgets'

// }, {
//     path: '/charts',
//     title: 'Charts',
//     type: 'link',
//     icontype: 'timeline'

// }, {
//     path: '/calendar',
//     title: 'Calendar',
//     type: 'link',
//     icontype: 'date_range'
// }, {
//     path: '/pages',
//     title: 'Pages',
//     type: 'sub',
//     icontype: 'image',
//     collapse: 'pages',
//     children: [
//         { path: 'pricing', title: 'Pricing', ab: 'P' },
//         { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
//         { path: 'login', title: 'Login Page', ab: 'LP' },
//         { path: 'register', title: 'Register Page', ab: 'RP' },
//         { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
//         { path: 'user', title: 'User Page', ab: 'UP' }
//     ]
// }
// ];
export const ROUTES: RouteInfo[] = [{
    path: '/clientes/',
    title: 'Clientes',
    type: 'sub',
    icontype: 'apps',
    collapse: 'clients',
    children: [
        { path: 'list', title: 'Listar clientes', ab: 'LC' },
        { path: 'create', title: 'Crear cliente', ab: 'CC' },
    ]
}, {
    path: '/sucursal-instalacion/',
    title: 'Sucursal instalación',
    type: 'sub',
    icontype: 'apps',
    collapse: 'sucursal-instalacion',
    children: [
        { path: 'list', title: 'Listar sucursales instalación', ab: 'LSI' },
        { path: 'create', title: 'Crear sucursal de instalación', ab: 'CSI' },
    ]
}, {
    path: '/contratos/',
    title: 'Contratos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'contratos',
    children: [
        { path: 'list', title: 'Listar contratos', ab: 'LC' },
        { path: 'create', title: 'Crear contrato', ab: 'CC' },
    ]
}, {
    path: '/equipos/',
    title: 'Equipos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'equipos',
    children: [
        { path: 'list', title: 'Listar equipos', ab: 'LE' },
        // { path: 'create', title: 'Crear cliente', ab: 'CC' },
    ]
}, {
    path: '/puntos/',
    title: 'Puntos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'puntos',
    children: [
        { path: 'list', title: 'Listar puntos', ab: 'LP' },
        // { path: 'create', title: 'Crear cliente', ab: 'CC' },
    ]
}, {
    path: '/forms',
    title: 'Forms',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'forms',
    children: [
        { path: 'regular', title: 'Regular Forms', ab: 'RF' },
        { path: 'extended', title: 'Extended Forms', ab: 'EF' },
        { path: 'validation', title: 'Validation Forms', ab: 'VF' },
        { path: 'wizard', title: 'Wizard', ab: 'W' }
    ]
}];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
