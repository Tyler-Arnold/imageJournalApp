import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageContainer} from '../state/ImageContainer';
import {HomeScreenProps} from '../types/HomeScreenProps';

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
            props.navigation.navigate('Camera', {
              screen: 'Preview',
              params: {image: i.uri},
            });
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
      <View style={styles.container}>{ImageIcons}</View>
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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  homeImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    marginVertical: 8,
    backgroundColor: 'red',
  },
});
