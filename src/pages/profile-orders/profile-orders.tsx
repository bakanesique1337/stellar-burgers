import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectUserLoading,
  selectUserOrders
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectUserOrders);
  const isUserIsLoading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isUserIsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
