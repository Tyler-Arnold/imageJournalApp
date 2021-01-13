import React from 'react';

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {RootParamsType} from './types/RootParamsType';
import {homeIcon, mapIcon} from './components/DrawerIcons';
import {CameraStackScreen} from './screens/camStack/CameraStackScreen';
import {ImageContainer} from './state/ImageContainer';
import {HomeStackScreen} from './screens/homeStack/HomeStackScreen';

/**
 * Entry point for the program
 * @return {React.FC}
 */
const App: React.FC = () => {
  const Tab = createBottomTabNavigator<RootParamsType>();
  const scheme = useColorScheme();

  return (
    <ImageContainer.Provider>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={{
                tabBarIcon: homeIcon,
              }}
            />
            <Tab.Screen
              name="Camera"
              component={CameraStackScreen}
              options={{
                tabBarIcon: mapIcon,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </ImageContainer.Provider>
  );
};

export default App;
