import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {ViewImageScreen} from './ViewImageScreen';

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
      <HomeStack.Screen name="View" component={ViewImageScreen} />
    </HomeStack.Navigator>
  );
};
