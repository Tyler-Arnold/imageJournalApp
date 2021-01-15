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
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {JournalList} from '../../components/JournalList';
import {
  ImageContainer,
  JournalData,
  ImageData,
} from '../../state/ImageContainer';
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
  const editImage = imgState.editImage;
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [imageData, setImageData] = useState({
    name: curImage?.name ?? 'Image Name',
    description: curImage?.description ?? 'Description',
  });

  if (!curImage) {
    return <Text>No image was found</Text>;
  }

  /**
   * Handles the creation of a new Journal
   */
  const handleNewJournal = () => {
    const newJournalId = imgState.journals?.length ?? 0;
    imgState.addJournal({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: curImage.uri.split('/').pop()!.split('.')[0],
      id: newJournalId,
      name: 'Test',
      description: 'test description',
      images: [curImage],
    });
    props.navigation.navigate('Journal', {id: newJournalId});
  };

  /**
   * Handle adding an image to a journal
   * @param {JournalData} j journal to add to
   */
  const handleAddToJournal = (j: JournalData): void => {
    imgState.addImgToJournal(j, curImage);
    setJournalModalVisible(false);
    props.navigation.navigate('Journal', {id: j.id});
  };

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

      <View style={styles.detailsView}>
        <Text>{curImage?.name}</Text>
        <Text>{curImage?.description}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={styles.text}>Edit Details</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={handleNewJournal}>
          <Text style={styles.text}>Create Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setJournalModalVisible(true)}
        >
          <Text style={styles.text}>Add to Journal</Text>
        </TouchableOpacity>
      </View>

      <JournalModal
        modalVisible={journalModalVisible}
        setModalVisible={setJournalModalVisible}
        handleAddToJournal={handleAddToJournal}
      />

      <EditImageDataModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        dataState={{imageData, setImageData}}
        editImage={(n, d) =>
          editImage({...curImage, name: n, description: d})
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  image: {
    flex: 0.5,
    marginTop: -25,
  },
  detailsView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    flex: 0.25,
  },
  buttView: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    elevation: 3,
  },
  button: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    margin: 5,
    height: 30,
    borderRadius: 10,
  },
  detailsButton: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginHorizontal: 100,
    marginVertical: 10,
    borderRadius: 10,
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
    borderRadius: 30,
  },
  journalView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollModal: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 90,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
});

// why even use a linter if you're gonna use it like this
// eslint-disable-next-line valid-jsdoc
/**
 * Modal for adding an image to a journal
 * @param {{
 *   modalVisible: boolean;
 *   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
 *   handleAddToJournal: (j: JournalData) => void;
 * }} props
 * @return {*}
 */
const JournalModal = (props: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToJournal: (j: JournalData) => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <View style={styles.modal}>
        <View style={styles.journalView}>
          <JournalList onPressItem={props.handleAddToJournal} />
        </View>
        <TouchableOpacity
          onPress={() => props.setModalVisible(false)}
          style={styles.button}
        >
          <Text style={styles.text}> Close Modal </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

/**
 * Edit image data modal
 * @param {{}} props
 * @return {*}
 */
const EditImageDataModal = (props: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dataState: {
    imageData: {
      name: string;
      description: string;
    };
    setImageData: React.Dispatch<
      React.SetStateAction<{
        name: string;
        description: string;
      }>
    >;
  };
  editImage: (name: string, description: string) => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <ScrollView
        style={styles.scrollModal}
        contentContainerStyle={{flex: 0}}
      >
        <View style={styles.image}>
          <TextInput
            style={styles.textInput}
            onChangeText={(t) =>
              props.dataState.setImageData({
                ...props.dataState.imageData,
                name: t,
              })
            }
            value={props.dataState.imageData.name}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(t) =>
              props.dataState.setImageData({
                ...props.dataState.imageData,
                description: t,
              })
            }
            value={props.dataState.imageData.description}
          />
        </View>
        <View style={styles.buttView}>
          <TouchableOpacity
            onPress={() => {
              props.editImage(
                  props.dataState.imageData.name,
                  props.dataState.imageData.description,
              );
              return props.setModalVisible(false);
            }}
            style={styles.button}
          >
            <Text> Save Changes </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.setModalVisible(false)}
            style={styles.button}
          >
            <Text> Cancel </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
