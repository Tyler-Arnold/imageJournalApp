import React from 'react';
import {ImageBackground, View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageContainer} from '../state/ImageContainer';
import {ViewScreenProps} from '../types/HomeStackScreenProps';

/**
 * Screen for viewing an image and it's attributes
 * @param {ViewScreenProps} props
 * @return {React.FC<ViewScreenProps>}
 */
export const ViewImageScreen: React.FC<ViewScreenProps> = (
    props: ViewScreenProps,
) => {
  const imageUri = props.route.params.image;
  const imgState = ImageContainer.useContainer();
  const curImage = imgState.images?.find((i) => i.uri === imageUri);

  return (
    <SafeAreaView style={styles.screenView}>
      <ScrollView
        style={styles.screenView}
        contentContainerStyle={styles.screenView}
      >
        <ImageBackground
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        ></ImageBackground>
        <View>
          <Text>{curImage?.name}</Text>
          <Text>{curImage?.description}</Text>
          <Text>{curImage?.uri}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {flex: 0},
});
