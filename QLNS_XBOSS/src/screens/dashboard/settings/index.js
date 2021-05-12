import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import Popover from 'react-native-popover-view';
import SettingScreenBusiness from '../../../business/SettingScreenBusiness';
import {companyList} from '../../../redux/actions/companyAction';
import {changeCompany} from '../../../redux/actions/changeCompanyAction';
import {languageList} from '../../../redux/actions/languageAction';
import {changeLanguage} from '../../../redux/actions/changeLanguageAction';
import {connect} from 'react-redux';
import {IconDown, IconCheck, IconCircle} from '../../../resource/icons';
import {DATA_STATUS, LINK, USER_PROFILE, HOST} from '../../../utils/configs';
import DeviceInfo from 'react-native-device-info';
import {logout} from '../../../redux/actions/logoutAction';
import {login} from '../../../redux/actions/loginAction';
import LoginScreenBusiness from '../../../business/LoginScreenBusiness';
import DrawerContentBusiness from '../../../business/DrawerContentBusiness';
import {withGlobalContext} from '../../../GlobalContextProvider';
import {withNavigation} from '@react-navigation/compat';
class DashboardDetail extends React.Component {
  constructor(props) {
    super(props);
    if (USER_PROFILE.language == 'en_US') {
      this.state = {
        language: 'English',
        visiblePopOver: false,
        visiblePopOverLanguage: false,
        company: USER_PROFILE.company,
        company_id: USER_PROFILE.id_company,
        visibleIdCompany: false,
        visibleCodeLang: false,
        code_lang: USER_PROFILE.language,
        //visibleIconCheck: false,
      };
    } else {
      this.state = {
        language: 'Vietnamese / Tiếng Việt',
        visiblePopOver: false,
        visiblePopOverLanguage: false,
        company: USER_PROFILE.company,
        company_id: USER_PROFILE.id_company,
        visibleIdCompany: false,
        visibleCodeLang: false,
        code_lang: USER_PROFILE.language,
        visibleIconCheck: false,
      };
    }
  }
  onPopover = () => {
    this.setState({
      visiblePopOver: !this.state.visiblePopOver,
    });
  };
  onPopoverLanguage = () => {
    this.setState({
      visiblePopOverLanguage: !this.state.visiblePopOverLanguage,
    });
  };
  onPopoverChangeLanguage = async (t, e) => {
    this.setState({
      language: t,
      code_lang: e,
    });
    Alert.alert(
      'Notification',
      'Do you want to change?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            this.setState({
              visiblePopOverLanguage: false,
              language:
                this.state.language == 'English'
                  ? 'Vietnamese / Tiếng Việt'
                  : 'English',
              code_lang: USER_PROFILE.language,
            });
          },
        },
        {text: 'OK', onPress: this.onChangeLanguage},
      ],
      {cancelable: false},
    );
  };
  onPopoverChangeCompany = async (t, e) => {
    this.setState({
      company: t,
      company_id: e,
    });
    Alert.alert(
      'Notification',
      'Do you want to change?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            this.setState({
              visiblePopOver: !this.state.visiblePopOver,
              company: USER_PROFILE.company,
              company_id: USER_PROFILE.id_company,
            });
          },
        },
        {text: 'OK', onPress: this.onChangeCompany},
      ],
      {cancelable: false},
    );
  };
  onChangeTextCompany = (text) => {
    this.setState({
      company: text,
    });
  };
  onChangeTextIdCompany = (text) => {
    this.setState({
      company_id: text,
    });
  };
  onChangeTextLanguage = (text) => {
    this.setState({
      language: text,
    });
  };

  // Lấy danh sách API
  componentDidMount = async () => {
    //Lấy danh sách công ty
    const companyBusiness = new SettingScreenBusiness();
    let company = await companyBusiness.getListCompany(
      [['user_ids', '=', USER_PROFILE.id]],
      ['name'],
      0,
      0,
      '',
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.companyList(company);
    console.log('Check list language setting:', company);

    //Lấy danh sách ngôn ngữ
    const languageBusiness = new SettingScreenBusiness();
    let language = await languageBusiness.getListLanguage(
      [],
      ['name', 'code'],
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.languageList(language);
    console.log('Check list language setting:', language);
  };

  // Danh sách Company
  ItemCompany = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'white',
      }}>
      <Image
        style={styles.logoCompany}
        source={{
          uri:
            HOST.URL +
            HOST.SERVICE_API.IMAGE_COMPANY +
            item.id +
            '/logo/200x200',
        }}
      />
      <View style={{width: '80%', paddingVertical: 7, paddingHorizontal: 5}}>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <TouchableOpacity
        onPress={() => this.onPopoverChangeCompany(item.name, item.id)}
        style={styles.button1}>
        {USER_PROFILE.id_company == item.id ? (
          <IconCheck
            size={20}
            color={'#1C75BC'}
            style={{marginRight: 15, marginTop: 3}}
          />
        ) : USER_PROFILE.id_company == '' ? (
          <IconCircle
            size={20}
            color={'#1C75BC'}
            style={{marginRight: 15, marginTop: 3}}
          />
        ) : (
          <IconCircle
            size={20}
            color={'#1C75BC'}
            style={{marginRight: 15, marginTop: 3}}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // Lấy danh sách Company
  ItemLanguage = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'white',
      }}>
      <Image
        style={styles.logo1}
        source={{
          uri: HOST.URL + HOST.SERVICE_API.IMAGE_FLAGS + item.code + '.png',
        }}
      />
      <View
        style={{
          width: '80%',
          paddingVertical: 6,
          paddingHorizontal: 5,
          //backgroundColor: 'blue',
        }}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => this.onPopoverChangeLanguage(item.name, item.code)}
        style={styles.button1}>
        {USER_PROFILE.language == item.code ? (
          <IconCheck
            size={20}
            color={'#1C75BC'}
            style={{marginRight: 35, marginTop: 3}}
          />
        ) : (
          <IconCircle
            size={20}
            color={'#1C75BC'}
            style={{marginRight: 15, marginTop: 3}}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // Thay đổi Company
  onChangeCompany = async () => {
    this.setState({
      visiblePopOver: !this.state.visiblePopOver,
    });
    const companyBusiness = new SettingScreenBusiness();
    let changeCompany = await companyBusiness.getChangeCompany(
      [USER_PROFILE.id],
      {
        company_id: this.state.company_id,
      },
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'write',
    );
    console.log('Check change company after update', changeCompany);
    this.props.changeCompany(changeCompany);

    // const loginScreenBusiness = new LoginScreenBusiness();
    // const db = 'xboss_uat',
    //   url = 'https://uat.xboss.com/web/session/authenticate';
    // let userInfo = await loginScreenBusiness.login(
    //   'khoinguyennguyen@hhdgroup.com',
    //   'hhd123456',
    //   db,
    //   url,
    // );
    // login;
    // console.log('kiem tra data user:', userInfo.data.name);
    // this.props.login(userInfo);
    const {setSignin} = this.props.global;
    const drawerContentBusiness = new DrawerContentBusiness();
    let userLogout = await drawerContentBusiness.logout(
      //'https://uat.xboss.com/web/session/destroy'
      HOST.URL + HOST.SERVICE_API.SESSION_DESTROY,
    );
    console.log('==================logout=================', userLogout);
    if (userLogout.status == DATA_STATUS.SUCCESS) {
      setSignin();
      USER_PROFILE.id = 0;
    } else {
      Alert.alert('Logout failed!');
    }
  };

  // Thay đổi Language
  onChangeLanguage = async () => {
    this.setState({
      visiblePopOverLanguage: !this.state.visiblePopOverLanguage,
    });
    const languageBusiness = new SettingScreenBusiness();
    let changeLanguage = await languageBusiness.getChangeLanguage(
      [USER_PROFILE.id],
      {
        lang: this.state.code_lang,
      },
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'write',
    );
    console.log('Check change language after update', changeLanguage);
    this.props.changeLanguage(changeLanguage);

    // const loginScreenBusiness = new LoginScreenBusiness();
    // const db = 'xboss_uat',
    //   url = 'https://uat.xboss.com/web/session/authenticate';
    // let userInfo = await loginScreenBusiness.login(
    //   'khoinguyennguyen@hhdgroup.com',
    //   'hhd123456',
    //   db,
    //   url,
    // );
    // login;
    // console.log('kiem tra data user:', userInfo.data.name);
    // this.props.login(userInfo);
    const {setSignin} = this.props.global;
    const drawerContentBusiness = new DrawerContentBusiness();
    let userLogout = await drawerContentBusiness.logout(
      //'https://uat.xboss.com/web/session/destroy'
      HOST.URL + HOST.SERVICE_API.SESSION_DESTROY,
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
        <SafeAreaView>
          <View style={{paddingVertical: 5, paddingTop: 25}}>
            <Text
              style={{
                paddingLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#555555',
              }}>
              Language
            </Text>
          </View>
          <View>
            <FlatList
              data={this.props.languageData}
              renderItem={this.ItemLanguage}
              extraData={(item) => item.id}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView>
          <View style={{paddingVertical: 5, paddingTop: 25}}>
            <Text
              style={{
                paddingLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#555555',
              }}>
              Companies
            </Text>
            <View>
              <FlatList
                data={this.props.companyData}
                renderItem={this.ItemCompany}
                extraData={(item) => item.id}
              />
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={{paddingTop: 25}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                paddingLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#555555',
              }}>
              Version
            </Text>
            <Text style={{paddingRight: 10}}>
              {DeviceInfo.getVersion()} {DeviceInfo.getBuildNumber()}
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    companyData: state.settingReducer.listDataCompany,
    changeCompany: state.settingReducer.changeDataCompany,
    languageData: state.settingReducer.listDataLanguage,
    changeLanguage: state.settingReducer.changeDataLanguage,
    login: state.loginReducer.test,
  };
}
export default withNavigation(
  withGlobalContext(
    connect(mapStateToProps, {
      companyList,
      changeCompany,
      languageList,
      changeLanguage,
      login,
      logout,
    })(DashboardDetail),
  ),
);
// export default connect(mapStateToProps, {
//   companyList,
//   changeCompany,
//   languageList,
//   changeLanguage,
//   login,
//   logout,
// })(DashboardDetail);
const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'white',
    flex: 1,
  },
  view: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  button: {
    width: '95%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 60,
  },
  information: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 100,
  },
  container1: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '95%',
    fontSize: 13,
    //backgroundColor: 'yellow',
    paddingLeft: 5,
    // textAlign: 'justify',
    //marginLeft: '16%',
    alignItems: 'center',
  },
  inputLanguage: {
    width: '95%',
    fontSize: 13,
    //backgroundColor: 'yellow',
    paddingLeft: 5,
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  button1: {
    width: '100%',
  },
  FlatList: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: 340,
    backgroundColor: 'red',
  },
  logo1: {
    height: 30,
    width: 30,
    marginLeft: 15,
    // borderRadius: 50,
    // borderWidth: 0.5,
    // borderColor: '#1C75BC',
  },
  logoCompany: {
    height: 30,
    width: 30,
    marginLeft: 15,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#555555',
  },

  viewLogo: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
