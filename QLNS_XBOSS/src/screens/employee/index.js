import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Linking,
  Image,
  ActivityIndicator,
} from 'react-native';
// import {withGlobalContext} from '../../../GlobalContextProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmployeeScreenBusiness from '../../business/EmployeeScreenBusiness';
import {employeeList} from '../../redux/actions/employeeAction';
import {connect} from 'react-redux';
import {DATA_STATUS, LINK, HOST} from '../../utils/configs';
import moment from 'moment';
import 'moment-timezone';
import Spinner from 'react-native-loading-spinner-overlay';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class EmployeeScreen extends React.Component {
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
    this.fieldsEmployee = [
      'id',
      'name',
      'mobile_phone',
      'work_email',
      'address_id',
      'job_id',
      'level_id',
      'department_id',
      'parent_id',
      'birthday',
      'start_working_date',
      'sinid',
      'company_id',
      'identification_id',
      'work_location',
      'coach_id',
      'tz',
      'seniority',
      'classification_id',
      'resource_calendar_id',
      'code',
      'ethnic_id',
      'identification_date',
      'identification_place',
      'marital',
      'gender',
      'personal_email',
      'salary_to_bank',
      'bank_account_id',
    ];
  }
  onGoToDetail = () => {
    this.props.navigation.navigate('EmployeeDetail');
  };
  //Call button
  onCall = (num) => {
    var tel = 'tel://' + num;
    Linking.openURL(tel);
  };
  onSms = (num) => {
    var sms = 'sms://' + num;
    Linking.openURL(sms);
  };
  onMail = (email) => {
    var mail = 'mailto:' + email;
    Linking.openURL(mail);
  };
  componentDidMount = async () => {
    const employeeScreenBusiness = new EmployeeScreenBusiness();
    let employees = await employeeScreenBusiness.getListEmployee(
      [],
      this.fieldsEmployee,
      this.offset,
      this.limit,
      '',
      LINK.getAPI,
      'search_read',
    );

    this.props.employeeList(employees);
    this.state.listData = this.props.listData;
    this.setState({refreshList: true});
  };
  componentDidUpdate(prevProps) {
    console.log(
      'kiem tra tai componentUpdate=============',
      this.props.listData,
    );
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
  loadMore = async () => {
    if (this.shouldLoadMore) {
      this.setState({
        isLoadMore: true,
      });

      const employeeScreenBusiness = new EmployeeScreenBusiness();
      let employees = await employeeScreenBusiness.getListEmployee(
        [],
        this.fieldsEmployee,
        this.offset,
        this.limit,
        '',
        LINK.getAPI,
        'search_read',
      );
      employees.data = [...this.props.listData, ...employees.data];
      this.props.employeeList(employees);
      this.setState({listData: this.props.listData});
    }
  };
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' ',
    );
    return str;
  };
  // renderData = (list = []) => {
  //   let datalist = [];

  //   list.forEach((item) => {
  //     const name = this.removeVietnameseTones(item.name);
  //     if (
  //       name.toLowerCase().indexOf(this.props.searchEmployee.toLowerCase()) !=
  //       -1
  //     ) {
  //       console.log('2 gia tri bang nhau >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //       datalist.push(item);

  //       console.log('kiem tra datalist tại render Data+++++++++++++', datalist);
  //     } else {
  //       console.log('2 gia tri khong bang nhau >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //     }
  //   });

  //   return datalist;
  // };
  itemSeparatorComponent = () => {
    return <View style={{height: 5}} />;
  };

  ItemEmployee = ({item}) => (
    //(this.setState = {mobile_phone: item.mobile_phone, email: item.work_email}),
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('DashboardStack', {
          screen: 'EmployeeDetail',
          params: {
            ima: item.id,
            name: item.name,
            email: item.work_email,
            number: item.mobile_phone,
            manager: item.parent_id[1],
            department: item.department_id[1],
            id_department: item.department_id[0],
            position: item.job_id[1],
            id_position: item.job_id[0],
            type: item.level_id[1],
            id_type: item.level_id[0],
            id: item.identification_id,
            //birthday: moment(item.birthday).format('DD-MM-YYYY'),
            birthday: item.birthday,
            //datework: moment(item.start_working_date).format('DD-MM-YYYY'),
            datework: item.start_working_date,
            address: item.address_id[1],
            ima1: item.parent_id[0],
            code: item.code,
            resource: item.resource_calendar_id[1],
            coach: item.coach_id[1],
            coachId: item.coach_id[0],
            tz: item.tz,
            seniority: item.seniority,
            classification: item.classification_id[1],
            location: item.work_location,
            company: item.company_id[1],
            ethnic: item.ethnic_id[1],
            identification_date: item.identification_date,
            identification_place: item.identification_place,
            marital: item.marital,
            gender: item.gender,
            personal_email: item.personal_email,
            salary_to_bank: item.salary_to_bank,
            bank_account_id: item.bank_account_id,
            limit: this.limit,
          },
        });
      }}>
      <Swipeable
        renderRightActions={
          (RightActionsContact = () => {
            return (
              <View style={styles.iconContacts}>
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
              </View>
            );
          })
        }>
        {this.state.changeColor == item.id ? (
          <View style={styles.traceButton}>
            <View style={{width: '15%'}}>
              <Image
                style={styles.logo1}
                source={{
                  uri: LINK.urlImage + item.id,
                }}
              />
            </View>
            <View style={styles.information}>
              <Text style={styles.titleName}>{item.name}</Text>
              <Text style={styles.title}>{item.code}</Text>
              <Text style={styles.title}>{item.company_id[1]}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.Button}>
            <View style={{width: '15%'}}>
              <Image
                style={styles.logo1}
                source={{
                  uri: HOST.URL + HOST.SERVICE_API.IMAGE_EMPLOYEE + item.id,
                }}
              />
            </View>
            <View style={styles.information}>
              <Text style={styles.titleName}>{item.name}</Text>
              <Text style={styles.title}>{item.code}</Text>
              <Text style={styles.title}>{item.company_id[1]}</Text>
            </View>
          </View>
        )}
      </Swipeable>
    </TouchableOpacity>
  );
  //Loading chờ data
  ListEmptyComponent() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        }}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }

  render() {
    console.log('kiem tra reducer employee', this.props.listData);
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View>
            <FlatList
              data={this.state.listData}
              //contentContainerStyle={{padding: 5}}
              //ItemSeparatorComponent={this.itemSeparatorComponent}
              //ListEmptyComponent={this.ListEmptyComponent}
              renderItem={this.ItemEmployee}
              //extraData={(item) => item.id}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={this.shouldLoadMore ? this.loadMore : null}
              initialNumToRender={10}
              onEndReachedThreshold={0.01}
            />
            {this.state.isLoadMore && (
              <ActivityIndicator
                size="small"
                color="#1C75BC"
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
    listData: state.employeesReducer.listDataEmployee,
    status: state.employeesReducer.status,
    searchEmployee: state.employeesReducer.searchEmployee,
  };
}
export default connect(mapStateToProps, {employeeList})(EmployeeScreen);
const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 5,
    borderColor: '#e5e5e5',
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  information: {
    justifyContent: 'center',
    width: '90%',
    paddingHorizontal: 5,
  },
  call: {
    backgroundColor: 'blue',
    borderRadius: 1000,
    height: 30,
    width: 30,
  },
  chat: {
    backgroundColor: '#6495ed',
    borderRadius: 1000,
    height: 30,
    width: 30,
    marginHorizontal: 3,
  },
  mail: {
    backgroundColor: 'blue',
    borderRadius: 1000,
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 14,
  },
  titleName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C75BC',
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
    alignItems: 'center',
    width: '30%',
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1C75BC',
    marginVertical: 3,
    backgroundColor: 'white',
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
  logo1: {
    width: 40,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#1C75BC',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  traceButton: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 5,
    borderColor: '#1C75BC',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#cce6ff',
  },
  Button: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 5,
    borderColor: '#1C75BC',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
