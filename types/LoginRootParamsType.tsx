// for some reason it doesn't work as an interface

import {StackScreenProps} from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LoginRootParamsType = {
  login: undefined;
};
export type LoginScreenProps = StackScreenProps<LoginRootParamsType, 'login'>;
