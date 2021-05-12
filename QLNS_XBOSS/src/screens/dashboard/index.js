// import React from 'react';
// import {View, Text, TouchableOpacity,FlatList,StyleSheet,SafeAreaView,StatusBar } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// export default class DashboardScreen extends React.Component {
//   onGoToDetail = () => {
//     this.props.navigation.navigate('DashboardDetail', {
//       title: 'Dashboard detail',
//     });
//   };

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>
//           This is Dashboard Screen with params:{' '}
//           {this.props.route.params == undefined
//             ? ''
//             : this.props.route.params.url}
//         </Text>
//         <TouchableOpacity
//           style={{
//             marginVertical: 10,
//             paddingHorizontal: 10,
//             paddingVertical: 5,
//             backgroundColor: '#3383C3',
//           }}
//           onPress={this.onGoToDetail}>
//           <Text>Go to dashboard detail</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

