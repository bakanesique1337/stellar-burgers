import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  selectFeedsLoading,
  selectFeedsOrders
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const isOrdersLoading = useSelector(selectFeedsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
