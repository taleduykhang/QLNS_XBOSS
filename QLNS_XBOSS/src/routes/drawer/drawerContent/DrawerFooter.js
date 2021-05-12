import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {withGlobalContext} from '../../../GlobalContextProvider';
import {IconCog, IconSignOut, IconQues} from '../../../resource/icons';
import DrawerContentBusiness from '../../../business/DrawerContentBusiness';
import {DATA_STATUS, USER_PROFILE, HOST} from '../../../utils/configs';
import {logout} from '../../../redux/actions/logoutAction';
import {connect} from 'react-redux';
class DrawerFooter extends React.PureComponent {
  onSettings = () => {
    this.props.navigation.navigate('SettingScreen');
  };
  onPressExit = () => {
    // console.log('kiem tra logout', this.props.user);

    Alert.alert(
      'Notification',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: this.onPopover,
        },
        {text: 'OK', onPress: this.onPressExit1},
      ],
      {cancelable: false},
    );
  };
  onPressExit1 = async () => {
    const {setSignin} = this.props.global;
    const drawerContentBusiness = new DrawerContentBusiness();
    let userLogout = await drawerContentBusiness.logout(
      //HOST.URL + HOST.SERVICE_API.SESSION_DESTROY,
      'https://uat.xboss.com' + HOST.SERVICE_API.SESSION_DESTROY,
    );
    console.log('==================logout=================', userLogout);

    if (userLogout.status == DATA_STATUS.SUCCESS) {
      setSignin();
      USER_PROFILE.id = 0;
    } else {
      Alert.alert('Logout failed!');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onSettings}>
          <IconCog size={25} color="gray" style={styles.icon} />
          <Text style={styles.itemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <IconQues size={25} color="#b3b300" style={styles.icon} />
          <Text style={styles.itemText}>Helpdesk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onPressExit}>
          <IconSignOut size={25} color="#ff6666" style={styles.icon} />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    //user: state.loginReducer.user,
  };
}
export default withNavigation(
  withGlobalContext(connect(mapStateToProps, {logout})(DrawerFooter)),
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'space-evenly',
    borderTopWidth: 0.5,
    borderTopColor: '#c5c5c5',
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
