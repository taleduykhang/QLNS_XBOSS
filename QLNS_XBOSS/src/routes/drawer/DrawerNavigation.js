import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//Routes
import DashboardStack from '../../routes/dashboard/DashboardStack';
//Components
import DrawerContent from './drawerContent';
const Drawer = createDrawerNavigator();
export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
