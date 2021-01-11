import {useState} from 'react';
import {LogBox} from 'react-native';
import {createContainer} from 'unstated-next';
import {useInterval} from '../hooks/useInterval';

interface Image {
  uri: string;
  name: string;
  description: string;
}

interface UseImageInterface {
  images: Image[] | undefined;
  addImage: (image: Image) => void;
  removeImage: (image: Image) => void | React.Dispatch<Image[] | undefined>;
}

/**
 * Container for image access
 * @return {UseImageInterface}
 */
function useImage(): UseImageInterface {
  const [images, setImages] = useState<Image[] | undefined>();

  /**
   * Adds an image to state
   * @param {Image} image
   */
  const addImage = (image: Image): void => {
    images ? setImages([...images, image]) : setImages([image]);
  };

  /**
   * Removes an image
   * @param {Image} image
   * @return {void | React.Dispatch<React.SetStateAction<Image[] | undefined>>}
   */
  const removeImage = (image: Image) => {
    return images ? setImages(images.filter((i) => i !== image)) : setImages;
  };

  // ignore this warning because our mock api refreshes on a long timer
  // see https://github.com/facebook/react-native/issues/12981
  // (jist is that you shouldn't use long timers because backgrounding the app
  // will break them, but I don't care)
  LogBox.ignoreLogs(['Setting a timer']);

  /**
   * Updates the beach data in state every 5 minutes
   */
  useInterval(() => {
    // twat
  }, 30000);

  return {images, addImage, removeImage};
}

export const ImageContainer = createContainer(useImage);
