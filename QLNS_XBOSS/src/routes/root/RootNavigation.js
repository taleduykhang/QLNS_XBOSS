import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Components
import SplashScreen from '../../screens/root/SplashScreen';

//Routes
import AuthenticationStack from '../authentication/AuthenticationStack';
import DrawerNavigation from '../drawer/DrawerNavigation';

//Utils
import {withGlobalContext} from '../../GlobalContextProvider';

const Stack = createStackNavigator();

const fadeAnimation = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function RootNavigation(props) {
  const {isSplash, isSignin} = props.global;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isSplash ? (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      ) : isSignin ? (
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      ) : (
        <Stack.Screen
          name="Authentication"
          component={AuthenticationStack}
          options={{cardStyleInterpolator: fadeAnimation}}
        />
      )}
    </Stack.Navigator>
  );
}

export default withGlobalContext(RootNavigation);
