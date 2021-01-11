import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PicturePreviewScreen} from './PicturePreviewScreen';
import {CameraScreen} from './CameraScreen';

/**
 * Screen containing a stack navigator for the actual screens used in
 * the camera section
 *
 * @return {React.FC}
 */
export const CameraStackScreen: React.FC = () => {
  const CamStack = createStackNavigator();

  return (
    <CamStack.Navigator>
      <CamStack.Screen name="Camera" component={CameraScreen} />
      <CamStack.Screen name="Preview" component={PicturePreviewScreen} />
    </CamStack.Navigator>
  );
};
