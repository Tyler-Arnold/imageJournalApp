import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CameraStackScreenProps} from '../../types/CameraStackScreenProps';
import {Camera} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';
import * as Location from 'expo-location';
import {CamIcon, RevCamIcon} from '../../components/DrawerIcons';

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
                <RevCamIcon color="white" size={32} focused={true} />
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
                <CamIcon color="white" size={32} focused={true} />
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
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkgrey',
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
