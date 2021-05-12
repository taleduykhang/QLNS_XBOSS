import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {
  IconTachometer,
  IconAddressBook,
  IconClock,
  IconUsers,
  IconAttendance,
  IconListAttendance,
} from '../../../resource/icons';

class DrawerBody extends React.PureComponent {
  onGoToDashboard = () => {
    this.props.navigation.navigate('DashboardScreen', {
      title: 'Dashboard',
    });
  };

  onGoToEmployees = () => {
    this.props.navigation.navigate('EmployeeScreen');
  };

  onGoToLeaves = () => {
    this.props.navigation.navigate('LeavesScreen');
  };
  onGoToAttendances = () => {
    this.props.navigation.navigate('AttendanceScreen');
  };
  onGoToNewAttendances = () => {
    this.props.navigation.navigate('NewAttendance');
  };
  onGoToListAttendance = () => {
    this.props.navigation.navigate('ListNewAttendanceScreen');
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToAttendances}>
          <IconClock size={25} color="#1C75BC" style={styles.icon} />
          <Text style={styles.itemText}>My attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToListAttendance}>
          <IconListAttendance size={25} color="#1C75BC" style={styles.icon} />
          <Text style={styles.itemText}>Attendances request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToLeaves}>
          <IconAddressBook size={25} color="#1C75BC" style={styles.icon} />
          <Text style={styles.itemText}>Leaves</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onGoToEmployees}>
          <IconUsers size={20} color="#1C75BC" style={styles.icon} />
          <Text style={styles.itemText}>Employees</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(DrawerBody);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'space-evenly',
    borderTopColor: '#E5E5E5',
    height: '50%',
  },
  itemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 20,
    paddingLeft: 10,
  },
  icon: {
    marginTop: 3,
    width: 35,
  },
});
