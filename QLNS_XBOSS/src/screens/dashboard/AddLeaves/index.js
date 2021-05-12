import {Picker} from '@react-native-picker/picker';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import {CheckBox} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {IconCalendar, IconDown} from '../../../resource/icons';
import AddLeavesScreenBussiness from '../../../business/AddLeavesScreenBussiness';
import CreateLeaveScreenBussiness from '../../../business/CreateLeaveScreenBussiness';
import {addleavesList} from '../../../redux/actions/addleaveAction';
import {createleavesList} from '../../../redux/actions/createleaveAction';
import EmployeeScreenBusiness from '../../../business/EmployeeScreenBusiness';
import {employeeList} from '../../../redux/actions/employeeAction';
import LeavesScreenBusiness from '../../../business/LeavesScreenBusiness';
import {leavesList} from '../../../redux/actions/leaveAction';
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import UserIdBusiness from '../../../business/UserIdBusiness';
import {idUser} from '../../../redux/actions/userIdAction';
import {USER_PROFILE, LINK} from '../../../utils/configs';
import {DefaultTheme} from '@react-navigation/native';
const {width: WIDTH} = Dimensions.get('window');

class AddLeavesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      chosenDate: '',
      startTime: '',
      chosenDateEnd: '',
      endTime: '',
      title: '',
      isVisible2: false,
      data: [],
      selected: [0, ''],
      visiblePopOver: false,
      userId: USER_PROFILE.id,
      user: USER_PROFILE.name,
      id_company: USER_PROFILE.id_company,
      visibleRequest: false,
      checked: false,
      valuedayfrom: '',
      valuedayto: '',
      countDay: 1,
    };
  }
  inputTitle = (text) => {
    this.setState({
      title: text,
    });
  };
  OnRequest = (t, e) => {
    this.setState({
      visibleRequest: !this.state.visibleRequest,
      userId: t,
      user: e,
    });
  };
  ItemRequest = ({item}) => (
    <View style={styles.listDataLeaveType}>
      <TouchableOpacity
        onPress={() => this.OnRequest(item.userId, item.user)}
        style={styles.button1}>
        <Text style={styles.title}>{item.user}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );
  onPopover = async (t, e) => {
    this.setState({
      visiblePopOver: !this.state.visiblePopOver,
      selected: [t, e],
    });
    const leaveScreenBusiness = new AddLeavesScreenBussiness();
    let Addleaves = await leaveScreenBusiness.getListLeavesType(
      ([
        'allocation_type',
        'not in',
        ['holiday', 'attendance_request', 'business_trip'],
      ],
      ['valid', '=', true],
      '|',
      ['company_id', '=', this.state.id_company],
      ['company_id', '=', false]),
      LINK.getAPI,
      'name_search',
    );
    // this.setState({listContact: contacts.data})
    this.props.addleavesList(Addleaves);
    this.setState({data: Addleaves.data});
  };
  ItemLeaveType = ({item}) => (
    <View style={styles.listDataLeaveType}>
      <TouchableOpacity
        onPress={() => this.onPopover(item[0], item[1])}
        style={styles.button1}>
        <Text style={styles.title}>{item[1]}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );
  onChangeTextLeaveType = (text) => {
    this.setState({
      selected: text,
    });
  };
  handlerPicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('YYYY-MM-DD'),
    });
  };
  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };
  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };
  onChangeTextStartTime = (text) => {
    this.setState({
      startTime: text,
    });
  };
  showPickerEnd = () => {
    this.setState({
      isVisible2: true,
    });
  };
  hidePickerEnd = () => {
    this.setState({
      isVisible2: false,
    });
  };
  handlerPickerEnd = (datetime2) => {
    this.setState({
      isVisible2: false,
      chosenDateEnd: moment(datetime2).format('YYYY-MM-DD'),
    });
  };
  onChangeTextEndTime = (text) => {
    this.setState({
      endTime: text,
    });
  };
  onLoad = async () => {
    const leaveScreenBusiness = new LeavesScreenBusiness();
    let leaves = await leaveScreenBusiness.getListLeaves(
      [
        '|',
        ['user_id', '=', USER_PROFILE.id],
        ['employee_manager_user_id', '=', 208],
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
      0,
      0,
      '',
      LINK.getAPI,
      'search_read',
    );
    // this.setState({listContact: contacts.data})
    this.props.leavesList(leaves);
    this.props.navigation.navigate('LeavesScreen');
  };
  onCreate = async () => {
    console.log('test ngay', this.state.chosenDateEnd);
    console.log('test ngay--------', this.state.chosenDate);
    const createLeaveScreenBusiness = new CreateLeaveScreenBussiness();
    let createLeave = await createLeaveScreenBusiness.getCreateLeaves(
      {
        name: this.state.title,
        employee_id: 83,
        company_id: USER_PROFILE.id_company,
        holiday_status_id: this.state.selected[0],
        request_date_from: this.state.chosenDate,
        request_date_from_period: 'am',
        request_date_to: this.state.chosenDateEnd,
        request_date_to_period: 'am',
        number_of_days: 0.5,
        request_unit_half: true,
      },
      LINK.getAPI,
      'create',
    );
    console.log('Check leave details after create', createLeave);
    this.props.createleavesList(createLeave);
    Alert.alert(
      'Notification',
      'Create successful',
      [{text: 'OK', onPress: this.onLoad}],
      {cancelable: false},
    );
    this.setState({
      visible: false,
    });
  };
  onCheckCreateLeave = async () => {
    let createLeave = [];
    var morningFrom = ' 01:00:00';
    var morningTo = ' 05:00:00';
    var period = 'pm';
    var afternoonFrom = ' 06:30:00';
    var afternoonTo = ' 10:30:00';

    var dayFrom = ' 06:30:30';
    var dayTo = ' 10:30:00';
    var dateFrom = '';
    var dateTo = '';

    if (this.state.valuedayfrom == 'am') {
      dateFrom = this.state.chosenDate + morningFrom;
      dateTo = this.state.chosenDate + morningTo;
    }
    if (this.state.valuedayfrom == 'pm') {
      dateFrom = this.state.chosenDate + afternoonFrom;
      dateTo = this.state.chosenDate + afternoonTo;
    }
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
    const createLeaveScreenBusiness = new CreateLeaveScreenBussiness();
    console.log('kiem tra emp id tại màn hình', employeeId.data[0].id);
    switch (this.state.checked) {
      case false:
        return (
          (createLeave = await createLeaveScreenBusiness.getCreateLeaves(
            {
              company_id: USER_PROFILE.id_company,
              holiday_status_id: this.state.selected[0],
              date_from: this.state.chosenDate + dayFrom,
              date_to: this.state.chosenDateEnd + dayTo,
              request_date_from: this.state.chosenDate,
              request_date_from_period: this.state.valuedayfrom,
              request_date_to: this.state.chosenDateEnd,
              request_date_to_period: this.state.valuedayto,
              employee_id: employeeId.data[0].id,
              number_of_days: this.state.countDay,
              request_unit_half: true,
              request_unit_hours: false,
              request_unit_custom: false,
              request_hour_from: false,
              request_hour_to: false,
              name: this.state.title,
              is_backdated: false,
              department_id: 16,
              message_attachment_count: 0,
              reference_count: 0,
              can_have_reference: false,
            },
            LINK.getAPI,
            'create',
          )),
          console.log('Check leave details after create', createLeave),
          this.props.createleavesList(createLeave),
          Alert.alert(
            'Notification',
            'Create successful',
            [{text: 'OK', onPress: this.onLoad}],
            {cancelable: false},
          ),
          this.setState({
            visible: false,
          }),
          console.log('check kiem tra nghi phep tai man hinh', createLeave)
        );
      case true:
        return (
          //test nữa ngày
          (createLeave = await createLeaveScreenBusiness.getCreateLeaves(
            {
              company_id: USER_PROFILE.id_company,
              holiday_status_id: this.state.selected[0],
              date_from: dateFrom,
              date_to: dateTo,
              request_date_from: this.state.chosenDate,
              request_date_from_period: this.state.valuedayfrom,
              request_date_to: this.state.chosenDate,
              request_date_to_period: period,
              employee_id: employeeId.data[0].id,
              number_of_days: this.state.countDay,
              request_unit_half: true,
              request_unit_hours: false,
              request_unit_custom: false,
              request_hour_from: false,
              request_hour_to: false,
              name: this.state.title,
              is_backdated: false,
              department_id: 16,
              message_attachment_count: 0,
              reference_count: 0,
              can_have_reference: false,
            },
            LINK.getAPI,
            'create',
          )),
          console.log('Check leave details after create', createLeave),
          this.props.createleavesList(createLeave),
          Alert.alert(
            'Notification',
            'Create successful',
            [{text: 'OK', onPress: this.onLoad}],
            {cancelable: false},
          ),
          this.setState({
            visible: false,
          }),
          console.log('check kiem tra nghi phep tai man hinh', createLeave)
        );

      default:
        break;
    }
  };
  onGoToListLeave = () => {
    this.props.navigation.navigate('LeavesScreen');
  };
  // componentDidMount = async () => {
  //   const employeeScreenBusiness = new EmployeeScreenBusiness();
  //   let employees = await employeeScreenBusiness.getListEmployee(
  //     [],
  //     [
  //       'id',
  //       'user_id',

  //     ],
  //     0,
  //     0,
  //     '',
  //     LINK.getAPI,
  //     'search_read',
  //   );
  //   // this.setState({listContact: contacts.data})
  //   this.props.employeeList(employees);
  // };
  renderDay = (valueCheck) => {
    switch (valueCheck) {
      case true:
        return (
          <View>
            <View style={{flexDirection: 'row', top: 10}}>
              <Text style={{left: 5}}>From</Text>
              <Text style={{left: 170}}>Session</Text>
            </View>
            <View>
              <View style={styles.viewFromTime}>
                <TextInput
                  style={styles.inputFromTime}
                  value={this.state.chosenDate}
                  onChangeText={this.onChangeTextStartTime}
                />
                <TouchableOpacity
                  style={{position: 'absolute', top: 8, left: '40%'}}
                  onPress={this.showPicker}>
                  <IconCalendar size={25} color="#1e90ff" />
                </TouchableOpacity>
                <DateTimePickerModal
                  cancelTextIOS={'Exit'}
                  confirmTextIOS={'OK'}
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlerPicker}
                  onCancel={this.hidePicker}
                  mode={'date'}
                  is24Hour={false}
                />
              </View>
              <View style={styles.viewSession}>
                <View style={styles.viewOption}>
                  {/* <Text>Option</Text> */}
                  <View style={styles.ViewPickerSesion}>
                    <Picker
                      mode="dropdown"
                      style={styles.Picker}
                      selectedValue={this.state.valuedayfrom}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({valuedayfrom: itemValue})
                      }>
                      <Picker.Item label="" />
                      <Picker.Item label="Morning" value="am" />
                      <Picker.Item label="Afternoon" value="pm" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      case false:
        return (
          <View>
            <View>
              <View style={{flexDirection: 'row', top: 10}}>
                <Text style={{left: 5}}>From</Text>
                <Text style={{left: 170}}>Session</Text>
              </View>
              <View>
                <View style={styles.viewToTime}>
                  <TextInput
                    style={styles.inputFromTime}
                    value={this.state.chosenDate}
                    onChangeText={this.onChangeTextStartTime}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', top: 8, left: '40%'}}
                    onPress={this.showPicker}>
                    <IconCalendar size={25} color="#1e90ff" />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    cancelTextIOS={'Exit'}
                    confirmTextIOS={'OK'}
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlerPicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={false}
                  />
                </View>
                <View style={styles.viewSession}>
                  <View style={styles.viewOption}>
                    {/* <Text>Option</Text> */}
                    <View style={styles.ViewPickerSesion}>
                      <Picker
                        mode="dropdown"
                        style={styles.Picker}
                        selectedValue={this.state.valuedayfrom}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({valuedayfrom: itemValue})
                        }>
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Morning" value="am" />
                        <Picker.Item label="Afternoon" value="pm" />
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row', top: 10}}>
                <Text style={{left: 5, top: -20}}>To</Text>
                <Text style={{left: 190, top: -20}}>Session</Text>
              </View>
              <View>
                <View style={styles.viewFromTime}>
                  <TextInput
                    style={styles.inputEndTimeTo}
                    value={this.state.chosenDateEnd}
                    onChangeText={this.onChangeTextEndTime}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', top: -10, left: '40%'}}
                    onPress={this.showPickerEnd}>
                    <IconCalendar size={25} color="#1e90ff" />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    cancelTextIOS={'Exit'}
                    confirmTextIOS={'OK'}
                    isVisible={this.state.isVisible2}
                    onConfirm={this.handlerPickerEnd}
                    onCancel={this.hidePickerEnd}
                    mode={'date'}
                    is24Hour={false}
                  />
                </View>
                <View style={styles.viewSessionTo}>
                  <View style={styles.viewOption}>
                    {/* <Text>Option</Text> */}
                    <View style={styles.ViewPickerSesion}>
                      <Picker
                        mode="dropdown"
                        style={styles.Picker}
                        selectedValue={this.state.valuedayto}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({valuedayto: itemValue})
                        }>
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Morning" value="am" />
                        <Picker.Item label="Afternoon" value="pm" />
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
    }
  };
  getTimeLeave = () => {
    var getday = Math.abs(
      (new Date(this.state.chosenDateEnd) - new Date(this.state.chosenDate)) /
        (1000 * 60 * 60 * 24),
    );
    var day = getday - 1;

    console.log('kiem tra khoang cach giua cac ngay', day);

    if (this.state.valuedayfrom == 'am' && this.state.valuedayto == 'am') {
      this.state.countDay = day + 1.5;
    }
    if (this.state.valuedayfrom == 'am' && this.state.valuedayto == 'pm') {
      this.state.countDay = day + 2;
    }
    if (this.state.valuedayfrom == 'pm' && this.state.valuedayto == 'am') {
      this.state.countDay = day + 1;
    }
    if (this.state.valuedayfrom == 'pm' && this.state.valuedayto == 'pm') {
      this.state.countDay = day + 1.5;
    }

    switch (this.state.checked) {
      case true:
        return (this.state.countDay = 0.5);
      default:
        return this.state.countDay;
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.TextHeader}>Leave Type</Text>
          <View style={styles.ViewPicker}>
            <Text style={{top: 5, left: 5}}>{this.state.selected[1]} </Text>
            <Popover
              isVisible={this.state.visiblePopOver}
              onPress={this.onPopover}
              from={
                <TouchableOpacity onPress={this.onPopover}>
                  <IconDown size={25} color="#1e90ff" style={styles.IconDown} />
                </TouchableOpacity>
              }>
              <View>
                <FlatList
                  data={this.props.listAddLeave}
                  renderItem={this.ItemLeaveType}
                  extraData={(item) => item[0]}
                />
              </View>
            </Popover>
          </View>
          <View style={styles.ViewBody}>
            <Text style={styles.TextHeader}>Request By</Text>
          </View>
          <View style={styles.ViewPicker}>
            <Text style={{top: 5, left: 5}}>{this.state.user}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              title="Half day"
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <Text style={{top: 20}}>Time Leave: {this.getTimeLeave()} </Text>
          </View>
          <View>{this.renderDay(this.state.checked)}</View>

          <View>
            <Text style={styles.TextInputHeader}>Description</Text>
            <View style={styles.ViewTextInput}>
              <TextInput
                onChangeText={this.inputTitle}
                placeholder="Forget checkout"
                multiline={true}></TextInput>
            </View>
            <View>
              <TouchableOpacity style={styles.buttonAdd}>
                {/* <Text style={styles.textAdd} onPress={this.onCreate}> */}
                <Text style={styles.textAdd} onPress={this.onCheckCreateLeave}>
                  Add Leave
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    listAddLeave: state.addleaveReducer.listDataAddLeave,
    createLeave: state.createleaveReducer.listDataCreateLeave,
    listData: state.employeesReducer.listDataEmployee,
    listDataLeaves: state.leavesReducer.listDataLeave,
    useriddata: state.userIdReducer.dataUser,
  };
}
export default connect(mapStateToProps, {
  addleavesList,
  createleavesList,
  employeeList,
  leavesList,
  idUser,
})(AddLeavesScreen);
//export default AddLeavesScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewFromTime: {
    flexDirection: 'row',
    top: 10,
  },
  viewToTime: {
    flexDirection: 'row',
    top: 10,
  },

  viewSession: {
    top: 8,
  },
  viewSessionTo: {
    top: -12,
  },
  inputFromTime: {
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 170,
    margin: 5,
  },
  inputEndTime: {
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 170,
    margin: 5,
  },
  inputEndTimeTo: {
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 170,
    margin: 5,
    top: -20,
  },
  Picker: {
    height: 30,
    width: '99%',
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewOption: {
    // alignSelf: 'center',
    left: '50%',
    width: '50%',
    top: -43,
  },
  ViewPicker: {
    borderWidth: 1,

    width: '2%',
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonAdd: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: 5,
    //marginTop: 100,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#1e90ff',
  },
  textAdd: {
    color: '#e6e6e6',
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  TextHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
    marginRight: '25%',
  },
  TextInputHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
    marginRight: '25%',
    top: -40,
  },
  ViewHeader: {
    height: '20%',
    backgroundColor: 'red',
  },
  Picker: {
    height: 20,
    width: '99%',
  },
  PickerBody: {
    height: 20,
    width: '99%',
  },
  PickerBodyRow: {
    height: 20,
    width: '99%',
    top: 2,
  },
  ViewPicker: {
    borderRadius: 5,
    height: 35,
    borderWidth: 1,
    margin: 5,
  },
  ViewPickerSesion: {
    borderRadius: 5,
    height: 35,
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  ViewPickerBody: {
    borderRadius: 5,
    height: 35,
    margin: 5,
    width: '47%',
    borderWidth: 1,
  },
  ViewTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    height: 200,
    top: -35,
  },
  ViewBody: {
    flexDirection: 'row',
  },
  TextBody: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
  },
  TextDate: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
    marginLeft: '2%',
  },
  TextInput: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    height: '45%',
  },
  information: {
    justifyContent: 'center',
    width: '50%',
  },
  listDataLeaveType: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  IconDown: {
    bottom: 20,
    marginLeft: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
  },
  information: {
    justifyContent: 'center',
    width: '50%',
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
});
