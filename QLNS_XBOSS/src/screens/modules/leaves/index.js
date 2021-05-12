import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import {withGlobalContext} from '../../../GlobalContextProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LeavesScreenBusiness from '../../../business/LeavesScreenBusiness';
import {leavesList} from '../../../redux/actions/leaveAction';
import {connect} from 'react-redux';
import moment from 'moment';
import {DATA_STATUS, LINK, USER_PROFILE} from '../../../utils/configs';
import Swipeable from 'react-native-gesture-handler/Swipeable';
class LeavesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoadMore: false,
      listData: [],
      refreshList: false,
    };
    this.shouldLoadMore = true;
    this.offset = 0;
    this.limit = 10;
  }
  onGoToDetail = () => {
    this.props.navigation.navigate('ContactDetail');
  };
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

      const leaveScreenBusiness = new LeavesScreenBusiness();
      let leaves = await leaveScreenBusiness.getListLeaves(
        [
          '|',
          ['user_id', '=', USER_PROFILE.id],
          ['employee_manager_user_id', '=', USER_PROFILE.id],
          ['employee_id.user_id', '=', USER_PROFILE.id],
        ],
        [
          'employee_id',
          'holiday_type',
          'holiday_status_id',
          'name',
          'date_from',
          'date_to',
          'duration_display',
          'state',
          'payslip_status',
          'category_id',
          'department_id',
          'manager_id',
          'user_id',
        ],
        this.offset,
        this.limit,
        '',
        LINK.getAPI,
        'search_read',
      );
      leaves.data = [...this.props.listData, ...leaves.data];
      this.props.leavesList(leaves);
      this.setState({listData: this.props.listData});
    }
  };
  componentDidMount = async () => {
    const leaveScreenBusiness = new LeavesScreenBusiness();
    let leaves = await leaveScreenBusiness.getListLeaves(
      [
        '|',
        ['user_id', '=', USER_PROFILE.id],
        ['employee_manager_user_id', '=', USER_PROFILE.id],
        ['employee_id.user_id', '=', USER_PROFILE.id],
      ],
      [
        'employee_id',
        'holiday_type',
        'holiday_status_id',
        'name',
        'date_from',
        'date_to',
        'duration_display',
        'state',
        'payslip_status',
        'category_id',
        'department_id',
        'manager_id',
        'user_id',
      ],
      this.offset,
      this.limit,
      '',
      LINK.getAPI,
      'search_read',
    );

    this.props.leavesList(leaves);
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
      console.log(
        'kiem tra item date from',
        moment(item.date_from).format('DD-MM-YYYY'),
      );
      console.log('kiem tra search requests', this.props.searchLeaves);
      if (
        moment(item.date_from)
          .format('DD-MM-YYYY')
          .indexOf(this.props.searchLeaves) != -1
      ) {
        console.log('2 gia tri bang nhau >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        datalist.push(item);

        console.log('kiem tra datalist tại render Data+++++++++++++', datalist);
      } else {
        console.log('2 gia tri khong bang nhau >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      }
    });

    return datalist;
  };
  itemSeparatorComponent = () => {
    return <View style={{height: 5}} />;
  };

  RightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <View style={styles.iconContacts}>
        <TouchableOpacity
          style={styles.call}
          onPress={() => this.onCall(this.state.mobile_phone)}>
          <FontAwesome
            name={'phone'}
            size={15}
            color={'white'}
            style={styles.inputIconCall}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chat}
          onPress={() => this.onSms(this.state.mobile_phone)}>
          <FontAwesome
            name={'comment'}
            size={15}
            color={'white'}
            style={styles.inputIconChat}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mail}
          onPress={() => this.onMail(this.state.work_email)}>
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
  Item = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('DashboardStack', {
          screen: 'DetailLeaveScreen',
          params: {
            employee_id: item.employee_id[1],
            name: item.name,
            holiday_status_id: item.holiday_status_id[1],
            holiday_type: item.holiday_type,
            duration_display: item.duration_display,
            date_from: item.date_from,
            date_to: item.date_to,
            department_id: item.department_id[1],
            user_id: item.user_id,
            manager_id: item.manager_id,
          },
        })
      }>
      <Swipeable renderRightActions={this.RightAction}>
        <View style={styles.item}>
          <View style={{width: '20%'}}>
            <Image
              style={styles.profile}
              source={{
                uri: LINK.urlImageUser + USER_PROFILE.id,
              }}
            />
          </View>
          <View style={styles.information}>
            <Text style={styles.titleHead}>{item.employee_id[1]}</Text>
            <Text style={styles.title}>
              Status: {item.holiday_status_id[1]}
            </Text>
            <Text style={styles.title}>Type: {item.holiday_type}</Text>
            <Text style={styles.title}>
              Leave Days: {item.duration_display}
            </Text>
            <Text style={styles.title}>
              Start Date: {moment(item.date_from).format('DD-MM-YYYY HH:mm:ss')}
            </Text>
            <Text style={styles.title}>
              End Date: {moment(item.date_to).format('DD-MM-YYYY HH:mm:ss')}
            </Text>
          </View>
          {/*<View style={styles.iconContacts}>
          <TouchableOpacity
            style={styles.call}
            onPress={() => this.onCall(item.mobile_phone)}>
            <FontAwesome
              name={'phone'}
              size={15}
              color={'white'}
              style={styles.inputIconCall}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chat}
            onPress={() => this.onSms(item.mobile_phone)}>
            <FontAwesome
              name={'comment'}
              size={15}
              color={'white'}
              style={styles.inputIconChat}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mail}
            onPress={() => this.onMail(item.work_email)}>
            <FontAwesome
              name={'envelope'}
              size={15}
              color={'white'}
              style={styles.inputIconMail}
            />
          </TouchableOpacity>
        </View>*/}
        </View>
      </Swipeable>
    </TouchableOpacity>
  );

  render() {
    console.log('kiem tra reducer employee', this.props.listData);
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View>
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
    listData: state.leavesReducer.listDataLeave,
    status: state.leavesReducer.status,
    searchLeaves: state.leavesReducer.searchLeaves,
  };
}
export default connect(mapStateToProps, {leavesList})(LeavesScreen);

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#1e90ff',
  },
  information: {
    justifyContent: 'center',
    width: '100%',
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
  titleHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  buttonWrapper: {
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
  Accounts: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  ModelAccount: {
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    height: '50%',
    width: '90%',
  },
  ModelBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
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
  profile: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
});
