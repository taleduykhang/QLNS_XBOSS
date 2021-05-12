import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {IconCalendar} from '../../../resource/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RequestScreenBusiness from '../../../business/RequestScreenBusiness';
import {requestCreate} from '../../../redux/actions/requestAction';
import UserIdBusiness from '../../../business/UserIdBusiness';
import {idUser} from '../../../redux/actions/userIdAction';
import {request, connect} from 'react-redux';
import {USER_PROFILE, EMPLOYEE_ID, LINK} from '../../../utils/configs';
import moment from 'moment';
import moment2 from 'moment';
import NewAttendanceScreenBusiness from '../../../business/NewAttendanceScreenBusiness';
import {newAttendanceList} from '../../../redux/actions/newAttendanceAction';
import {Picker} from '@react-native-picker/picker';

const {width: WIDTH} = Dimensions.get('window');

class NewAttendance extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisibleStart: false,
      isVisibleEnd: false,
      chosenDateStart: '',
      chosenDateEnd: '',
      endTime: '',
      startTime: '',
      attendanceday: ' ',
      valueday: '',
      title: '',
      description: '',
      dayfrom: '',
      dayto: '',
      unit: '',
    };
  }

  onGoToListRequest = () => {
    this.props.navigation.navigate('ListNewAttendanceScreen');
  };
  inputTitle = (text) => {
    this.setState({
      title: text,
    });
  };
  inputeDescription = (text) => {
    this.setState({
      description: text,
    });
  };
  handlePickerStart = (datetimeStart) => {
    this.setState({
      isVisibleStart: false,
      chosenDateStart: moment(datetimeStart).format('YYYY-MM-DD'),
    });
  };
  showPickerStart = () => {
    this.setState({
      isVisibleStart: true,
    });
  };
  hidePickerStart = () => {
    this.setState({
      isVisibleStart: false,
    });
  };

  handlePickerEnd = (datetimeEnd) => {
    this.setState({
      isVisibleEnd: false,
      chosenDateEnd: moment2(datetimeEnd).format('YYYY-MM-DD'),
    });
  };
  showPickerEnd = () => {
    this.setState({
      isVisibleEnd: true,
    });
  };
  hidePickerEnd = () => {
    this.setState({
      isVisibleEnd: false,
    });
  };
  onChangeTextStartTime = (text) => {
    this.setState({
      startTime: text,
    });
  };
  onChangeTextEndTime = (text) => {
    this.setState({
      endTime: text,
    });
  };

  onCreateRequest = async () => {
    var test = [];
    let requestscreate = [];
    var startTimeDay = ' 17:00:00';
    var endTimeDay = ' 16:59:59';
    var startTimeHalfAm = ' 17:00:00';
    var endTimeHalfAm = '  05:00:00';
    var startTimeHalfPm = ' 05:00:00';
    var endTimeHalfPm = ' 16:59:59';
    var startTimeHalf = '';
    var endTimeHalf = '';
    var yesterday = new Date(this.state.chosenDateStart);
    yesterday.setDate(yesterday.getDate() - 1);

    if (this.state.valueday == 'am') {
      startTimeHalf = yesterday.toDateString() + startTimeHalfAm;
      endTimeHalf = this.state.chosenDateStart + endTimeHalfAm;
    }
    if (this.state.valueday == 'pm') {
      startTimeHalf = this.state.chosenDateStart + startTimeHalfPm;
      endTimeHalf = this.state.chosenDateStart + endTimeHalfPm;
    }

    const requestScreenBusiness = new RequestScreenBusiness();
    const userIdBusiness = new UserIdBusiness();
    let employeeId = await userIdBusiness.getUserId(
      [['user_id', '=', USER_PROFILE.id]],
      ['id'],
      0,
      1,
      '',
      LINK.getAPI,
      'search_read',
    );
    console.log('kiem tra emp id tại màn hình', employeeId.data[0].id);
    switch (this.state.attendanceday) {
      case 'half_day':
        return (
          (requestscreate = await requestScreenBusiness.createRequest(
            {
              state: 'draft',
              request_unit: this.state.attendanceday,
              date_from: startTimeHalf,
              //date_from: '2020-11-29 17:00:00',
              request_date_from: this.state.chosenDateStart,
              request_date_from_period: this.state.valueday,
              attendance_option: 'attendance_request',
              mode: 'emp',
              employee_ids: [[6, false, [employeeId.data[0].id]]],
              company_domain_id: false,
              calendar_id: false,

              name: this.state.title,
              leave_status_id: 29,
              date_to: endTimeHalf,
              // date_to: '2020-11-29 05:00:00',
              request_date_to: this.state.chosenDateStart,
              request_hour_from: false,
              request_hour_to: false,
              location_id: false,
              description: this.state.description,
              classification_id: false,
              department_id: false,
              employee_miss_ids: [[6, false, []]],
              message_attachment_count: 0,
              reference_count: 0,
              can_have_reference: false,

              // company_id: 2,
            },
            LINK.getAPI,
            'create',
          )),
          console.log('Check create request after onpress', requestscreate),
          this.props.requestCreate(requestscreate),
          Alert.alert(
            'Notification',
            'Create successful',
            [{text: 'OK', onPress: this.onLoad}],
            {cancelable: false},
          ),
          this.setState({
            visible: false,
          })
        );
      default:
        return (
          (requestscreate = await requestScreenBusiness.createRequest(
            {
              state: 'draft',
              request_unit: this.state.attendanceday,
              date_from: yesterday.toDateString() + startTimeDay,
              // date_from: '2020-11-28 17:00:00',
              request_date_from: this.state.chosenDateStart,
              request_date_from_period: 'am',
              attendance_option: 'attendance_request',
              mode: 'emp',
              employee_ids: [[6, false, [employeeId.data[0].id]]],
              company_domain_id: false,
              calendar_id: false,

              name: this.state.title,
              leave_status_id: 29,
              date_to: this.state.chosenDateEnd + endTimeDay,
              // date_to: '2020-11-29 16:59:59',
              request_date_to: this.state.chosenDateEnd,

              request_hour_from: false,
              request_hour_to: false,
              location_id: false,
              description: this.state.description,
              classification_id: false,
              department_id: false,
              employee_miss_ids: [[6, false, []]],
              message_attachment_count: 0,
              reference_count: 0,
              can_have_reference: false,

              // company_id: 2,
            },
            LINK.getAPI,
            'create',
          )),
          console.log('Check create request after onpress', requestscreate),
          this.props.requestCreate(requestscreate),
          Alert.alert(
            'Notification',
            'Create successful',
            [{text: 'OK', onPress: this.onGoToListRequest}],
            {cancelable: false},
          ),
          this.setState({
            visible: false,
          })
        );
    }
  };

  onCreate = async () => {
    const requestScreenBusiness = new RequestScreenBusiness();
    const userIdBusiness = new UserIdBusiness();
    let employeeId = await userIdBusiness.getUserId(
      [['user_id', '=', USER_PROFILE.id]],
      ['id'],
      0,
      1,
      '',
      LINK.getAPI,
      'search_read',
    );
    console.log('kiem tra emp id tại màn hình', employeeId.data[0].id);
    let requestscreate = await requestScreenBusiness.createRequest(
      {
        name: this.state.title,
        description: this.state.description,

        employee_ids: [[6, false, [employeeId.data[0].id]]],
        leave_status_id: 29,
        // company_id: 2,
        company_domain_id: 2,
        mode: 'emp',
        attendance_option: 'attendance_request',
        request_unit: this.state.attendanceday,
        request_date_from_period: this.state.valueday,
        request_date_from: this.state.chosenDateStart,
        request_date_to: this.state.chosenDateStart,
      },
      LINK.getAPI,
      'create',
    );
    console.log('Check create request after update', requestscreate);
    // this.props.requestCreate(requestscreate);
    // Alert.alert(
    //   'Notification',
    //   'Create successful',
    //   [{text: 'OK', onPress: this.onGoToListRequest}],
    //   {cancelable: false},
    // );
    // this.setState({
    //   visible: false,
    // });
  };
  onLoad = async () => {
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
    console.log('list new attendance', listNewAttendances);
    // this.setState({listContact: contacts.data})
    this.props.newAttendanceList(listNewAttendances);
    this.props.navigation.navigate('ListNewAttendanceScreen');
  };
  renderDate = (name) => {
    switch (name) {
      case 'days_long':
        return (
          <View>
            <View style={styles.viewEnd}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>To</Text>
              <TextInput
                style={styles.endTime}
                value={this.state.chosenDateEnd}
                onChangeText={this.onChangeTextEndTime}
                placeholder="End time"
              />
              <View style={styles.iconCalendarEnd}>
                <TouchableOpacity onPress={this.showPickerEnd}>
                  <IconCalendar size={25} color="#1e90ff" />
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                cancelTextIOS={'Exit'}
                confirmTextIOS={'OK'}
                isVisible={this.state.isVisibleEnd}
                onConfirm={this.handlePickerEnd}
                onCancel={this.hidePickerEnd}
                mode={'date'}
                is24Hour={false}
              />
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.viewEnd}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Session</Text>
            <View style={styles.ViewPicker2}>
              <Picker
                mode="dropdown"
                style={styles.Picker}
                selectedValue={this.state.valueday}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({valueday: itemValue})
                }>
                <Picker.Item label="Morning" value="am" />
                <Picker.Item label="Afternoon" value="pm" />
              </Picker>
            </View>
          </View>
        );
    }
  };

  render() {
    var name = this.state.attendanceday;
    var session = this.state.valueday;
    return (
      <ScrollView>
        <View style={styles.viewTitle}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Title</Text>
          <TextInput
            placeholder=""
            style={styles.inputtitle}
            onChangeText={this.inputTitle}
            multiline={true}></TextInput>
        </View>
        <View>
          <View style={styles.viewOption}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Option</Text>
            <View style={styles.ViewPicker}>
              <Picker
                mode="dropdown"
                style={styles.Picker}
                selectedValue={this.state.attendanceday}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({attendanceday: itemValue})
                }>
                <Picker.Item label="Half day" value="half_day" />
                <Picker.Item label="Days long" value="days_long" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.viewStart}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>From</Text>

            <TextInput
              style={styles.startTime}
              value={this.state.chosenDateStart}
              onChangeText={this.onChangeTextStartTime}
              placeholder="Start time"
            />
            <View style={styles.iconCalendarStart}>
              <TouchableOpacity onPress={this.showPickerStart}>
                <IconCalendar size={25} color="#1e90ff" />
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              cancelTextIOS={'Exit'}
              confirmTextIOS={'OK'}
              isVisible={this.state.isVisibleStart}
              onConfirm={this.handlePickerStart}
              onCancel={this.hidePickerStart}
              mode={'date'}
              is24Hour={false}
            />
          </View>
          <View>{this.renderDate(name)}</View>
        </View>

        <View>
          <View style={styles.viewDescripttion}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Descripttion</Text>

            <TextInput
              placeholder="Forget checkout"
              style={styles.description}
              onChangeText={this.inputeDescription}
              multiline={true}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.textAdd} onPress={this.onCreateRequest}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    createData: state.requestReducer.dataCreateRequest,
    useriddata: state.userIdReducer.dataUser,
    listData: state.listNewAttendanceReducer.listDataNewAttendance,
  };
}
export default connect(mapStateToProps, {
  requestCreate,
  idUser,
  newAttendanceList,
})(NewAttendance);
const styles = StyleSheet.create({
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 55,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#1e90ff',
    height: 60,
    alignSelf: 'center',
    width: WIDTH,
  },
  textAdd: {
    color: '#e6e6e6',
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  viewAddRequest: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 5,
    paddingVertical: 20,
  },
  viewTextAdd: {
    color: '#1e90ff',
    fontSize: 22,
    borderWidth: 1,
    width: '15%',
    textAlign: 'center',
    paddingVertical: 2,
  },
  viewBody: {
    flexDirection: 'row',

    //justifyContent: 'space-around',
    // alignSelf: 'center',
  },
  button: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    marginTop: 15,
  },
  viewSessionMorning: {
    marginTop: 10,
  },
  iconCalendarStart: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  iconCalendarEnd: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  ViewPicker: {
    marginTop: 5,
    borderWidth: 1,

    width: WIDTH - 15,
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ViewPicker2: {
    marginTop: 5,
    borderWidth: 1,
    width: WIDTH - 190,
    borderRadius: 5,
    height: 40,
    paddingLeft: 40,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Picker: {
    height: 30,
    width: '99%',
  },
  viewOption: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  viewTitle: {
    marginTop: 10,
    alignSelf: 'center',
  },
  inputtitle: {
    marginTop: 5,
    borderWidth: 1,

    width: WIDTH - 15,
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 14,
    alignSelf: 'center',
  },
  viewStart: {
    left: 8,
  },
  startTime: {
    marginTop: 5,
    borderWidth: 1,
    alignSelf: 'center',
    width: WIDTH - 190,
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 14,
  },
  viewEnd: {
    left: 13,
  },
  endTime: {
    marginTop: 5,
    borderWidth: 1,
    width: WIDTH - 190,
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
    textAlign: 'left',
    fontSize: 14,
  },
  viewDescripttion: {
    alignSelf: 'center',
  },

  description: {
    marginTop: 5,
    borderWidth: 1,
    alignSelf: 'center',
    width: WIDTH - 15,
    borderRadius: 5,
    height: 200,
    paddingLeft: 15,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 14,
  },
});
