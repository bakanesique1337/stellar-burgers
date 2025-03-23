import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { IngredientType, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/burgerIngredientsSlice';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(selectIngredients);

  const buns = ingredients.filter((item) => item.type === IngredientType.BUN);
  const mains = ingredients.filter((item) => item.type === IngredientType.MAIN);
  const sauces = ingredients.filter(
    (item) => item.type === IngredientType.SAUCE
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>(IngredientType.BUN);
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab(IngredientType.BUN);
    } else if (inViewSauces) {
      setCurrentTab(IngredientType.SAUCE);
    } else if (inViewFilling) {
      setCurrentTab(IngredientType.MAIN);
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === IngredientType.BUN)
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === IngredientType.MAIN)
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === IngredientType.SAUCE)
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
