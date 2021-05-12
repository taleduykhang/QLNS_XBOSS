import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import DrawerHeader from './DrawerHeader';
import DrawerBody from './DrawerBody';
import DrawerFooter from './DrawerFooter';

export default class DrawerContent extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <DrawerHeader />
          <DrawerBody />
          <DrawerFooter />
        </View>
      </SafeAreaView>
    );
  }
}
