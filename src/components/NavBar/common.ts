import { config } from '../../config';
import { Style } from '../../types/react';

export interface IHandleCloseMenu {
  (): void;
}

export interface IHandleOpenMenu {
  (event: React.MouseEvent<HTMLElement>): void;
}

export const styleForActive: Style = {
  opacity: 1,
  'p > button': {
    fontWeight: 700,
  },
};

export const styleForAny: Style = {
  opacity: 0.7,
};

export type MenuItem = {
  title: string;
  link: string;
};

export const menuItems: MenuItem[] = [
  {
    title: 'Home',
    link: config.urls.public.home,
  },
  {
    title: 'About',
    link: config.urls.public.about,
  },
];

export const mobileMenuBreakPoint = 'sm';
