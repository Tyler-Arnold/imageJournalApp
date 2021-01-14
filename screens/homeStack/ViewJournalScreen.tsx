/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ImageContainer} from '../../state/ImageContainer';
import {JournalScreenProps} from '../../types/HomeStackScreenProps';
import {FirestoreBatchedWrite} from '@react-firebase/firestore';
import firebase from 'firebase';
import {SocialContainer} from '../../state/SocialImageContainer';

/**
 * Screen for viewing a journal
 * @param {JournalScreenProps} props
 * @return {*}
 */
export const ViewJournalScreen: React.FC<JournalScreenProps> = (
    props: JournalScreenProps,
) => {
  const imgState = ImageContainer.useContainer();
  const socState = SocialContainer.useContainer();
  const curJournal = imgState.journals?.find(
      (j) => j.id === props.route.params.id,
  );

  if (!curJournal) {
    return <Text>Journal not found</Text>;
  }

  if (!curJournal.images) {
    return <Text>Journal empty</Text>;
  }

  return (
    <View style={styles.screenView}>
      <FirestoreBatchedWrite>
        {({addMutationToBatch, commit}) => {
          return (
            <View style={styles.screenView}>
              <FlatList
                data={curJournal.images}
                renderItem={(i) => (
                  <Image
                    source={{uri: i.item.uri}}
                    style={{
                      ...styles.image,
                      height:
                        i.item.height
                        / (i.item.width / Dimensions.get('window').width),
                      width: Dimensions.get('window').width,
                    }}
                    key={i.index}
                    resizeMode={'contain'}
                  />
                )}
                horizontal={true}
                keyExtractor={(i) => i.key}
                style={styles.imageView}
              />
              <View style={styles.description}>
                <Text>{curJournal.key}</Text>
                <Text>{curJournal.name}</Text>
                <Text>{curJournal.description}</Text>
                <Text>Images: {curJournal.images!.length}</Text>
              </View>
              <TouchableOpacity
                style={styles.publishButton}
                onPress={() => {
                  addMutationToBatch({
                    path: `/journals/${curJournal.key}`,
                    value: {
                      id: curJournal.id,
                      name: curJournal.name,
                      description: curJournal.description,
                    },
                    type: 'set',
                  });

                  curJournal.images?.map(async (i) => {
                    const storageRef = firebase.storage().ref();
                    const storeImgPath = `images/${
                      i.key.split('.')[0]
                    }${i.name.replace(' ', '-')}.${i.uri.split('.').pop()!}`;
                    const imgRef = storageRef.child(storeImgPath);
                    const response = await fetch(i.uri);
                    const blob = await response.blob();

                    const task = imgRef.put(blob);
                    task.then(() =>
                      Alert.alert(`Upload successful: ${i.name}`),
                    );
                    addMutationToBatch({
                      path: `/images/${i.key}`,
                      value: {
                        name: i.name,
                        description: i.description,
                        lati: i.lati,
                        long: i.long,
                        path: storeImgPath,
                      },
                      type: 'set',
                    });
                    addMutationToBatch({
                      path: `journalImages/${i.key}${curJournal.key}`,
                      value: {
                        image: `/images/${i.key}`,
                        journal: `/journals/${curJournal.key}`,
                      },
                      type: 'set',
                    });
                  });
                  setTimeout(() => {
                    commit().then(() => {
                      socState.triggerGetData();
                      return Alert.alert('Data uploaded probably!');
                    });
                  }, 4000);
                }}
              >
                <Text>Make Public</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </FirestoreBatchedWrite>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  imageView: {
    flex: 0.7,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
  },
  description: {
    flex: 0.2,
  },
  publishButton: {
    flex: 0.1,
    backgroundColor: 'lightgrey',
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
