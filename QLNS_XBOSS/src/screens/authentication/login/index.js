//export default withGlobalContext(LoginScreen);
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {IconGoogle} from '../../../resource/icons';
import {withGlobalContext} from '../../../GlobalContextProvider';
import logo from '../../../images/logo.png';
import {DATA_STATUS, LINK, HOST} from '../../../utils/configs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/loginAction';
import LoginScreenBusiness from '../../../business/LoginScreenBusiness';
import AuthenticationBusiness from '../../../business/authentication/AuthenticationBusiness';
const pkg = require('./../../../../package.json');
import DeviceInfo from 'react-native-device-info';
const {width: WIDTH} = Dimensions.get('window');
import Modal from 'react-native-modal';
const DATA = [
  {
    id: 583,
    name: 'Demo XBoss',
    url2: 'https://xboss.com',
    username: 'demo@xboss.com',
    password: 'xboss@123',
  },
  {
    id: 208,
    name: 'Trần Giang Nam',
    url2: 'https://xboss.com',
    username: 'giangnamtran@hhdgroup.com',
    password: '123456',
  },
  {
    id: 674,
    name: 'Intern',
    url2: 'https://uat.xboss.com',
    username: 'intern@xboss.com',
    password: '123456',
  },
  {
    id: 202,
    name: 'Nguyễn Trần Khôi Nguyên',
    url2: 'https://uat.xboss.com',
    username: 'khoinguyennguyen@hhdgroup.com',
    password: 'hhd123456',
  },
];

