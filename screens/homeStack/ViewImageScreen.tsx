import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {JournalList} from '../../components/JournalList';
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
  const [modalVisible, setModalVisible] = useState(false);

  if (!curImage) {
    return <Text>why is there no image</Text>;
  }

  return (
    <SafeAreaView style={styles.screenView}>
      <ScrollView style={styles.image}>
        <ImageBackground
          source={{uri: imageUri}}
          style={{
            ...styles.image,
            height:
              curImage.height
              / (curImage.width / Dimensions.get('window').width),
            width: Dimensions.get('window').width,
          }}
          resizeMode="contain"
        ></ImageBackground>
      </ScrollView>

      <View style={styles.image}>
        <Text>{curImage?.name}</Text>
        <Text>{curImage?.description}</Text>
        <Text>{curImage?.uri}</Text>
      </View>

      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: curImage.lati,
          longitude: curImage.long,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{latitude: curImage.lati, longitude: curImage.long}}
        />
      </MapView>

      <View style={styles.buttView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            imgState.addJournal({
              id: imgState.journals?.length ?? 0,
              name: 'Test',
              description: 'test description',
              images: [curImage],
            })
          }
        >
          <Text style={styles.text}>Create New Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.text}>Add to Journal</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <JournalList
            onPressItem={(j) => {
              imgState.addImgToJournal(j, curImage);
              setModalVisible(false);
            }}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.button}
          >
            <Text> Close Modal </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  image: {
    flex: 0.6,
  },
  mapView: {
    flex: 0.2,
  },
  buttView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 90,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
});
