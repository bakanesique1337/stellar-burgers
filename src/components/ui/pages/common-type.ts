import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