class LoginScreen extends React.Component {
  componentDidUpdate(prevProps) {
    const {setLogin} = this.props.global;
    if (
      this.props.status == DATA_STATUS.SUCCESS &&
      prevProps.status != this.props.status
    ) {
      setLogin();
    } else if (
      this.props.status == DATA_STATUS.FAILED &&
      prevProps.status != this.props.status
    ) {
      this.setState({error: 'User does not exist!'});
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      url2: '',
      username: '',
      password: '',
      color: '#4169e1',
      visible: false,
      showPass: true,
      press: false,
      iconAvatar: 0,
      error: '',
    };
  }
  onPressResetPassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  Item = ({item}) => {
    return (
      <View style={{borderTopWidth: 0.5}}>
        <TouchableOpacity
          //value={this.state.id}
          style={{width: '100%'}}
          onPress={() => this.onitem(item.url2, item.username, item.id)}>
          <Image
            style={styles.iconAvatar}
            source={{
              uri: LINK.urlImageUser + item.id,
            }}
          />
          <View style={{left: 30}}>
            <Text>{item.name}</Text>
            <Text>{item.url2}</Text>
          </View>
          {this.state.username == item.username ? (
            <FontAwesome
              name={'check-circle-o'}
              size={24}
              color={'#4169e1'}
              style={styles.inputIconchecked}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  onPressModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  onPressModalDelete = () => {
    this.setState({
      visible: !this.state.visible,
      url2: '',
      username: '',
      password: '',
    });
  };
  onitem = (u, e, i) => {
    this.setState({
      url2: u,
      username: e,
      iconAvatar: i,
      //password: p,
      visible: !this.state.visible,
    });
  };
  onChangeTextUserName = (text) => {
    this.setState({
      username: text,
    });
  };
  onChangeTextPassword = (text) => {
    this.setState({
      password: text,
    });
  };
  onChangeTextURL = (text) => {
    this.setState({
      url2: text,
    });
  };
  onPressLogin = async () => {
    //this.props.login(this.state.username,this.state.password,this.state.url2);

    const loginScreenBusiness = new LoginScreenBusiness();
    const db = 'xboss_uat',
      url = 'https://uat.xboss.com/web/session/authenticate';
    var url2 = this.state.url2.trim(),
      username = this.state.username.trim(),
      password = this.state.password.trim();
    const {setSignin} = this.props.global;
    // var pattern = new RegExp(
    //   '^(https?:\\/\\/)?' + // protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //     '(\\#[-a-z\\d_]*)?$',
    //   'i',
    // );
    // let isValid = pattern.test(this.state.url2);
    // if (!isValid) {
    //   //alert(`"${this.state.url2}" không phải URL`);
    //   this.setState({error: `"${this.state.url2}" không phải URL`});
    //   return false;
    // }
    if (
      (url2 === '' || url2 === null) &&
      (username === '' || username === null) &&
      (password === '' || password === null)
    ) {
      //alert('Vui lòng điền đầy đủ thông tin');
      this.setState({error: 'Vui lòng điền đầy đủ thông tin'});
      return false;
    } else if (url2 == '' || url2 == null) {
      this.setState({error: 'All input field must be fill!'});
      return false;
    } else if (username == '' || username == null) {
      this.setState({error: 'All input field must be fill!'});
      return false;
    } else if (password == '' || password == null) {
      this.setState({error: 'All input field must be fill!'});
      return false;
    } else {
      let userInfo = await loginScreenBusiness.login(
        this.state.username,
        this.state.password,
        HOST.DATABASE,
        this.state.url2 + HOST.SERVICE_API.AUTHENTICATION,
      );
      login;
      this.props.login(userInfo);
      // if (this.state.username == DATA[i].username) {
      //   setSignin();
      // } else {
      //   alert('Sai thông tin đăng nhập, vui lòng nhập lại');
      // }
    }
    for (var i = 0; i < DATA.length; i++) {
      if (
        this.state.username == DATA[i].username &&
        this.state.password == DATA[i].password &&
        this.state.url2 == DATA[i].url2
      ) {
        setSignin();
        HOST.URL = this.state.url2;
        console.log('Kiem tra link login', HOST.SERVICE_API.AUTHENTICATION);
        return false;
      }
    }
    //alert('Sai thông tin đăng nhập, vui lòng nhập lại');
    this.setState({error: 'Sai thông tin đăng nhập, vui lòng nhập lại'});
    return false;
  };

  onPressLoginWithGoogle = async () => {
    try {
      const authenticationBusiness = new AuthenticationBusiness();
      let data = await authenticationBusiness.loginGoogle();
      this.props.global.setSignin();
      this.setState({
        userInfo: data,
      });
    } catch (error) {
      this.setState({
        userInfo: error,
      });
    }
  };

  render() {
    //console.log('kiem tra reducer', this.props.test);
    //console.log('kiem tra thong tin dang nhap', this.props.information);
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View>
          <AntDesign
            name={'earth'}
            size={25}
            color={'#4169e1'}
            style={styles.inputIcon}
          />
          <TextInput
            id="input-1"
            style={styles.input}
            value={this.state.url2}
            onChangeText={this.onChangeTextURL}
            placeholder="URL"
            placeholderTextColor={'#333333'}
            underlineColorAndroid="transparent"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            id="input-2"
            style={styles.input}
            value={this.state.username}
            onChangeText={this.onChangeTextUserName}
            placeholder="User Name/Email"
            placeholderTextColor={'#333333'}
            underlineColorAndroid="transparent"
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity
            style={{
              top: -35,
              left: 40,
              width: 25,
            }}
            onPress={this.onPressModal}>
            {this.state.iconAvatar == 0 ? (
              <FontAwesome name={'user-circle-o'} size={24} color={'#4169e1'} />
            ) : (
              <Image
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 50,
                  borderColor: '#4169e1',
                  borderWidth: 0.5,
                }}
                source={{
                  uri: LINK.urlImageUser + this.state.iconAvatar,
                }}
              />
            )}
            {/* <FontAwesome name={'user-circle-o'} size={24} color={'#4169e1'} /> */}
          </TouchableOpacity>
        </View>
        <View style={{top: -10}}>
          <AntDesign
            name={'key'}
            size={25}
            color={'#4169e1'}
            style={styles.inputIcon}
          />
          <TextInput
            id="input-3"
            style={styles.input}
            onChangeText={this.onChangeTextPassword}
            placeholder={'Password'}
            value={this.state.password}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'#333333'}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <AntDesign
              name={this.state.press == false ? 'eye' : 'eyeo'}
              size={25}
              color={'#4169e1'}
            />
          </TouchableOpacity>
        </View>

        <View />

        <Modal
          visible={this.state.visible}
          transparent={true}
          customBackdrop={
            <TouchableWithoutFeedback onPress={this.onPressModal}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              />
            </TouchableWithoutFeedback>
          }>
          <View style={styles.ModelAccount}>
            <View style={styles.Accounts}>
              <Text style={{fontSize: 32}}>Accounts</Text>
            </View>
            <FlatList
              data={DATA}
              renderItem={this.Item}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              onPress={this.onPressModalDelete}
              style={styles.ButtonOrderAccounts}>
              <Text style={styles.OderAccounts1}>Other Accounts</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.error}>{this.state.error}</Text>
        <View />
        <TouchableOpacity
          onPress={this.onPressLogin}
          style={{
            backgroundColor: this.state.color,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            paddingVertical: 10,
            elevation: 5,
            marginVertical: 10,
            height: 45,
            alignSelf: 'center',
            width: WIDTH - 55,
            marginTop: 20,
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#ff4500',
            //justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            elevation: 5,
            height: 45,
            alignSelf: 'center',
            width: WIDTH - 55,
            flexDirection: 'row',
          }}
          onPress={this.onPressLoginWithGoogle}>
          <IconGoogle size={30} color="white" style={{paddingLeft: 30}} />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              paddingLeft: 30,
              fontWeight: 'bold',
            }}>
            Login with Google
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.resetPassword}>For get password? </Text>
          <TouchableOpacity
            onPress={this.onPressResetPassword}
            style={styles.resetPassword}>
            <Text style={{color: '#4169e1', fontWeight: 'bold'}}>
              Reset your password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.version}>
          <Text>
            Version: {DeviceInfo.getVersion()} {DeviceInfo.getBuildNumber()}
          </Text>
        </View>
      </View>
    );
  }
}
function mapStoreToProps(state) {
  return {
    test: state.loginReducer.test,
    //information: state.loginReducer.informationAcounters,
  };
}
export default withGlobalContext(
  connect(mapStoreToProps, {login})(LoginScreen),
);
const styles = StyleSheet.create({
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 40,
  },
  btnEye: {
    position: 'absolute',
    top: 10,
    right: 40,
  },
  inputContainer: {
    marginTop: 15,
  },
  logo: {
    width: 230,
    height: 230,
  },
  logoContainer: {
    alignItems: 'center',
  },
  version: {
    bottom: '-5%',
    alignSelf: 'center',
  },
  resetPassword: {
    marginTop: 10,
    left: 35,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  // footer: {
  //   color: 'black',
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  inputIconchecked: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  inputIcon1: {
    position: 'absolute',
    top: 6,
  },
  Accounts: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  ModelAccount: {
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    height: '50%',
    borderWidth: 1,
    //width: '90%',
    //backgroundColor: 'blue',
  },
  ModelBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ButtonOrderAccounts: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  OderAccounts1: {
    color: '#4169e1',
    fontSize: 22,
    borderTopWidth: 1,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
  iconAvatar: {
    height: 25,
    width: 25,
    // marginLeft: 15,
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    // marginTop: -25,
    // marginLeft: 45,
    top: 3,
    left: 3,
  },
  error: {
    width: 300,
    color: 'red',
    paddingLeft: 35,
  },
});
