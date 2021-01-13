import React from 'react';
import {ImageBackground, View, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageContainer} from '../../state/ImageContainer';
import {ViewScreenProps} from '../../types/HomeStackScreenProps';

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // open a journal modal or something
          }}
        >
          <Text style={styles.text}>Add to Journal</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 18,
    color: 'grey',
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
