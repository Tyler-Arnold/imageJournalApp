import React from 'react';

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {BeachMapScreen} from './screens/BeachMapScreen';
import {HomeScreen} from './screens/HomeScreen';
import {RootParamsType} from './types/RootParamsType';
import {BeachContainer} from './state/BeachContainer';
import {homeIcon, mapIcon} from './components/DrawerIcons';
import {CameraScreen} from './screens/CameraScreen';

/**
 * Entry point for the program
 * @return {React.FC}
 */
const App: React.FC = () => {
  const Tab = createBottomTabNavigator<RootParamsType>();
  const scheme = useColorScheme();

  return (
    <BeachContainer.Provider>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: homeIcon,
              }}
            />
            <Tab.Screen
              name="BeachMap"
              component={BeachMapScreen}
              options={{
                tabBarIcon: mapIcon,
              }}
            />
            <Tab.Screen
              name="Camera"
              component={CameraScreen}
              options={{
                tabBarIcon: mapIcon,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </BeachContainer.Provider>
  );
};

export default App;
