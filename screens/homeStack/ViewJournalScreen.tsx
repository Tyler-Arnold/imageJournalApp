import {Image, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {ImageContainer} from '../../state/ImageContainer';
import {JournalScreenProps} from '../../types/HomeStackScreenProps';

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
      <Image source={{uri: curJournal.images[0].uri}} style={styles.image} />
      <View style={styles.description}>
        <Text>{curJournal.id}</Text>
        <Text>{curJournal.name}</Text>
        <Text>{curJournal.description}</Text>
        <Text>Images: {curJournal.images.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  image: {
    flex: 0.8,
  },
  description: {
    flex: 0.2,
  },
});
