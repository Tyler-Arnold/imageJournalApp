import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PicturePreviewScreen} from './PicturePreviewScreen';
import {HomeScreen} from './HomeScreen';

/**
 * Screen containing a stack navigator for the actual screens used in
 * the home section
 *
 * @return {React.FC}
 */
export const HomeStackScreen: React.FC = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Preview" component={PicturePreviewScreen} />
    </HomeStack.Navigator>
  );
};
