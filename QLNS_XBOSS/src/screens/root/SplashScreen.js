import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {withGlobalContext} from '../../GlobalContextProvider';
import logo from '../../images/logo.png';
class SplashScreen extends React.Component {
  componentDidMount() {
    const {setSplash} = this.props.global;
    setTimeout(() => {
      setSplash();
      this.props.navigation.navigate('Authentication', {screen: 'LoginScreen'});
    }, 1000);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white'}}>
       
       <Image style={{width:260,height:260,marginVertical: 10}} source={logo}/>
       
      </View>

    );
  }
}

export default withGlobalContext(SplashScreen);
