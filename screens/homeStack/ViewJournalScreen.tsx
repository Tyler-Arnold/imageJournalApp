/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ImageContainer} from '../../state/ImageContainer';
import {JournalScreenProps} from '../../types/HomeStackScreenProps';
import {FirestoreBatchedWrite} from '@react-firebase/firestore';
import firebase from 'firebase';
import {SocialContainer} from '../../state/SocialImageContainer';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * Screen for viewing a journal
 * @param {JournalScreenProps} props
 * @return {*}
 */
export const ViewJournalScreen: React.FC<JournalScreenProps> = (
    props: JournalScreenProps,
) => {
  const imgState = ImageContainer.useContainer();
  const socState = SocialContainer.useContainer();
  const curJournal = imgState.journals?.find(
      (j) => j.id === props.route.params.id,
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [imageData, setImageData] = useState({
    name: curJournal?.name ?? 'Journal Name',
    description: curJournal?.description ?? 'Description',
  });
  const updateJournal = imgState.updateJournal;

  if (!curJournal) {
    return <Text>Journal not found</Text>;
  }

  if (!curJournal.images) {
    return <Text>Journal empty</Text>;
  }

  return (
    <View style={styles.screenView}>
      <View style={styles.screenView}>
        <FlatList
          data={curJournal.images}
          renderItem={(i) => (
            <Image
              source={{uri: i.item.uri}}
              style={{
                ...styles.image,
                height:
                  i.item.height
                  / (i.item.width / Dimensions.get('window').width),
                width: Dimensions.get('window').width,
              }}
              key={i.index}
              resizeMode={'contain'}
            />
          )}
          horizontal={true}
          keyExtractor={(i) => i.key}
          style={styles.imageView}
        />
        <View style={styles.description}>
          <Text>{curJournal.name}</Text>
          <Text>{curJournal.description}</Text>
          <Text>Images: {curJournal.images!.length}</Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => setEditModalVisible(true)}
          >
            <Text style={styles.text}>Edit Details</Text>
          </TouchableOpacity>
        </View>
        <FirestoreBatchedWrite>
          {({addMutationToBatch, commit}) => {
            return (
              <TouchableOpacity
                style={styles.publishButton}
                onPress={() => {
                  addMutationToBatch({
                    path: `/journals/${curJournal.key}`,
                    value: {
                      id: curJournal.id,
                      name: curJournal.name,
                      description: curJournal.description,
                    },
                    type: 'set',
                  });

                  curJournal.images?.map(async (i) => {
                    const storageRef = firebase.storage().ref();
                    const storeImgPath = `images/${
                      i.key.split('.')[0]
                    }${i.name.replace(' ', '-')}.${i.uri.split('.').pop()!}`;
                    const imgRef = storageRef.child(storeImgPath);
                    const response = await fetch(i.uri);
                    const blob = await response.blob();

                    const task = imgRef.put(blob);
                    task.then(() =>
                      Alert.alert(`Upload successful: ${i.name}`),
                    );
                    addMutationToBatch({
                      path: `/images/${i.key}`,
                      value: {
                        name: i.name,
                        description: i.description,
                        lati: i.lati,
                        long: i.long,
                        path: storeImgPath,
                      },
                      type: 'set',
                    });
                    addMutationToBatch({
                      path: `journalImages/${i.key}${curJournal.key}`,
                      value: {
                        image: `/images/${i.key}`,
                        journal: `/journals/${curJournal.key}`,
                      },
                      type: 'set',
                    });
                  });
                  setTimeout(() => {
                    commit().then(() => {
                      socState.triggerGetData();
                      return Alert.alert('Data uploaded probably!');
                    });
                  }, 4000);
                }}
              >
                <Text style={styles.text}>Make Public</Text>
              </TouchableOpacity>
            );
          }}
        </FirestoreBatchedWrite>
      </View>
      <EditJournalDataModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        dataState={{imageData, setImageData}}
        editJournal={(n, d) =>
          updateJournal({...curJournal, name: n, description: d})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  imageView: {
    flex: 0.5,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
  description: {
    flex: 0.3,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  publishButton: {
    flex: 0.1,
    backgroundColor: 'grey',
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  buttView: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 0,
    backgroundColor: 'grey',
    elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
    marginVertical: 10,
    height: 40,
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

/**
 * Edit journal data modal
 * @param {{}} props
 * @return {*}
 */
const EditJournalDataModal = (props: {
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
  editJournal: (name: string, description: string) => void;
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
              props.editJournal(
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
