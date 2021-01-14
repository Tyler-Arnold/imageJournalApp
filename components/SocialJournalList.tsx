import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  FirestoreImage,
  FirestoreJournal,
  SocialContainer,
} from '../state/SocialImageContainer';
import {UserContainer} from '../state/UserContainer';

interface JournalListProps {
  onPressItem: (j: FirestoreJournal) => void;
}

/**
 * List of journals
 * @param {JournalListProps} props
 * @return {React.FC<JournalData[]>}
 */
export const SocialJournalList: React.FC<JournalListProps> = (
    props: JournalListProps,
) => {
  const userState = UserContainer.useContainer();
  const socState = SocialContainer.useContainer();
  const journals = socState.socialJournals;
  /**
   * An image thumbnail in the carousel of a journal
   * @param {ImageData} i
   * @return {React.FC<ImageData>}
   */
  const carouselItem: React.FC<FirestoreImage> = (i: FirestoreImage) => {
    const imagePath = i.path;
    return <Image source={{uri: imagePath}} style={styles.carouselImg} />;
  };

  const styles = StyleSheet.create({
    journalItem: {
      flexDirection: 'column',
      backgroundColor: 'lightgrey',
      margin: 10,
      padding: 5,
    },
    journalTitle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    journalCarousel: {
      height: 80,
      backgroundColor: 'grey',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      margin: 5,
    },
    carouselImg: {
      height: 70,
      width: 70,
      marginHorizontal: 5,
    },
  });

  /**
   * Renders a journal
   * @param {FirestoreJournal} j
   * @return {React.FC<JournalListItemProps>}
   */
  const journalListItem: React.FC<JournalListItemProps> = (
      j: JournalListItemProps,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => j.onPressItem(j)}
        style={styles.journalItem}
      >
        <Text style={styles.journalTitle}>{j.name}</Text>
        <View style={styles.journalCarousel}>
          {j.images ? (
            <FlatList
              data={j.images}
              renderItem={(i) => carouselItem(i.item)}
              keyExtractor={(i) => i.path}
              horizontal={true}
            />
          ) : (
            <Text>No Images</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={journals}
      renderItem={(j) =>
        journalListItem({...j.item, onPressItem: props.onPressItem})
      }
      keyExtractor={(j) => j.key}
      extraData={userState.token}
    />
  );
};

interface JournalListItemProps extends FirestoreJournal {
  onPressItem: (j: FirestoreJournal) => void;
}
