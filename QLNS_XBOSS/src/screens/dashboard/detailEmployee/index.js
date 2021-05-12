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
  useWindowDimensions,
  ScrollView,
} from 'react-native';

import {
  IconBack,
  IconEdit,
  IconCheck,
  IconCircle,
} from '../../../resource/icons';
import 'moment-timezone';
import {DATA_STATUS, LINK, HOST} from '../../../utils/configs';
import moment from 'moment';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {invalid} from 'moment';
// import HTML from 'react-native-render-html';

class EmployeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.birthday,
      datework:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.datework,
      coach:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.coach,
      coachId:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.coachId,
      ima1:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.ima1,
      manager:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.manager,
      type:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.type,
      address:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.address,
      company:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.company,
      resource:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.resource,
      tz:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.tz,
      seniority:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.seniority,
      ethnic:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.ethnic,
      id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.id,
      identification_date:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.identification_date,
      identification_place:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.identification_place,
      marital:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.marital,
      gender:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.gender,
      personal_email:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.personal_email,
      bank_account_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.bank_account_id,
      code:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.code,
      classification:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.classification,
      number:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.number,
      email:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.email,
      location:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.location,
      ima:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.ima,
      position:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.position,
      department:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.department,
      index: 0,

      routes: [
        {key: 'first', title: 'Work information'},
        {key: 'second', title: 'Personal information'},
      ],
    };
  }

  //View work information
  WorkInformation = () => (
    <View style={styles.viewBody}>
      <View style={styles.viewBodyRight}>
        {this.state.manager != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Manager</Text>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Image
                style={styles.logo1}
                source={{
                  uri:
                    HOST.URL +
                    HOST.SERVICE_API.IMAGE_EMPLOYEE +
                    this.state.ima1,
                }}
              />
              <View style={{paddingTop: 5, paddingLeft: 5}}>
                <Text style={styles.textInfo}>{this.state.manager}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {this.state.coach != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Coach</Text>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Image
                style={styles.logo1}
                source={{
                  uri:
                    HOST.URL +
                    HOST.SERVICE_API.IMAGE_EMPLOYEE +
                    this.state.coachId,
                }}
              />
              <View style={{paddingTop: 5, paddingLeft: 5}}>
                <Text style={styles.textInfo}>{this.state.coach}</Text>
              </View>
            </View>
          </View>
        ) : null}
        {this.state.type != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Level</Text>
            <Text style={styles.textInfo}>{this.state.type}</Text>
          </View>
        ) : null}
        {this.state.address != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Work address</Text>
            <Text style={styles.textInfo}>{this.state.address}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.viewBodyRight}>
        {this.state.company != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Company</Text>
            <Text style={styles.textInfo}>{this.state.company}</Text>
          </View>
        ) : null}
        {this.state.resource != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Working hours</Text>
            <Text style={styles.textInfo}>{this.state.resource}</Text>
          </View>
        ) : null}
        {this.state.tz != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Timezone</Text>
            <Text style={styles.textInfo}>{this.state.tz}</Text>
          </View>
        ) : null}
        {this.state.datework != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Star working date</Text>
            <Text style={styles.textInfo} value={this.state.datework}>
              {moment(this.state.datework).format('DD-MM-YYYY')}
            </Text>
          </View>
        ) : null}
        {this.state.seniority != 0 ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Seniority</Text>
            <Text style={styles.textInfo}>
              {this.state.seniority} {'days'}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  //View  persona information
  PersonalInformation = () => (
    <View style={styles.viewBody}>
      <View style={styles.viewBodyRight}>
        {this.state.birthday != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Birthday</Text>
            <Text style={styles.textInfo} value={this.state.birthday}>
              {moment(this.state.birthday).format('DD-MM-YYYY')}
            </Text>
          </View>
        ) : null}
        {this.state.ethnic != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Ethnic</Text>
            <Text style={styles.textInfo}>{this.state.ethnic}</Text>
          </View>
        ) : null}
        {this.state.id != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Personal ID</Text>
            <Text style={styles.textInfo}>{this.state.id}</Text>
          </View>
        ) : null}
        {this.state.identification_date != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Identification date</Text>
            <Text style={styles.textInfo}>
              {this.state.identification_date}
            </Text>
          </View>
        ) : null}
        {this.state.identification_place != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>ID Place of issue</Text>
            <Text style={styles.textInfo}>
              {this.state.identification_place}
            </Text>
          </View>
        ) : null}
        {this.state.marital != null ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Marital status</Text>
            <Text style={styles.textInfo}>{this.state.marital}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.viewBodyRight}>
        {this.state.gender != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Gender</Text>
            <Text style={styles.textInfo}>{this.state.gender}</Text>
          </View>
        ) : null}
        {this.state.personal_email != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Personal email</Text>
            <Text style={styles.textInfo}>{this.state.personal_email}</Text>
          </View>
        ) : null}

        {this.props.route.params == undefined ? (
          'error'
        ) : this.props.route.params.salary_to_bank == true ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Send Salary To Bank</Text>
            <IconCheck size={20} color="#1C75BC" />
          </View>
        ) : (
          <View style={styles.information}>
            <Text style={styles.bolds}>Send Salary To Bank</Text>
            <IconCircle size={20} color="#1C75BC" />
          </View>
        )}
        {this.state.bank_account_id != '' ? (
          <View style={styles.information}>
            <Text style={styles.bolds}>Bank account number</Text>
            <Text style={styles.textInfo}>{this.state.bank_account_id}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  //Change index
  _handleIndexChange = (index) => this.setState({index});

  //Render tab
  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 102,
                ),
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 102,
                ),
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 102,
                ),
              }),
            ),
          );
          const backgroundColor = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 28 : 255,
                ),
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 117 : 255,
                ),
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 188 : 255,
                ),
              }),
            ),
          );
          return (
            <Animated.View style={{flex: 1, backgroundColor}}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.setState({index: i})}>
                <Animated.Text
                  style={{
                    color,
                    fontWeight: 'bold',
                    fontSize: 15,
                    //backgroundColor,
                  }}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  //reader view
  _renderScene = SceneMap({
    first: this.WorkInformation,
    second: this.PersonalInformation,
  });

  //Quay lại màn hình EmployeeScreen
  onGoToEmployees = () => {
    this.props.navigation.navigate('DashboardStack', {
      screen: 'EmployeeScreen',
      params: {
        idColor:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.ima,
      },
    });
    this.props.navigation.navigate('EmployeeScreen');
  };

  //Chuyển qua màn hình UpdateDetailEmployee
  onPressUpdate = () => {
    this.props.navigation.navigate('DashboardStack', {
      screen: 'UpdateDetailEmployee',
      params: {
        ima:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.ima,
        name:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.name,
        email:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.email,
        number:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.number,
        //manager: item.parent_id[1],
        department:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.department,
        id_department:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.id_department,
        position:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.position,
        id_position:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.id_position,
        type:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.type,
        id_type:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.id_type,
        //id: item.id,
        birthday:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.birthday,
        datework:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.datework,
        limit:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.limit,
        //address: item.address_id[1],
        //ima1: item.parent_id[0],
      },
    });
  };

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{paddingVertical: 10}}
              onPress={this.onGoToEmployees}>
              <IconBack size={20} color="#1C75BC" />
            </TouchableOpacity>
            <Text style={styles.titleScreen}>Employee detail</Text>
            <TouchableOpacity
              style={{paddingVertical: 10, paddingLeft: '45%'}}
              onPress={this.onPressUpdate}>
              <IconEdit size={20} color="#1C75BC" />
            </TouchableOpacity>
          </View>

          <View style={styles.viewHeader}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.viewHeaderLeft}>
                <Text style={styles.textName}>
                  {this.props.route.params == undefined
                    ? 'error'
                    : this.props.route.params.name}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  {this.state.code != '' ? (
                    <Text style={styles.textCode}>{this.state.code}</Text>
                  ) : null}
                  {this.state.classification != '' ? (
                    <Text style={styles.textInfo}>
                      {this.state.classification}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.informationHeaderLeft}>
                  {this.state.number != '' ? (
                    <View style={styles.information}>
                      <Text style={styles.bolds}>Mobile</Text>
                      <Text style={styles.textInfo}>{this.state.number}</Text>
                    </View>
                  ) : null}
                  {this.state.email != '' ? (
                    <View style={styles.information}>
                      <Text style={styles.bolds}>Email</Text>
                      <Text style={styles.textInfo}>{this.state.email}</Text>
                    </View>
                  ) : null}
                  {this.state.location != '' ? (
                    <View style={styles.information}>
                      <Text style={styles.bolds}>Work location</Text>
                      <Text style={styles.textInfo}>{this.state.location}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={styles.viewHeaderRight}>
                <Image
                  style={styles.logo}
                  source={{
                    uri:
                      HOST.URL +
                      HOST.SERVICE_API.IMAGE_EMPLOYEE +
                      this.state.ima,
                  }}
                />
                {this.state.position != '' ? (
                  <View style={styles.information}>
                    <Text style={styles.bolds}>Position</Text>
                    <Text style={styles.textInfo}>{this.state.position}</Text>
                  </View>
                ) : null}
                {this.state.department != '' ? (
                  <View style={styles.information}>
                    <Text style={styles.bolds}>Department</Text>
                    <Text style={styles.textInfo}>{this.state.department}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        </ScrollView>
      </View>
    );
  }
}

export default EmployeeDetail;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  information: {
    //flexDirection: 'row',
    paddingVertical: 5,
  },
  informationHeaderLeft: {
    //flexDirection: 'row',
    paddingTop: 28,
  },
  title: {
    fontSize: 15,
  },
  textName: {
    paddingVertical: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C75BC',
    width: 400,
  },
  textInfo: {
    fontSize: 13,
    // color: '#5bade9',
    width: 170,
  },
  textCode: {
    fontSize: 13,
    paddingRight: 15,
  },
  viewHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1C75BC',
  },
  viewHeaderLeft: {
    width: '50%',
    height: '100%',
    paddingLeft: 10,
  },
  viewHeaderRight: {
    width: '50%',
    height: '100%',
    paddingTop: 5,
    paddingLeft: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 150,
    borderColor: '#1C75BC',
    borderWidth: 1,
    marginLeft: 85,
  },
  logo1: {
    width: 25,
    height: 25,
    borderRadius: 150,
    borderColor: '#1C75BC',
    borderWidth: 1,
  },
  bolds: {
    fontWeight: 'bold',
    color: '#333333',
    //width: 50,
  },
  address: {
    height: '22%',
    paddingLeft: 10,
    paddingRight: 10,
  },

  viewBodyRight: {
    width: '50%',
    paddingLeft: 10,
    // backgroundColor: '#1C75BC',
  },
  viewBody: {
    flexDirection: 'row',
    //height: '47%',
    paddingTop: 5,
    //backgroundColor: 'red',
    // borderBottomWidth: 1,
    // borderColor: 'red',
  },
  header: {
    height: '8%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1C75BC',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#343a40',
  },

  iconExit: {
    paddingRight: 10,
    paddingVertical: 5,
  },

  tabBar: {
    flexDirection: 'row',
    //paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    //borderBottomWidth: 1,
    //borderColor: '#1C75BC',
    //borderRightWidth: 1,
    //backgroundColor: '#1C75BC',
  },
  titleScreen: {
    paddingHorizontal: 10,
    fontSize: 18,
    paddingVertical: 10,
    color: '#1C75BC',
  },
});
