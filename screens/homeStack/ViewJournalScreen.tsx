import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ImageContainer} from '../../state/ImageContainer';
import {JournalScreenProps} from '../../types/HomeStackScreenProps';
import {FirestoreMutation} from '@react-firebase/firestore';

/**
 * Screen for viewing a journal
 * @param {JournalScreenProps} props
 * @return {*}
 */
export const ViewJournalScreen: React.FC<JournalScreenProps> = (
    props: JournalScreenProps,
) => {
  const imgState = ImageContainer.useContainer();
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
      <FirestoreMutation type="add" path="/journals/">
        {({runMutation}) => {
          return (
            <View style={styles.screenView}>
              <Image
                source={{uri: curJournal.images![0].uri}}
                style={styles.image}
              />
              <View style={styles.description}>
                <Text>{curJournal.key}</Text>
                <Text>{curJournal.name}</Text>
                <Text>{curJournal.description}</Text>
                <Text>Images: {curJournal.images!.length}</Text>
              </View>
              <TouchableOpacity
                style={styles.publishButton}
                onPress={() =>
                  runMutation({
                    id: curJournal.id,
                    name: curJournal.name,
                    description: curJournal.description,
                  }).then((res) => {
                    if (res.key) {
                      imgState.removeJournal(curJournal);
                      imgState.addJournal({...curJournal, key: res.key});
                    }
                    return console.log('ran mutation', res);
                  })
                }
              >
                <Text>Make Public</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </FirestoreMutation>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  image: {
    flex: 0.7,
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
