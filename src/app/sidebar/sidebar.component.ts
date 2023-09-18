import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router, NavigationEnd } from '@angular/router';
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

export const ROUTES: RouteInfo[] = [{
    path: '/disponibilidad-usuario/',
    title: 'Disponibilidad Usuario',
    type: 'sub',
    icontype: 'apps',
    collapse: 'disponibilidaduser',
    children: [
        { path: 'list', title: 'Listar disponibilidad Usuario', ab: 'LDU' },
        { path: 'create', title: 'Crear disponibilidad Usuario', ab: 'CDU' },
    ]
},
    {
    path: '/clientes-grupos/',
    title: 'Grupos Clientes',
    type: 'sub',
    icontype: 'apps',
    collapse: 'clientsgroups',
    children: [
        { path: 'list', title: 'Listar grupos Cliente', ab: 'LGC' },
        { path: 'create', title: 'Crear Grupo Cliente', ab: 'CGC' },
    ]
},
    {
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
    path: '/puntos/',
    title: 'Puntos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'puntos',
    children: [
        { path: 'list', title: 'Listar puntos', ab: 'LP' },
        { path: 'create', title: 'Crear punto', ab: 'CP' },
    ]
}, {
    path: '/equipos/',
    title: 'Equipos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'equipos',
    children: [
        { path: 'list', title: 'Listar equipos', ab: 'LE' },
        { path: 'create', title: 'Crear equipo', ab: 'CE' },
    ]
}, {
    path: '/grupos-puntos/',
    title: 'Grupos de puntos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'grupos-puntos',
    children: [
        { path: 'list', title: 'Listar grupos de puntos', ab: 'LE' },
        { path: 'create', title: 'Crear grupos de punto', ab: 'CE' },
    ]
}, {
    path: '/usuarios/',
    title: 'Usuarios',
    type: 'sub',
    icontype: 'apps',
    collapse: 'usuarios',
    children: [
        { path: 'list', title: 'Listar Usuarios', ab: 'LE' },
        { path: 'create', title: 'Crear usuarios', ab: 'CE' },
    ]
}, {
    path: '/monitor-equipos/',
    title: 'Monitor de equipos',
    type: 'sub',
    icontype: 'apps',
    collapse: 'monitor-equipos',
    children: [
        { path: 'list', title: 'Listar monitor de equipos', ab: 'LE' },
    ]
}, {
    path: '/mensajes/',
    title: 'Mensajes',
    type: 'sub',
    icontype: 'apps',
    collapse: 'mensajes',
    children: [
        { path: 'home', title: 'Inicio', ab: 'I' },
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
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    constructor(private router:Router) {}
    public menuItems: any[];
    ps: any;
    isMenuOpen: boolean = true;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
    logout()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        this.router.navigate(['/auth/login']);
    }
    ngOnInit() {
        /*
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
        */
        
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isMenuOpen = true;
            }
        });
        
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
