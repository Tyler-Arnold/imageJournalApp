import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {JournalList} from '../../components/JournalList';
import {ImageContainer} from '../../state/ImageContainer';
import {HomeScreenProps} from '../../types/HomeStackScreenProps';

/**
 * Screen containing the beach flatlist
 * @param {HomeScreenProps} props
 * @return {React.FC<HomeScreenProps> }
 */
export const HomeScreen: React.FC<HomeScreenProps> = (
    props: HomeScreenProps,
) => {
  const images = ImageContainer.useContainer();
  const actImages = images.images;

  const ImageIcons = actImages ? (
    actImages.map((i, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.homeImage}
          onPress={() => {
            props.navigation.navigate('View', {image: i.uri});
          }}
        >
          <Image source={{uri: i.uri}} style={{flex: 1}}></Image>
        </TouchableOpacity>
      );
    })
  ) : (
    <Text>No fukin images</Text>
  );

  return (
    <View style={styles.view}>
      <View style={styles.imgContainer}>{ImageIcons}</View>
      <View style={styles.journalContainer}>
        <JournalList
          onPressItem={(j) => {
            props.navigation.navigate('Journal', {id: j.id});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: 'skyblue',
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
