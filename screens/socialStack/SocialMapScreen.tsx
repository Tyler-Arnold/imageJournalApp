import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SocialMapScreenProps} from '../../types/SocialStackScreenProps';
import {SocialContainer} from '../../state/SocialImageContainer';
import {JournalList} from '../../components/JournalList';
import {SocialJournalList} from '../../components/SocialJournalList';

/**
 * Social map screen
 * @param {SocialMapScreenProps} props
 * @return {React.FC<SocialMapScreenProps>}
 */
export const SocialMapScreen: React.FC<SocialMapScreenProps> = (
    props: SocialMapScreenProps,
) => {
  const socialState = SocialContainer.useContainer();
  useEffect(socialState.triggerGetData, []);

  return (
    <View style={styles.screenView}>
      <SocialJournalList onPressItem={(j) => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  mapView: {
    flex: 1,
  },
  item: {
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  journalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  homeImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    marginVertical: 8,
    backgroundColor: 'red',
  },
});
