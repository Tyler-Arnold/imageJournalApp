import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CameraStackScreenProps} from '../../types/CameraStackScreenProps';
import {Camera} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';
import * as Location from 'expo-location';

/**
 * Screen containing camera
 * @param {BeachMapScreenProps} props
 * @return {React.FC<BeachMapScreenProps>}
 */
export const CameraScreen: React.FC<CameraStackScreenProps> = (
    props: CameraStackScreenProps,
) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const {status: camStatus} = await Camera.requestPermissionsAsync();
      const {status: locStatus} = await Location.requestPermissionsAsync();
      setHasPermission(camStatus === 'granted' && locStatus === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or location</Text>;
  }

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        {isFocused && (
          <Camera style={styles.camera} type={type} ref={camera}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  camera.current?.takePictureAsync({
                    onPictureSaved: (picture) => {
                      // picture saved, do some stuff
                      props.navigation.navigate('Preview', {
                        image: picture,
                      });
                    },
                  });
                }}
              >
                <Text style={styles.text}> Snap </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
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
