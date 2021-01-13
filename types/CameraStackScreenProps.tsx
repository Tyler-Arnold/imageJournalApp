import {StackScreenProps} from '@react-navigation/stack';
import {CameraCapturedPicture} from 'expo-camera';

// for some reason it doesn't work as an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootParamsType = {
  Camera: undefined;
  Preview: { image: CameraCapturedPicture };
};

export type CameraStackScreenProps = StackScreenProps<RootParamsType, 'Camera'>;
export type PreviewStackScreenProps = StackScreenProps<
  RootParamsType,
  'Preview'
>;
