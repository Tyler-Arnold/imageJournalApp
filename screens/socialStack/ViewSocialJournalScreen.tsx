/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Image, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {SocialJournalScreenProps} from '../../types/SocialStackScreenProps';
import {SocialContainer} from '../../state/SocialImageContainer';

/**
 * Screen for viewing a journal
 * @param {SocialJournalScreenProps} props
 * @return {*}
 */
export const ViewSocialJournalScreen: React.FC<SocialJournalScreenProps> = (
    props: SocialJournalScreenProps,
) => {
  const socState = SocialContainer.useContainer();
  const curJournal = socState.socialJournals?.find(
      (j) => j.key === props.route.params.img.key,
  );

  if (!curJournal) {
    return <Text>Journal not found</Text>;
  }

  if (!curJournal.images) {
    return <Text>Journal empty</Text>;
  }

  return (
    <View style={styles.screenView}>
      <View style={styles.screenView}>
        <Image
          source={{uri: curJournal.images![0].path}}
          style={styles.image}
        />
        <View style={styles.description}>
          <Text>{curJournal.key}</Text>
          <Text>{curJournal.name}</Text>
          <Text>{curJournal.description}</Text>
          <Text>Images: {curJournal.images!.length}</Text>
        </View>
      </View>
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
