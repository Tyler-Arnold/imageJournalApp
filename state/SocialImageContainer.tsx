import firebase from 'firebase';
import {useState} from 'react';
import {createContainer} from 'unstated-next';

export interface FirestoreJournal {
  name: string;
  description: string;
  id: number;
  key: string;
  images?: FirestoreImage[];
}

export interface FirestoreImage {
  name: string;
  description: string;
  lati: number;
  long: number;
  path: string;
}

/**
 * Social container
 * @return {*}
 */
const useSocial = () => {
  const [socialJournals, setSocialJournals] = useState<FirestoreJournal[]>();

  /**
   * Adds an image to a firestore journal
   * @param {FirestoreImage} image
   * @param {FirestoreJournal} journal
   */
  const addImageToJournal = (
      image: FirestoreImage,
      journal: FirestoreJournal,
  ) => {
    socialJournals && socialJournals.length
      ? setSocialJournals([
        ...socialJournals.map((sj) =>
            sj.key === journal.key
              ? {
                ...sj,
                images: sj.images ? sj.images.concat([image]) : [image],
              }
              : sj,
        ),
      ])
      : setSocialJournals([{...journal, images: [image]}]);
  };

  /**
   * Adds a journal to state
   * @param {FirestoreJournal} journal
   */
  const addSocialJournal = (journal: FirestoreJournal) => {
    socialJournals && socialJournals.length
      ? socialJournals.find((sj) => sj.key === journal.key)
        ? null
        : setSocialJournals([...socialJournals, journal])
      : setSocialJournals([journal]);
  };

  /**
   * Gets data from firestore and chucks it in state
   */
  const triggerGetData = () => {
    const query = firebase.firestore().collectionGroup('journals');
    const quSnap = query.get();
    const tempJournals: FirestoreJournal[] = [];

    quSnap.then((doc) => {
      doc.docs.forEach((d) => {
        const newJournal = {
          name: d.data().name as string,
          description: d.data().description as string,
          id: d.data().id as number,
          key: d.ref.path.split('/').pop()! as string,
        };
        tempJournals.push(newJournal);
        addSocialJournal(newJournal);
      });
    });

    setTimeout(() => {
      tempJournals?.forEach((sj) => {
        firebase
            .firestore()
            .collectionGroup('journalImages')
            .where('journal', '==', `/journals/${sj.key}`)
            .get()
            .then((doc) => {
              return doc.forEach((d) => {
                firebase
                    .firestore()
                    .doc(d.data().image as string)
                    .get()
                    .then((img) => {
                      addImageToJournal(
                          {
                            name: img.data()?.name as string,
                            description: img.data()?.description as string,
                            lati: img.data()?.lati as number,
                            long: img.data()?.long as number,
                            path: img.data()?.path as string,
                          },
                          sj,
                      );
                    });
              });
            });
      });
    }, 2000);
  };

  return {
    socialJournals,
    addSocialJournal,
    addImageToJournal,
    triggerGetData,
  };
};

export const SocialContainer = createContainer(useSocial);
