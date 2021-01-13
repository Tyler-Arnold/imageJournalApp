import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
      <ScrollView
        style={styles.screenView}
        contentContainerStyle={styles.screenView}
      >
        <ImageBackground
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        ></ImageBackground>
        <View style={styles.image}>
          <Text>{curImage?.name}</Text>
          <Text>{curImage?.description}</Text>
          <Text>{curImage?.uri}</Text>
        </View>
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
      </ScrollView>
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
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    padding: 5,
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
