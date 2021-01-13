import {useState} from 'react';
import {LogBox} from 'react-native';
import {createContainer} from 'unstated-next';
import {useInterval} from '../hooks/useInterval';

export interface ImageData {
  uri: string;
  name: string;
  description: string;
}

export interface JournalData {
  id: number;
  name: string;
  description: string;
  images: ImageData[] | undefined;
}

interface UseImageInterface {
  images: ImageData[] | undefined;
  addImage: (image: ImageData) => void;
  removeImage: (
    image: ImageData
  ) => void | React.Dispatch<ImageData[] | undefined>;
  journals: JournalData[] | undefined;
  addJournal: (journal: JournalData) => void;
  removeJournal: (journal: JournalData) => void | null;
  addImgToJournal: (journal: JournalData, image: ImageData) => void | null;
  removeImgFromJournal: (journal: JournalData, image: ImageData) => void | null;
}

/**
 * Container for image access
 * @return {UseImageInterface}
 */
function useImage(): UseImageInterface {
  const [images, setImages] = useState<ImageData[] | undefined>();
  const [journals, setJournals] = useState<JournalData[]>();

  const {addImage, removeImage} = imageInteractions(images, setImages);

  const {
    addJournal,
    removeJournal,
    addImgToJournal,
    removeImgFromJournal,
  } = journalInteractions(journals, setJournals);

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

  return {
    images,
    addImage,
    removeImage,
    journals,
    addJournal,
    removeJournal,
    addImgToJournal,
    removeImgFromJournal,
  };
}

export const ImageContainer = createContainer(useImage);

/**
 * Handles basic interactions for journals
 * @param {(JournalData[] | undefined)} journals
 * @param {(React.Dispatch<
 *  React.SetStateAction<
 *    JournalData[] | undefined>>)} setJournals
 * @return {*}
 */
function journalInteractions(
    journals: JournalData[] | undefined,
    setJournals: React.Dispatch<React.SetStateAction<JournalData[] | undefined>>,
) {
  /**
   * Adds a journal
   * @param {JournalData} journal
   * @return {void}
   */
  const addJournal = (journal: JournalData) => {
    return journals
      ? setJournals([...journals, journal])
      : setJournals([journal]);
  };

  /**
   * Removes a journal
   * @param {JournalData} journal
   * @return {void | null}
   */
  const removeJournal = (journal: JournalData) => {
    return journals
      ? setJournals([...journals.filter((j) => j !== journal)])
      : null;
  };

  /**
   * Adds an image to a journal. This is bad code.
   * @param {JournalData} journal
   * @param {ImageData} image
   * @return {void | null}
   */
  const addImgToJournal = (journal: JournalData, image: ImageData) => {
    return journals
      ? setJournals([
        ...journals.map((j) =>
            j === journal
              ? {...j, images: j.images ? j.images.concat([image]) : [image]}
              : j,
        ),
      ])
      : null;
  };

  /**
   * Removes an image to a journal. This is worse code.
   * @param {JournalData} journal
   * @param {ImageData} image
   * @return {void | null}
   */
  const removeImgFromJournal = (journal: JournalData, image: ImageData) => {
    return journals
      ? setJournals([
        ...journals.map((j) =>
            j === journal
              ? {
                ...j,
                images: j.images
                    ? j.images.filter((i) => i !== image)
                    : [image],
              }
              : j,
        ),
      ])
      : null;
  };

  return {addJournal, removeJournal, addImgToJournal, removeImgFromJournal};
}

/**
 * Handles basic interactions for images
 *
 * @param {(ImageData[] | undefined)} images
 * @param {*} setImages
 * @return {*}
 */
function imageInteractions(
    images: ImageData[] | undefined,
    setImages: React.Dispatch<React.SetStateAction<ImageData[] | undefined>>,
) {
  /**
   * Adds an image to state
   * @param {ImageData} image
   * @return {void}
   */
  const addImage = (image: ImageData) => {
    return images ? setImages([...images, image]) : setImages([image]);
  };

  /**
   * Removes an image
   * @param {ImageData} image
   * @return {void |
   *  React.Dispatch<React.SetStateAction<ImageData[] | undefined>>}
   */
  const removeImage = (image: ImageData) => {
    return images ? setImages(images.filter((i) => i !== image)) : setImages;
  };

  return {addImage, removeImage};
}
