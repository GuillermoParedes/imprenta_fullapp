import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'MENU',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Pabel administrativo',
          route: '/home/dashboard',

        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Clientes',
          route: '/home/clients',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Productos',
          route: '/home/products',
        },
        {
          icon: 'assets/icons/heroicons/outline/bookmark.svg',
          label: 'Pedidos',
          route: '/home/orders',
        },
        {
          icon: 'assets/icons/heroicons/outline/information-circle.svg',
          label: 'Reportes',
          route: '/home/dashboard',
        },
      ],
    },
  ];
}
