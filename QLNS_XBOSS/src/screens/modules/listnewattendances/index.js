import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Linking,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {newAttendanceList} from '../../../redux/actions/newAttendanceAction';
import {attendance, connect} from 'react-redux';
import {USER_PROFILE, LINK} from '../../../utils/configs';
import NewAttendanceScreenBusiness from '../../../business/NewAttendanceScreenBusiness';
const {width: WIDTH} = Dimensions.get('window');
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

class ListNewAttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      phone: '',
      mail: '',
      data: [],
      isLoadMore: false,
      listData: [],
      refreshList: false,
    };
    this.shouldLoadMore = true;
    this.offset = 0;
    this.limit = 10;
  }

  //Call button
  onCall = (num) => {
    var tel = 'tel://' + num;
    Linking.openURL(tel);
  };
  //Sms button
  onSms = (num) => {
    var sms = 'sms://' + num;
    Linking.openURL(sms);
  };
  //Email button
  onMail = (email) => {
    var mail = 'mailto:' + email;
    Linking.openURL(mail);
  };
  loadMore = async () => {
    if (this.shouldLoadMore) {
      this.setState({
        isLoadMore: true,
      });

      const listNewAttendanceScreenBusiness = new NewAttendanceScreenBusiness();
      let listNewAttendances = await listNewAttendanceScreenBusiness.getlistNewAttendance(
        [
          ['is_visible', '=', true],
          ['attendance_option', '=', 'attendance_request'],
        ],
        [
          'name',
          'mode',
          'object_of_application',
          'leave_status_id',
          'date_from',
          'date_to',
          'location_id',
          'attendance_option',
          'description',
          'state',
        ],
        this.offset,
        this.limit,
        '',
        LINK.getAPI,
        'search_read',
      );
      listNewAttendances.data = [
        ...this.props.listData,
        ...listNewAttendances.data,
      ];
      this.props.newAttendanceList(listNewAttendances);
      this.setState({listData: this.props.listData});
    }
  };
  componentDidMount = async () => {
    const listNewAttendanceScreenBusiness = new NewAttendanceScreenBusiness();
    let listNewAttendances = await listNewAttendanceScreenBusiness.getlistNewAttendance(
      [
        ['is_visible', '=', true],
        ['attendance_option', '=', 'attendance_request'],
      ],
      [
        'name',
        'mode',
        'object_of_application',
        'leave_status_id',
        'date_from',
        'date_to',
        'location_id',
        'attendance_option',
        'description',
        'state',
      ],
      0,
      0,
      '',
      LINK.getAPI,
      'search_read',
    );

    this.props.newAttendanceList(listNewAttendances);
    this.state.listData = this.props.listData;
    this.setState({refreshList: true});
  };
  componentDidUpdate(prevProps) {
    if (this.props.listData != prevProps.listData) {
      this.setState({isLoadMore: false});
      if (this.props.listData.length < this.offset + this.limit) {
        this.shouldLoadMore = false;
      } else {
        this.offset = this.offset + this.limit;
        this.shouldLoadMore = true;
      }
    }
  }
  renderData = (list = []) => {
    let datalist = [];

    list.forEach((item) => {
      if (
        moment(item.date_from)
          .format('DD-MM-YYYY')
          .indexOf(this.props.searchRequests) != -1
      ) {
        datalist.push(item);
      }
    });

    return datalist;
  };
  itemSeparatorComponent = () => {
    return <View style={{height: 5}} />;
  };

  renderRightActions = () => {
    return (
      <View style={styles.iconContacts}>
        <TouchableOpacity
          style={styles.call}
          onPress={() => this.onCall(this.state.phone)}>
          <FontAwesome
            name={'phone'}
            size={15}
            color={'white'}
            style={styles.inputIconCall}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chat}
          onPress={() => this.onSms(this.state.phone)}>
          <FontAwesome
            name={'comment'}
            size={15}
            color={'white'}
            style={styles.inputIconChat}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mail}
          onPress={() => this.onMail(this.state.mail)}>
          <FontAwesome
            name={'envelope'}
            size={15}
            color={'white'}
            style={styles.inputIconMail}
          />
        </TouchableOpacity>
      </View>
    );
  };

  Item = ({item}) => {
    // if (
    //   !(item.date_to == '' || item.date_to == undefined || item.date_to == null))
    //   //some date to from api null

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DashboardStack', {
            screen: 'RequestScreen',
            params: {
              name: item.name,
              mode: item.mode,
              object_of_application: item.object_of_application,
              leave_status_id: item.leave_status_id[1],
              date_from: item.date_from,
              date_to: item.date_to,
              location_id: item.location_id,
              attendance_option: item.attendance_option,
              description: item.description,
              state: item.state,
            },
          })
        }>
        <Swipeable renderRightActions={this.renderRightActions}>
          <View style={styles.item}>
            <View style={{width: '20%'}}>
              <View>
                <ImageBackground style={styles.backgroundprofile}>
                  <View style={styles.info}>
                    <Image
                      style={styles.profile}
                      source={{
                        uri: LINK.urlImageUser + USER_PROFILE.id,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View style={styles.information}>
              <Text style={styles.title}>Title: {item.name}</Text>
              <Text style={styles.title}>
                From: {moment(item.date_from).format('DD-MM-YYYY')}
              </Text>
              <Text style={styles.title}>
                To: {moment(item.date_to).format('DD-MM-YYYY')}
              </Text>
              <Text style={styles.title}>
                Emp: {item.object_of_application}
              </Text>
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View style={{marginTop: 5}}>
            <FlatList
              data={this.renderData(this.state.listData)}
              //data={this.props.listData}
              contentContainerStyle={{padding: 5}}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              renderItem={this.Item}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={this.shouldLoadMore ? this.loadMore : null}
              initialNumToRender={10}
              onEndReachedThreshold={0.01}
            />
            {this.state.isLoadMore && (
              <ActivityIndicator
                size="large"
                color="blue"
                style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // listData: state.contactReducer.listDataContact,
    listData: state.listNewAttendanceReducer.listDataNewAttendance,
    status: state.listNewAttendanceReducer.status,
    searchRequests: state.listNewAttendanceReducer.searchRequests,
  };
}

export default connect(mapStateToProps, {newAttendanceList})(
  ListNewAttendanceScreen,
);

const styles = StyleSheet.create({
  inputSearchAttendanceRequest: {
    marginTop: 8,
    height: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    left: 8,
    width: WIDTH - 16,
    paddingLeft: 10,
  },
  backgroundprofile: {
    width: undefined,
    paddingTop: 2,
    marginTop: 2,
    borderBottomColor: 'black',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  info: {
    alignItems: 'center',
  },
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#1e90ff',
  },
  information: {
    justifyContent: 'center',
    width: '70%',
  },
  call: {
    backgroundColor: 'blue',
    borderRadius: 1000,
    height: 30,
    width: 30,
  },
  chat: {
    backgroundColor: '#00ffff',
    borderRadius: 1000,
    height: 30,
    width: 30,
    marginHorizontal: 3,
  },
  mail: {
    backgroundColor: '#6495ed',
    borderRadius: 1000,
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 15,
  },
  uttonWrapper: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  inputIcon: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    marginTop: 28,
  },
  iconContacts: {
    flexDirection: 'row',
    justifyContent: 'center',
    right: 0,
    alignItems: 'center',
    width: '30%',
  },
  inputIconCall: {
    top: 8,
    left: 9,
  },
  inputIconChat: {
    top: 7,
    left: 8,
  },
  inputIconMail: {
    top: 7,
    left: 8,
  },
});
