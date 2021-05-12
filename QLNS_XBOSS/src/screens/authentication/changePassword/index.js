import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DATA_STATUS, LINK} from '../../../utils/configs';
export default class ChangePasswordScreen extends React.Component {
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  createTwoButtonAlert = () =>
    Alert.alert(
      'INFORM',
      'Your Password is reset successfully. Please check your inbox to change password again.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 50}}>
          <Text style={{fontSize: 20, marginBottom: 70}}>Reset Password</Text>
          <View>
            <AntDesign
              name={'earth'}
              size={25}
              color={'#5bade9'}
              style={styles.InputIcon}
            />
            <TextInput placeholder="URL" style={styles.ResetInputText} />
          </View>
          <View>
            <FontAwesome
              name={'user-circle-o'}
              size={25}
              color={'#5bade9'}
              style={styles.InputIcon}
            />
            <TextInput
              placeholder="User Name/Email"
              style={styles.ResetInputText}
            />
          </View>
          <TouchableOpacity
            style={styles.ResetButton}
            onPress={this.createTwoButtonAlert}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ResetInputText: {
    marginTop: 10,
    borderWidth: 1,
    width: 300,
    borderRadius: 35,
    height: 35,
    paddingLeft: 45,
  },
  ResetButton: {
    backgroundColor: 'steelblue',
    marginTop: 40,
    width: 300,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  InputIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
});
