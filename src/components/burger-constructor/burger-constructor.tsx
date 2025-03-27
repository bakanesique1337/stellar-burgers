import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  orderBurger,
  resetConstructor,
  selectConstructorItems,
  selectConstructorLoading,
  selectConstructorModalData
} from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const isUserAuthenticated = useSelector(selectIsAuthenticated);
  const isUserAuthChecked = useSelector(selectIsAuthChecked);
  const orderRequest = useSelector(selectConstructorLoading);
  const orderModalData = useSelector(selectConstructorModalData);

  const onOrderClick = () => {
    if (!constructorItems?.bun || orderRequest) return;
    if (!isUserAuthenticated || !isUserAuthChecked) {
      console.log('user is not authenticated');
      console.log('isUserAuthenticated:', isUserAuthenticated);
      console.log('isUserAuthChecked:', isUserAuthChecked);
      navigate('/login');
      return;
    }

    console.log('user is authenticated');
    console.log('isUserAuthenticated:', isUserAuthenticated);
    console.log('isUserAuthChecked:', isUserAuthChecked);
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
