import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ImageContainer, JournalData} from '../state/ImageContainer';
import React from 'react';
import {Image, Text, View} from 'react-native';

/**
 * Renders a journal
 * @param {JournalData} j
 * @return {React.FC<JournalData>}
 */
const journalListItem: React.FC<JournalData> = (j: JournalData) => {
  return (
    <TouchableOpacity>
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

/**
 * List of journals
 * @return {React.FC<JournalData[]>}
 */
export const JournalList: React.FC<JournalData[]> = () => {
  const imgState = ImageContainer.useContainer();
  const journals = imgState.journals;
  return (
    <>
      <FlatList
        data={journals}
        renderItem={(j) => journalListItem(j.item)}
        keyExtractor={(j) => j.name}
      />
    </>
  );
};
