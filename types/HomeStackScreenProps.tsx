import {StackScreenProps} from '@react-navigation/stack';

// for some reason it doesn't work as an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootParamsType = {
  Home: undefined;
  View: { image: string };
  Journal: { id: number };
};

export type HomeScreenProps = StackScreenProps<RootParamsType, 'Home'>;
export type ViewScreenProps = StackScreenProps<RootParamsType, 'View'>;
export type JournalScreenProps = StackScreenProps<RootParamsType, 'Journal'>;
