import React from 'react';
import {useColorScheme} from 'react-native-appearance';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {RootParamsType} from './types/RootParamsType';
import {homeIcon, mapIcon} from './components/DrawerIcons';
import {CameraStackScreen} from './screens/camStack/CameraStackScreen';
import {HomeStackScreen} from './screens/homeStack/HomeStackScreen';
import {LoginScreen} from './screens/loginStack/LoginScreen';
import {UserContainer} from './state/UserContainer';

/**
 * Navigation
 * @return {*}
 */
export const Navigation: React.FC = () => {
  const Tab = createBottomTabNavigator<RootParamsType>();
  const scheme = useColorScheme();
  const userState = UserContainer.useContainer();
  const isSignedIn = userState.token ? true : false;

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Home">
        {isSignedIn ? (
          <>
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
          </>
        ) : (
          <Tab.Screen name="Login" component={LoginScreen} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
