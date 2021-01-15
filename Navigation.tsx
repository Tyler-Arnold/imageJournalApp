import React from 'react';
import {useColorScheme} from 'react-native-appearance';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {RootParamsType} from './types/RootParamsType';
import {HomeIcon, CamIcon, SocialIcon} from './components/DrawerIcons';
import {CameraStackScreen} from './screens/camStack/CameraStackScreen';
import {HomeStackScreen} from './screens/homeStack/HomeStackScreen';
import {LoginScreen} from './screens/loginStack/LoginScreen';
import {UserContainer} from './state/UserContainer';
import {SocialStackScreen} from './screens/socialStack/SocialStackScreen';

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
                tabBarIcon: HomeIcon,
              }}
            />
            <Tab.Screen
              name="Social"
              component={SocialStackScreen}
              options={{
                tabBarIcon: SocialIcon,
              }}
            />
            <Tab.Screen
              name="Camera"
              component={CameraStackScreen}
              options={{
                tabBarIcon: CamIcon,
              }}
            />
          </>
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarIcon: SocialIcon,
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
