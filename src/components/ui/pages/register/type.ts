import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
