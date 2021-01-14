import {StackScreenProps} from '@react-navigation/stack';
import {
  FirestoreImage,
  FirestoreJournal,
} from '../state/SocialImageContainer';

// for some reason it doesn't work as an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootParamsType = {
  SocialMap: undefined;
  ViewImage: { img: FirestoreImage };
  ViewJournal: { img: FirestoreJournal };
};

export type SocialMapScreenProps = StackScreenProps<
  RootParamsType,
  'SocialMap'
>;
export type SocialViewScreenProps = StackScreenProps<
  RootParamsType,
  'ViewImage'
>;
export type SocialJournalScreenProps = StackScreenProps<
  RootParamsType,
  'ViewJournal'
>;
