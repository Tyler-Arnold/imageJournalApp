import {FlatList} from 'react-native-gesture-handler';
import {
  ImageContainer,
  ImageData,
  JournalData,
} from '../state/ImageContainer';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface JournalListProps {
  onPressItem: (j: JournalData) => void;
}

/**
 * List of journals
 * @param {JournalListProps} props
 * @return {React.FC<JournalData[]>}
 */
export const JournalList: React.FC<JournalListProps> = (
    props: JournalListProps,
) => {
  const imgState = ImageContainer.useContainer();
  const journals = imgState.journals;
  return (
    <FlatList
      data={journals}
      renderItem={(j) =>
        journalListItem({...j.item, onPressItem: props.onPressItem})
      }
      keyExtractor={(j) => j.id.toString()}
    />
  );
};

interface JournalListItemProps extends JournalData {
  onPressItem: (j: JournalData) => void;
}

/**
 * Renders a journal
 * @param {JournalData} j
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
            keyExtractor={(i) => i.uri}
            horizontal={true}
          />
        ) : (
          <Text>No Images</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 * An image thumbnail in the carousel of a journal
 * @param {ImageData} i
 * @return {React.FC<ImageData>}
 */
const carouselItem: React.FC<ImageData> = (i: ImageData) => {
  return <Image source={{uri: i.uri}} style={styles.carouselImg} />;
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
