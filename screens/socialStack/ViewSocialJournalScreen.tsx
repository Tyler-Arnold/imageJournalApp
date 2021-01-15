/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {SocialJournalScreenProps} from '../../types/SocialStackScreenProps';
import {SocialContainer} from '../../state/SocialImageContainer';
import {FlatList} from 'react-native-gesture-handler';

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
      <View style={styles.imageView}>
        <FlatList
          data={curJournal.images}
          renderItem={(i) => (
            <Image
              source={{uri: i.item.path}}
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
          keyExtractor={(i) => i.path}
        />
      </View>
      <View style={styles.description}>
        <Text>{curJournal.name}</Text>
        <Text>{curJournal.description}</Text>
        <Text>Images: {curJournal.images!.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  imageView: {
    flex: 0.8,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
  },
  description: {
    flex: 0.2,
    alignItems: 'center',
    paddingTop: 10,
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
