import {StackScreenProps} from '@react-navigation/stack';

// for some reason it doesn't work as an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootParamsType = {
  Home: undefined;
  View: { image: string };
};

export type HomeScreenProps = StackScreenProps<RootParamsType, 'Home'>;
export type ViewScreenProps = StackScreenProps<RootParamsType, 'View'>;
