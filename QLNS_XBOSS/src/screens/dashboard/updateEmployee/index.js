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
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {IconBack, IconCalendar, IconDown} from '../../../resource/icons';
import EmployeeScreenBusiness from '../../../business/EmployeeScreenBusiness';
import {updateEmployee} from '../../../redux/actions/updateEmployeeAction';
import {departmentList} from '../../../redux/actions/departmentAction';
import {lvEmployeeList} from '../../../redux/actions/lvEmployeeAction';
import {positionList} from '../../../redux/actions/positionAction';
import {connect} from 'react-redux';
import {employeeList} from '../../../redux/actions/employeeAction';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment-timezone';
import {DATA_STATUS, LINK, USER_PROFILE, HOST} from '../../../utils/configs';
import Popover from 'react-native-popover-view';
import Modal, {ModalTitle, ModalContent} from 'react-native-modals';
import Spinner from 'react-native-loading-spinner-overlay';
class UpdateDetailEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      refreshList: false,
      visibleDate: false,
      visibleDateWork: false,
      visiblePopOver: false,
      visiblePopOverLevel: false,
      visiblePopOverPosition: false,
      visibleIdDepartment: false,
      visibleIdClassify: false,
      visibleIdPosition: false,
      bottomModalClassify: false,
      bottomModalDepartment: false,
      bottomModalPosition: false,
      fullname:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.name,
      number:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.number,
      email:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.email,
      classify:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.type,
      position:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.position,
      DateDisplay: moment(
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.birthday,
      ).format('DD-MM-YYYY'),
      id_department:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.id_department,
      department:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.department,
      id_type:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.id_type,
      id_position:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.id_position,
      datework: moment(
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.datework,
      ).format('DD-MM-YYYY'),
      DateBirthday:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.birthday,
      starDateWork:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.datework,
    };
    this.limit =
      this.props.route.params == undefined
        ? 'error'
        : this.props.route.params.limit;
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
  // componentDidMount = async () => {
  //   const departmentBusiness = new EmployeeScreenBusiness();
  //   let departments = await departmentBusiness.getListDepartments(
  //     [
  //       '|',
  //       ['company_id', '=', USER_PROFILE.id_company],
  //       ['company_id', '=', false],
  //     ],
  //     ['id', 'name'],
  //     0,
  //     0,
  //     '',
  //     HOST.URL + HOST.SERVICE_API.CALL_KW,
  //     'search_read',
  //   );
  //   this.props.departmentList(departments);

  //   const lvEmployeeBusiness = new EmployeeScreenBusiness();
  //   let lvEmployee = await lvEmployeeBusiness.getListLevelEmployee(
  //     [['job_ids', '=', 50]],
  //     ['name'],
  //     0,
  //     0,
  //     '',
  //     HOST.URL + HOST.SERVICE_API.CALL_KW,
  //     'search_read',
  //   );
  //   this.props.lvEmployeeList(lvEmployee);
  // };
  //Gọi api của Department
  onModalDepartmentAPI = async (t, e) => {
    this.setState({
      //visiblePopOver: !this.state.visiblePopOver,
      bottomModalDepartment: !this.state.bottomModalDepartment,
      department: t,
      id_department: e,
      position: '',
      id_position: '',
    });
    const departmentBusiness = new EmployeeScreenBusiness();
    let departments = await departmentBusiness.getListDepartments(
      [
        '|',
        ['company_id', '=', USER_PROFILE.id_company],
        ['company_id', '=', false],
      ],
      ['id', 'name'],
      0,
      0,
      '',
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.departmentList(departments);
  };

  // Gọi api của Classify
  onModalLevelAPI = async (t, e) => {
    this.setState({
      classify: t,
      id_type: e,
      //visiblePopOverLevel: !this.state.visiblePopOverLevel,
      bottomModalClassify: !this.state.bottomModalClassify,
    });
    const lvEmployeeBusiness = new EmployeeScreenBusiness();
    let lvEmployee = await lvEmployeeBusiness.getListLevelEmployee(
      [['job_ids', '=', 50]],
      ['name'],
      0,
      0,
      '',
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.lvEmployeeList(lvEmployee);
  };

  // Gọi api của Position
  onModalPositionAPI = async (t, e) => {
    this.setState({
      //visiblePopOverPosition: !this.state.visiblePopOverPosition,
      bottomModalPosition: !this.state.bottomModalPosition,
      position: t,
      id_position: e,
    });
    const positionBusiness = new EmployeeScreenBusiness();
    let position = await positionBusiness.getListPosition(
      [
        '&',
        ['department_id', '=?', this.state.id_department],
        '|',
        ['company_id', '=', USER_PROFILE.id_company],
        ['company_id', '=', false],
      ],
      ['name'],
      0,
      0,
      '',
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.positionList(position);
  };

  // Gọi api của Employee để load lại danh sách
  onLoad = async () => {
    const employeeScreenBusiness = new EmployeeScreenBusiness();
    let employees = await employeeScreenBusiness.getListEmployee(
      [],
      this.fieldsEmployee,
      0,
      this.limit,
      '',
      HOST.URL + HOST.SERVICE_API.CALL_KW,
      'search_read',
    );
    this.props.employeeList(employees);
    this.state.listData = this.props.listData;
    this.setState({refreshList: true});
    this.props.navigation.navigate('DashboardStack', {
      screen: 'EmployeeScreen',
      params: {
        idColor:
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.ima,
      },
    });
  };

  // Update detail employee
  onUpdate = async () => {
    this.setState({
      n: this.state.fullname.trim(),
      b: this.state.number,
      e: this.state.email.trim(),
      p: this.state.position.trim(),
    });
    if (
      (this.state.n == '' || this.state.n == null) &&
      (this.state.e == '' || this.state.e == null) &&
      (this.state.p == '' || this.state.p == null) &&
      (this.state.b == '' || this.state.b == null)
    ) {
      alert('Cannot to blank information');
    } else if (isNaN(this.state.b)) {
      alert('Check again number phone');
    } else {
      const employeeScreenBusiness = new EmployeeScreenBusiness();
      let updateEmployees = await employeeScreenBusiness.getUpdateEmployee(
        [
          this.props.route.params == undefined
            ? 'error'
            : this.props.route.params.ima,
        ],
        {
          name: this.state.fullname,
          mobile_phone: this.state.number,
          work_email: this.state.email,
          level_id: this.state.id_type,
          department_id: this.state.id_department,
          birthday: this.state.DateBirthday,
          job_id: this.state.id_position,
          start_working_date: this.state.starDateWork,
        },
        HOST.URL + HOST.SERVICE_API.CALL_KW,
        'write',
      );
      console.log('Check employee details after update', updateEmployees);
      this.props.updateEmployee(updateEmployees);
      if (updateEmployees.status == DATA_STATUS.SUCCESS) {
        Alert.alert(
          'Notification',
          'Update successful',
          [{text: 'OK', onPress: this.onLoad}],
          {cancelable: false},
        );
      } else {
        Alert.alert('Update failed');
      }
    }
  };

  // Xét trạng thái của Birthday theo Day Month Year
  handleConfirm = (date) => {
    this.setState({
      DateDisplay: moment(date).format('DD-MM-YYYY'),
      DateBirthday: moment(date).format('YYYY-MM-DD'),
    });
  };

  // Xét trạng thái của Date work theo Day Month Year
  handleConfirmDateWork = (date) => {
    this.setState({
      datework: moment(date).format('DD-MM-YYYY'),
      starDateWork: moment(date).format('YYYY-MM-DD'),
    });
  };

  // Xét trạng thái của Birthday
  onPressButton = () => {
    this.setState({
      visibleDate: !this.state.visibleDate,
    });
  };

  // Xét trạng thái của Date work
  onPressButtonDatework = () => {
    this.setState({
      visibleDateWork: !this.state.visibleDateWork,
    });
  };

  // Quay lại màn hình trước
  onGoBack = () => {
    this.props.navigation.goBack();
  };

  onChangeTextName = (text) => {
    this.setState({
      fullname: text,
    });
  };

  onChangeTextMobile = (text) => {
    this.setState({
      number: text,
    });
  };
  onChangeTextEmail = (text) => {
    this.setState({
      email: text,
    });
  };

  // Mở modal của Position
  onModalPosition = async (t, e) => {
    this.setState({
      //visiblePopOverPosition: !this.state.visiblePopOverPosition,
      bottomModalPosition: !this.state.bottomModalPosition,
    });
  };

  // Mở modal của Classify
  onModalLevel = async (t, e) => {
    this.setState({
      // visiblePopOverLevel: !this.state.visiblePopOverLevel,
      bottomModalClassify: !this.state.bottomModalClassify,
    });
  };

  // Mở modal của department
  onModalDepartment = async (t, e) => {
    this.setState({
      //visiblePopOver: !this.state.visiblePopOver,
      bottomModalDepartment: !this.state.bottomModalDepartment,
    });
  };

  // Danh sách Classify
  ItemLvEmployee = ({item}) => (
    <View style={styles.listDataDepartment}>
      <TouchableOpacity
        onPress={() => this.onModalLevelAPI(item.name, item.id)}
        style={styles.button1}>
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );

  // Danh sách Department
  ItemDepartment = ({item}) => (
    <View style={styles.listDataDepartment}>
      <TouchableOpacity
        onPress={() => this.onModalDepartmentAPI(item.name, item.id)}
        style={styles.button1}>
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );

  // Danh sách Position
  ItemPosition = ({item}) => (
    <View style={styles.listDataDepartment}>
      <TouchableOpacity
        onPress={() => this.onModalPositionAPI(item.name, item.id)}
        style={styles.button1}>
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );

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
    return (
      <View style={styles.container}>
        <View style={styles.ModelDetailEmployee}>
          <ScrollView style={styles.ScrollView}>
            <View style={styles.viewBodyModal}>
              <View style={styles.paddingLeft}>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Full name</Text>
                  <TextInput
                    value={this.state.fullname}
                    onChangeText={this.onChangeTextName}
                    placeholderTextColor={'rgba(0,0,0,1)'}
                    underlineColorAndroid="transparent"
                    style={styles.input}
                  />
                </View>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Level</Text>
                  <TouchableOpacity
                    onPress={this.onModalLevelAPI}
                    style={styles.viewColum1}>
                    <Text
                      value={this.state.id_type}
                      visible={this.visibleIdClassify}></Text>
                    <TextInput
                      value={this.state.classify}
                      style={styles.input}
                      placeholderTextColor={'rgba(0,0,0,1)'}
                      underlineColorAndroid="transparent"
                      caretHidden={true}
                      showSoftInputOnFocus={false}
                    />

                    <IconDown
                      size={25}
                      color="#555555"
                      style={styles.IconDown}
                    />
                  </TouchableOpacity>
                  {/* <Popover
                    style={styles.popover}
                    isVisible={this.state.visiblePopOverLevel}
                    onPress={this.onModalLevelAPI}
                    onRequestClose={() =>
                      this.setState({
                        visiblePopOverLevel: false,
                        classify:
                          this.props.route.params == undefined
                            ? 'error'
                            : this.props.route.params.type,
                      })
                    }
                    placement={'bottom'}
                    from={
                      <TouchableOpacity
                        onPress={this.onModalLevelAPI}
                        style={styles.viewColum1}>
                        <Text
                          value={this.state.id_type}
                          visible={this.visibleIdClassify}></Text>
                        <TextInput
                          value={this.state.classify}
                          style={styles.input}
                          placeholderTextColor={'rgba(0,0,0,1)'}
                          underlineColorAndroid="transparent"
                          caretHidden={true}
                          showSoftInputOnFocus={false}
                        />

                        <IconDown
                          size={25}
                          color="#555555"
                          style={styles.IconDown}
                        />
                      </TouchableOpacity>
                    }>
                    <View>
                      <FlatList
                        data={this.props.lvEmployeeData}
                        renderItem={this.ItemLvEmployee}
                        extraData={(item) => item.id}
                      />
                    </View>
                  </Popover> */}
                </View>
                <Modal.BottomModal
                  visible={this.state.bottomModalClassify}
                  onTouchOutside={() =>
                    this.setState({
                      bottomModalClassify: false,
                      classify:
                        this.props.route.params == undefined
                          ? 'error'
                          : this.props.route.params.type,
                    })
                  }
                  height={0.5}
                  width={1}
                  //onSwipeOut={this.onModalLevel}
                  modalTitle={
                    // <ModalTitle
                    //   title="Level"
                    //   hasTitleBar
                    //   style={{
                    //     fontWeight: 'bold',
                    //     backgroundColor: '#1C75BC',
                    //   }}
                    // />
                    <View
                      style={{
                        borderBottomWidth: 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          //color: '#1C75BC',
                          paddingVertical: 10,
                        }}>
                        Level
                      </Text>
                    </View>
                  }>
                  <ModalContent
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                    }}>
                    <View>
                      <FlatList
                        data={this.props.lvEmployeeData}
                        renderItem={this.ItemLvEmployee}
                        extraData={(item) => item.id}
                        ListEmptyComponent={this.ListEmptyComponent}
                      />
                    </View>
                  </ModalContent>
                </Modal.BottomModal>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Mobile</Text>
                  <TextInput
                    value={this.state.number}
                    style={styles.input}
                    onChangeText={this.onChangeTextMobile}
                    placeholderTextColor={'rgba(0,0,0,1)'}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Email</Text>
                  <TextInput
                    value={this.state.email}
                    style={styles.input}
                    onChangeText={this.onChangeTextEmail}
                    placeholderTextColor={'rgba(0,0,0,1)'}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Department</Text>
                  <TouchableOpacity
                    onPress={this.onModalDepartmentAPI}
                    style={styles.viewColum1}>
                    <Text
                      value={this.state.id_department}
                      visible={this.visibleIdDepartment}></Text>
                    <TextInput
                      value={this.state.department}
                      style={styles.input}
                      placeholderTextColor={'rgba(255,255,255,1)'}
                      caretHidden={true}
                      showSoftInputOnFocus={false}
                      underlineColorAndroid="transparent"></TextInput>
                    <IconDown
                      size={25}
                      color="#555555"
                      style={styles.IconDown}
                    />
                  </TouchableOpacity>
                  {/* <Popover
                    style={styles.popover}
                    isVisible={this.state.visiblePopOver}
                    onPress={this.onModalDepartmentAPI}
                    onRequestClose={() =>
                      this.setState({
                        visiblePopOver: false,
                        department:
                          this.props.route.params == undefined
                            ? 'error'
                            : this.props.route.params.department,
                      })
                    }
                    placement={'bottom'}
                    from={
                      <TouchableOpacity
                        onPress={this.onModalDepartmentAPI}
                        style={styles.viewColum1}>
                        <Text
                          value={this.state.id_department}
                          visible={this.visibleIdDepartment}></Text>
                        <TextInput
                          value={this.state.department}
                          style={styles.input}
                          placeholderTextColor={'rgba(255,255,255,1)'}
                          caretHidden={true}
                          showSoftInputOnFocus={false}
                          underlineColorAndroid="transparent"></TextInput>
                        <IconDown
                          size={25}
                          color="#555555"
                          style={styles.IconDown}
                        />
                      </TouchableOpacity>
                    }>
                    <View>
                      <FlatList
                        data={this.props.departmentData}
                        renderItem={this.ItemDepartment}
                        extraData={(item) => item.id}
                      />
                    </View>
                  </Popover> */}
                </View>
                <Modal.BottomModal
                  visible={this.state.bottomModalDepartment}
                  onTouchOutside={() =>
                    this.setState({
                      bottomModalDepartment: false,
                      department:
                        this.props.route.params == undefined
                          ? 'error'
                          : this.props.route.params.department,
                      id_department:
                        this.props.route.params == undefined
                          ? 'error'
                          : this.props.route.params.id_department,
                    })
                  }
                  height={0.5}
                  width={1}
                  //onSwipeOut={this.onModal}
                  modalTitle={
                    // <ModalTitle title="Department" hasTitleBar />
                    <View
                      style={{
                        borderBottomWidth: 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          //color: '#1C75BC',
                          paddingVertical: 10,
                        }}>
                        Department
                      </Text>
                    </View>
                  }>
                  <ModalContent
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                    }}>
                    <View>
                      <FlatList
                        data={this.props.departmentData}
                        renderItem={this.ItemDepartment}
                        extraData={(item) => item.id}
                        ListEmptyComponent={this.ListEmptyComponent}
                      />
                    </View>
                  </ModalContent>
                </Modal.BottomModal>
                <View style={styles.viewColum}>
                  <Text style={styles.textInfo1}>Position</Text>
                  <TouchableOpacity
                    onPress={this.onModalPositionAPI}
                    style={styles.viewColum1}>
                    <Text
                      value={this.state.id_position}
                      visible={this.visibleIdPosition}></Text>
                    <TextInput
                      value={this.state.position}
                      style={styles.input}
                      caretHidden={true}
                      showSoftInputOnFocus={false}
                    />
                    <IconDown
                      size={25}
                      color="#555555"
                      style={styles.IconDown}
                    />
                  </TouchableOpacity>
                  {/* <Popover
                    style={styles.popover}
                    isVisible={this.state.visiblePopOverPosition}
                    onPress={this.onModalPositionAPI}
                    onRequestClose={() =>
                      this.setState({
                        visiblePopOverPosition: false,
                        position:
                          this.props.route.params == undefined
                            ? 'error'
                            : this.props.route.params.position,
                      })
                    }
                    placement={'bottom'}
                    from={
                      <TouchableOpacity
                        onPress={this.onModalPositionAPI}
                        style={styles.viewColum1}>
                        <Text
                          value={this.state.id_position}
                          visible={this.visibleIdPosition}></Text>
                        <TextInput
                          value={this.state.position}
                          style={styles.input}
                          caretHidden={true}
                          showSoftInputOnFocus={false}
                        />
                        <IconDown
                          size={25}
                          color="#555555"
                          style={styles.IconDown}
                        />
                      </TouchableOpacity>
                    }>
                    <View>
                      <FlatList
                        data={this.props.positionData}
                        renderItem={this.ItemPosition}
                        extraData={(item) => item.id}
                      />
                    </View>
                  </Popover> */}
                </View>
                <Modal.BottomModal
                  visible={this.state.bottomModalPosition}
                  onTouchOutside={() =>
                    this.setState({
                      bottomModalPosition: false,
                      position:
                        this.props.route.params == undefined
                          ? 'error'
                          : this.props.route.params.position,
                    })
                  }
                  height={0.5}
                  width={1}
                  //onSwipeOut={this.onModal}
                  modalTitle={
                    //<ModalTitle title="Department" hasTitleBar />
                    <View
                      style={{
                        borderBottomWidth: 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          //color: '#1C75BC',
                          paddingVertical: 10,
                        }}>
                        Position
                      </Text>
                    </View>
                  }>
                  <ModalContent
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                    }}>
                    <View>
                      <FlatList
                        data={this.props.positionData}
                        renderItem={this.ItemPosition}
                        extraData={(item) => item.id}
                        ListEmptyComponent={this.ListEmptyComponent}
                      />
                    </View>
                  </ModalContent>
                </Modal.BottomModal>
                <View style={styles.viewColum2}>
                  <View>
                    <Text style={styles.textInfo1}>Birthday</Text>

                    <View style={styles.viewColum1}>
                      <Text
                        value={this.state.DateBirthday}
                        visible={this.visibleIdPosition}></Text>
                      <TextInput
                        value={this.state.DateDisplay}
                        style={styles.input1}
                        placeholderTextColor={'rgba(0,0,0,1)'}
                        underlineColorAndroid="transparent"
                        caretHidden={true}
                        showSoftInputOnFocus={false}
                      />
                      <TouchableOpacity
                        onPress={this.onPressButton}
                        style={styles.IconCalendar}>
                        <IconCalendar size={20} color="#555555" />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={this.state.visibleDate}
                        onConfirm={this.handleConfirm}
                        onCancel={
                          (this.visibleDate = false)
                        }></DateTimePickerModal>
                    </View>
                  </View>
                  <View style={{paddingLeft: 10}}>
                    <Text style={styles.textInfo1}>Date work</Text>
                    <View style={styles.viewColum1}>
                      <TextInput
                        value={this.state.datework}
                        style={styles.input1}
                        placeholderTextColor={'rgba(0,0,0,1)'}
                        underlineColorAndroid="transparent"
                        caretHidden={true}
                        showSoftInputOnFocus={false}
                      />

                      <TouchableOpacity
                        onPress={this.onPressButtonDatework}
                        style={styles.IconCalendar}>
                        <IconCalendar size={20} color="#555555" />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={this.state.visibleDateWork}
                        onConfirm={this.handleConfirmDateWork}
                        onCancel={
                          this.state.visibleDateWork
                        }></DateTimePickerModal>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.viewUpdates}>
            <TouchableOpacity
              style={styles.buttonUpdate}
              placeholderTextColor={'rgba(0,0,0,1)'}
              underlineColorAndroid="transparent"
              onPress={this.onUpdate}>
              <Text style={styles.textUpdate1}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    updateData: state.employeesReducer.update_Employee,
    departmentData: state.employeesReducer.listDataDepartment,
    lvEmployeeData: state.employeesReducer.listDataLV,
    positionData: state.employeesReducer.listDataPosition,
    listData: state.employeesReducer.listDataEmployee,
  };
}
//export default connect(mapStateToProps, {updateEmployee})(EmployeeDetail);
export default connect(mapStateToProps, {
  updateEmployee,
  departmentList,
  lvEmployeeList,
  positionList,
  employeeList,
})(UpdateDetailEmployee);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  button1: {
    width: '100%',
  },
  title: {
    paddingLeft: 5,
  },
  ModelBackground: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModelDetailEmployee: {
    backgroundColor: 'white',

    height: '100%',
  },
  textInfo1: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    width: 335,
    height: 40,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    borderColor: '#333333',
  },
  text: {
    width: 335,
    height: 40,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
    paddingVertical: 9,
  },
  viewHeaderModal: {
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '10%',
    // borderRadiusTop: 20,
  },
  textUpdate: {
    paddingLeft: '20%',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4169e1',
  },
  viewBodyModal: {
    // borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    width: '100%',
  },
  paddingLeft: {
    width: '100%',
  },
  buttonUpdate: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#4169e1',
    width: '100%',
    height: '100%',
  },
  textUpdate1: {
    color: 'white',
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  ScrollView: {
    //backgroundColor: 'red',
  },
  listDataDepartment: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    width: '100%',
  },
  IconCalendar: {
    marginLeft: -25,
    paddingVertical: 10,
  },
  IconDown: {
    paddingVertical: 10,
    marginLeft: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewColum: {
    //flexDirection: 'row',
    // paddingVertical: 5,
    justifyContent: 'space-between',
    //backgroundColor: 'brown',
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewColum1: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  viewUpdates: {
    //backgroundColor: 'red',
    height: '10%',
  },
  viewColum2: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  input1: {
    width: 160,
    height: 40,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
  },
  popover: {
    height: '50%',
    width: '50%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
