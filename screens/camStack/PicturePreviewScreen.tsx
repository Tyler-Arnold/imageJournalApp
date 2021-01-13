import * as FileSystem from 'expo-file-system';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {ImageContainer} from '../../state/ImageContainer';
import {PreviewStackScreenProps} from '../../types/CameraStackScreenProps';

/**
 * Screen containing camera
 * @param {PreviewStackScreenProps} props
 * @return {React.FC<PreviewStackScreenProps>}
 */
export const PicturePreviewScreen: React.FC<PreviewStackScreenProps> = (
    props: PreviewStackScreenProps,
) => {
  const images = ImageContainer.useContainer();

  const prevImageUri = props.route.params?.image;
  const newImageUri = `${
    FileSystem.documentDirectory
  }journalImages/${prevImageUri.split('/').pop()}`;
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <ImageBackground source={{uri: prevImageUri}} style={styles.camera}>
          <Text style={styles.text}>{prevImageUri}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={styles.text}> Reject </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                FileSystem.copyAsync({
                  from: prevImageUri,
                  to: newImageUri,
                });
                const image = {
                  uri: newImageUri,
                  name: 'New Image',
                  description: 'Description of a new image',
                };
                images.addImage(image);
                props.navigation.goBack();
              }}
            >
              <Text style={styles.text}> Appronk </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
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
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
