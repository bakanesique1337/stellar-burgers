import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (path: string) =>
    currentPath === path || currentPath.startsWith(`${path}/`);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${isLinkActive('/') && styles.link_active}`}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to='/feed'
            className={`${styles.link} ${isLinkActive('/feed') && styles.link_active}`}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <Link
          to='/profile'
          className={`${styles.link} ${styles.link_position_last} ${isLinkActive('/profile') && styles.link_active}`}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
