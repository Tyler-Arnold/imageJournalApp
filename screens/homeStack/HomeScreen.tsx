import firebase from 'firebase';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {JournalList} from '../../components/JournalList';
import {ImageContainer} from '../../state/ImageContainer';
import {HomeScreenProps} from '../../types/HomeStackScreenProps';

/**
 * Screen containing the images and journals flatlist
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
    <Text>No Images Were Found, why not take some?</Text>
  );

  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 120,
    height: 40,
    borderRadius: 10,
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
    borderRadius: 10,
    overflow: 'hidden',
  },
});
