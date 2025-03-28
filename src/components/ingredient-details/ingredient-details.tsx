import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams().id;

  const ingredientData = useSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === ingredientId)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
