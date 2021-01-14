import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SocialMapScreenProps} from '../../types/SocialStackScreenProps';
import {SocialContainer} from '../../state/SocialImageContainer';

/**
 * Social map screen
 * @param {SocialMapScreenProps} props
 * @return {React.FC<SocialMapScreenProps>}
 */
export const SocialMapScreen: React.FC<SocialMapScreenProps> = (
    props: SocialMapScreenProps,
) => {
  const socialState = SocialContainer.useContainer();
  useEffect(socialState.triggerGetData, []);

  return (
    <View style={styles.screenView}>
      <Text
        style={styles.screenView}
        onPress={() => socialState.triggerGetData()}
      >
        {JSON.stringify(socialState.socialJournals)}
      </Text>
      <MapView
        style={styles.mapView}
        region={{
          latitude:
            socialState.socialJournals?.pop()?.images?.pop()?.lati
            ?? 50.7411413,
          longitude:
            socialState.socialJournals?.pop()?.images?.pop()?.long
            ?? -1.8756891,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {socialState.socialJournals?.map((sj) => {
          const imgs = sj.images;
          imgs ? (
            <Marker
              coordinate={{
                latitude: imgs[0].lati,
                longitude: imgs[0].lati,
              }}
            />
          ) : null;
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  mapView: {
    flex: 1,
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
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  journalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  homeImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    marginVertical: 8,
    backgroundColor: 'red',
  },
});
