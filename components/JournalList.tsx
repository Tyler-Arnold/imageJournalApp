import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ImageContainer, JournalData} from '../state/ImageContainer';
import React from 'react';
import {Image, Text, View} from 'react-native';

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
    <TouchableOpacity onPress={() => j.onPressItem(j)}>
      <Text>{j.name}</Text>
      <View>
        {j.images ? (
          <Image source={{uri: j.images[0].uri}} />
        ) : (
          <Text>No Images</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

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
