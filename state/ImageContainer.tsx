import {useState} from 'react';
import {LogBox} from 'react-native';
import {createContainer} from 'unstated-next';
import {useInterval} from '../hooks/useInterval';

export interface ImageData {
  key: string;
  uri: string;
  name: string;
  description: string;
  width: number;
  height: number;
  exif?: unknown;
  lati: number;
  long: number;
}

export interface JournalData {
  key: string;
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
  editImage: (
    image: ImageData
  ) => void | React.Dispatch<React.SetStateAction<ImageData[] | undefined>>;
  journals: JournalData[] | undefined;
  addJournal: (journal: JournalData) => void;
  removeJournal: (journal: JournalData) => void | null;
  updateJournal: (journal: JournalData) => void | null;
  addImgToJournal: (journal: JournalData, image: ImageData) => void | null;
  removeImgFromJournal: (journal: JournalData, image: ImageData) => void | null;
  updateJournalKey: (journal: JournalData, newKey: string) => void | null;
}

/**
 * Container for image access
 * @return {UseImageInterface}
 */
function useImage(): UseImageInterface {
  const [images, setImages] = useState<ImageData[] | undefined>();
  const [journals, setJournals] = useState<JournalData[]>();

  const {addImage, removeImage, editImage} = imageInteractions(
      images,
      setImages,
  );

  const {
    addJournal,
    removeJournal,
    updateJournal,
    addImgToJournal,
    removeImgFromJournal,
    updateJournalKey,
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
    editImage,
    journals,
    addJournal,
    removeJournal,
    updateJournal,
    addImgToJournal,
    removeImgFromJournal,
    updateJournalKey,
  };
}

export const ImageContainer = createContainer(useImage);

type JournalState = React.Dispatch<
  React.SetStateAction<JournalData[] | undefined>
>;

/**
 * Handles basic interactions for journals
 * @param {(JournalData[] | undefined)} journals
 * @param {JournalState} setJournals
 * @return {*}
 */
function journalInteractions(
    journals: JournalData[] | undefined,
    setJournals: JournalState,
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
   * Updates a journal
   * @param {JournalData} journal
   * @return {*}
   */
  const updateJournal = (journal: JournalData) => {
    return journals
      ? setJournals(journals.map((j) => (j.key === journal.key ? journal : j)))
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
            j.id === journal.id
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

  /**
   * Updates a journal in state with it's key in firestore
   * @param {JournalData} journal
   * @param {string} newKey
   * @return {*}
   */
  const updateJournalKey = (journal: JournalData, newKey: string) => {
    return journals
      ? setJournals([
        ...journals.map((j) => (j === journal ? {...j, key: newKey} : j)),
      ])
      : null;
  };

  return {
    addJournal,
    removeJournal,
    updateJournal,
    addImgToJournal,
    removeImgFromJournal,
    updateJournalKey,
  };
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

  /**
   * Edits an image's details
   * @param {ImageData} image
   * @return {*}
   */
  const editImage = (image: ImageData) => {
    return images
      ? setImages(images.map((i) => (i.key === image.key ? image : i)))
      : setImages;
  };

  return {addImage, removeImage, editImage};
}
