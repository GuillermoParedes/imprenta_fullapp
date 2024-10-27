import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/home/dashboard',
         
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Clientes',
          route: '/home/clients',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Productos',
          route: '/home/components/table',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Pedidos',
          route: '/home/components/table',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Reportes',
          route: '/home/components/table',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
        //   label: 'Erros',
        //   route: '/home/errors',
        //   children: [
        //     { label: '404', route: '/home/errors/404' },
        //     { label: '500', route: '/home/errors/500' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/cube.svg',
        //   label: 'Components',
        //   route: '/home/components',
        //   children: [{ label: 'Table', route: '/home/components/table' }],
        // },
      ],
    },
  ];
}
