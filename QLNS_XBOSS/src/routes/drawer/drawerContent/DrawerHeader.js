import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux';
//import {login} from '../../../redux/actions/loginAction';
import {USER_PROFILE, LINK, USER_GOOGLE} from '../../../utils/configs';
// import LoginScreenBusiness from '../../../business/LoginScreenBusiness';
// import {withGlobalContext} from '../../../GlobalContextProvider';
import SettingScreenBusiness from '../../../business/SettingScreenBusiness';
import {companyList} from '../../../redux/actions/companyAction';
class DrawerHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopOver: false,
      company: '',
    };
  }

  render() {
    return (
      <View style={{backgroundColor: '#5bade9'}}>
        {USER_PROFILE.id != 0 ? (
          <ImageBackground style={styles.backgroundprofile}>
            <View style={styles.info}>
              <Image
                style={styles.profile}
                source={{
                  uri: LINK.urlImageUser + USER_PROFILE.id,
                }}
              />
              {/* <Image
              style={styles.profile}
              source={{
                uri:
                  'https://uat.xboss.com/web/image?model=res.users&field=image_medium&id=' +
                  USER_PROFILE.id,
              }} */}

              <Image
                style={styles.logoCompany}
                source={{
                  uri:
                    LINK.urlImageCompany +
                    USER_PROFILE.id_company +
                    '/logo/200x200',
                }}
              />
              <Text style={styles.name}>{USER_PROFILE.name}</Text>
              <Text style={styles.nameCompany}>{USER_PROFILE.company}</Text>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground style={styles.backgroundprofile}>
            <View style={styles.info}>
              <Image
                style={styles.profile}
                source={{
                  uri: USER_GOOGLE.image,
                }}
              />
              <Text style={styles.name}>{USER_GOOGLE.name}</Text>
              <Text style={styles.nameCompany}>{USER_GOOGLE.email}</Text>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    companyData: state.settingReducer.listDataCompany,
  };
}
export default connect(mapStateToProps)(DrawerHeader);

const styles = StyleSheet.create({
  backgroundprofile: {
    width: undefined,

    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
  },
  name: {
    fontSize: 20,
    marginVertical: 8,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  nameCompany: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    //textAlign: 'center',
    color: '#f5f5f5',
  },
  info: {
    //alignItems: 'left',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  logoCompany: {
    height: 35,
    width: 35,
    marginLeft: 15,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    marginTop: -25,
    marginLeft: 45,
  },
});
