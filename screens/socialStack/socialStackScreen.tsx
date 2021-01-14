import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SocialMapScreen} from './SocialMapScreen';
import {ViewSocialJournalScreen} from './ViewSocialJournalScreen';

/**
 * Screen containing a stack navigator for the actual screens used in
 * the social section
 *
 * @return {React.FC}
 */
export const SocialStackScreen: React.FC = () => {
  const SocialStack = createStackNavigator();

  return (
    <SocialStack.Navigator>
      <SocialStack.Screen name="Social" component={SocialMapScreen} />
      <SocialStack.Screen
        name="ViewJournal"
        component={ViewSocialJournalScreen}
      />
    </SocialStack.Navigator>
  );
};
