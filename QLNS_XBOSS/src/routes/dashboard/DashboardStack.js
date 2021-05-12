import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Components
import Header from './Header';
import HomeScreen from '../../screens/home';
import EmployeeDetail from '../../screens/dashboard/detailEmployee';
import SettingScreen from '../../screens/dashboard/settings';
import EmployeeScreen from '../../screens/employee';
import UpdateDetailEmployee from '../../screens/dashboard/updateEmployee';
import LeavesScreen from '../../screens/modules/leaves';
import AddLeavesScreen from '../../screens/dashboard/AddLeaves';
import DetailLeaveScreen from '../../screens/detailLeaves';

import AttendanceScreen from '../../screens/modules/attendances';
import NewAttendance from '../../screens/dashboard/attendances';
import ListNewAttendanceScreen from '../../screens/modules/listnewattendances';
import RequestScreen from '../../screens/dashboard/request';
const Stack = createStackNavigator();
export default DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => {
          return <Header {...props} />;
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="EmployeeScreen" component={EmployeeScreen} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen
        name="EmployeeDetail"
        component={EmployeeDetail}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="UpdateDetailEmployee"
        component={UpdateDetailEmployee}
      />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="LeavesScreen" component={LeavesScreen} />
      <Stack.Screen name="AddLeavesScreen" component={AddLeavesScreen} />
      <Stack.Screen
        name="ListNewAttendanceScreen"
        component={ListNewAttendanceScreen}
      />
      <Stack.Screen name="NewAttendance" component={NewAttendance} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} />
      <Stack.Screen name="DetailLeaveScreen" component={DetailLeaveScreen} />
    </Stack.Navigator>
  );
};
