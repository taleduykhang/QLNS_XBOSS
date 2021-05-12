import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {IconBar, IconBack, IconEdit, IconAdd} from '../../resource/icons';
import {IconSearch} from '../../resource/icons';
import {IconDelete} from '../../resource/icons';
import {searchList} from '../../redux/actions/attendanceAction'; //search attendance
import {searchListRequest} from '../../redux/actions/newAttendanceAction'; //search request attendance
import {searchListEmployee} from '../../redux/actions/employeeAction';
import {searchListLeave} from '../../redux/actions/leaveAction';
import {withGlobalContext} from '../../GlobalContextProvider';
import {attendance, connect} from 'react-redux';
import {IconCalendar} from '../../resource/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {width: WIDTH} = Dimensions.get('window');
import moment from 'moment';
class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      searchAttendance: true,
      searchRequest: true,
      searchEmployee: true,
      searchLeave: true,
      search: '', //search attendance
      searchRequests: '', //search list request
      searchEmployees: '', //search employee
      searchLeaves: '', //search leave
      isVisibleSearch: false,

      chosenDateSearch: '',
    };
  }
  showPickerSearch = () => {
    this.setState({
      isVisibleSearch: true,
    });
  };
  hidePickerSearch = () => {
    this.setState({
      isVisibleSearch: false,
    });
  };
  handlePickerSearch = (datetime) => {
    //search attendance
    this.setState({
      isVisibleSearch: false,
      search: moment(datetime).format('DD-MM-YYYY'),
    });
  };
  handlePickerSearchRequest = (datetime) => {
    //search list attendance request
    this.setState({
      isVisibleSearch: false,
      searchRequests: moment(datetime).format('DD-MM-YYYY'),
    });
  };
  handlePickerSearchLeave = (datetime) => {
    //search list attendance leave
    this.setState({
      isVisibleSearch: false,
      searchLeaves: moment(datetime).format('DD-MM-YYYY'),
    });
  };

  onOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  onPressModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  onGoNewAttendance = () => {
    this.props.navigation.navigate('DashboardStack', {
      screen: 'NewAttendance',
    });
  };
  onGoRequest = () => {
    this.props.navigation.navigate('RequestScreen');
  };
  onGoAddLeave = () => {
    this.props.navigation.navigate('DashboardStack', {
      screen: 'AddLeavesScreen',
      title: 'Request new Leaves',
    });
  };
  changeSearchAttendance = () => {
    return (
      (this.state.searchAttendance = !this.state.searchAttendance),
      this.props.navigation.navigate('AttendanceScreen', {
        param: {search: this.state.search},
      }),
      console.log('kiểm tra nội dung cần search tại header', this.state.search)
    );
  };
  closeChangeSearchAttendance = () => {
    return (
      this.searchAttendances(''),
      this.props.searchList(''),
      (this.state.searchAttendance = !this.state.searchAttendance),
      //this.openInputSearch(this.state.searchAttendance),
      this.props.navigation.navigate('AttendanceScreen'),
      {
        param: {search: this.state.search},
      }
    );
  };

  changeSearchListRequest = () => {
    return (
      ((this.state.searchRequest = !this.state.searchRequest),
      //this.openInputSearch(this.state.searchAttendance),
      this.props.navigation.navigate('ListNewAttendanceScreen', {
        param: {searchRequests: this.state.searchRequests},
      })),
      console.log(
        'kiểm tra nội dung cần search tại header',
        this.state.searchRequest,
      )
    );
  };
  closeChangeSearchListRequest = () => {
    return (
      this.searchListRequestAttendance(''),
      this.props.searchListRequest(''),
      ((this.state.searchRequest = !this.state.searchRequest),
      //this.openInputSearch(this.state.searchAttendance),
      this.props.navigation.navigate('ListNewAttendanceScreen'),
      {
        param: {searchRequests: this.state.search},
      })
    );
  };
  changeSearchEmployee = () => {
    return (
      (this.state.searchEmployee = !this.state.searchEmployee),
      this.props.navigation.navigate('EmployeeScreen', {
        param: {searchEmployees: this.state.searchEmployees},
      }),
      console.log(
        'kiểm tra nội dung cần search tại header',
        this.state.searchEmployees,
      )
    );
  };
  closeChangeSearchEmployee = () => {
    return (
      this.searchListEmployees(''),
      this.props.searchListEmployee(''),
      (this.state.searchEmployee = !this.state.searchEmployee),
      this.props.navigation.navigate('EmployeeScreen'),
      {
        param: {searchEmployees: this.state.searchEmployees},
      }
    );
  };

  changeSearchLeave = () => {
    return (
      (this.state.searchLeave = !this.state.searchLeave),
      this.props.navigation.navigate('LeavesScreen', {
        param: {searchLeaves: this.state.searchLeaves},
      }),
      console.log(
        'kiểm tra nội dung cần search tại header',
        this.state.searchLeaves,
      )
    );
  };
  closeChangeSearchLeave = () => {
    return (
      this.searchListLeaves(''),
      this.props.searchListLeave(''),
      (this.state.searchLeave = !this.state.searchLeave),
      this.props.navigation.navigate('LeavesScreen'),
      {
        param: {searchLeaves: this.state.searchLeaves},
      }
    );
  };
  searchAttendances = (text) => {
    this.setState({
      search: text,
    });
  };

  searchListRequestAttendance = (text) => {
    this.setState({
      searchRequests: text,
    });
  };
  searchListEmployees = (text) => {
    this.setState({
      searchEmployees: text,
    });
  };
  searchListLeaves = (text) => {
    this.setState({
      searchLeaves: text,
    });
  };
  onSearch = (text) => {
    this.props.searchList(text);
  };
  onSearchRequest = (text) => {
    this.props.searchListRequest(text);
  };
  onSearchEmployee = (text) => {
    this.props.searchListEmployee(text);
  };
  onSearchLeave = (text) => {
    this.props.searchListLeave(text);
  };
  openInputSearchAttendance = (name) => {
    switch (!name) {
      case false:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: -3}}>
              <Text style={{fontSize: 20, color: '#1e90ff'}}>
                My attendance
              </Text>
            </View>
            <View style={{left: 20}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.changeSearchAttendance}
                  style={{left: 150}}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case true:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} style={{top: 7}} color="#1e90ff" />
              </TouchableOpacity>
            </View>

            <View style={{left: WIDTH - 285}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputSearchAttendance}
                  placeholder="Search here (dd-mm-yyyy)"
                  placeholderTextColor={'#1e90ff'}
                  onChangeText={this.searchAttendances}
                  multiline={true}
                  value={this.state.search}
                />
                <View style={{position: 'absolute', right: -15, top: 7}}>
                  <TouchableOpacity onPress={this.showPickerSearch}>
                    <IconCalendar size={20} color="#1e90ff" />
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  cancelTextIOS={'Exit'}
                  confirmTextIOS={'OK'}
                  isVisible={this.state.isVisibleSearch}
                  onConfirm={this.handlePickerSearch}
                  onCancel={this.hidePickerSearch}
                  mode={'date'}
                  is24Hour={false}
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: -45, top: 7}}
                  onPress={() => this.onSearch(this.state.search)}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginLeft: 135, top: 7}}>
              <TouchableOpacity onPress={this.closeChangeSearchAttendance}>
                <IconDelete size={20} color="#8c8c8c" />
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        break;
    }
  };
  openInputSearchEmployee = (name) => {
    switch (!name) {
      case false:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10, top: 3}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 20, color: '#1e90ff'}}>Employees</Text>
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.changeSearchEmployee}
                  style={{left: 190, top: 3}}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case true:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} style={{top: 8.5}} color="#1e90ff" />
              </TouchableOpacity>
            </View>

            <View style={{left: WIDTH - 285}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputSearchAttendance}
                  placeholder={'Search name here .... '}
                  onChangeText={this.searchListEmployees}
                  placeholderTextColor={'#1e90ff'}
                  multiline={true}
                />
                <View>
                  <TouchableOpacity
                    style={{position: 'absolute', right: -45, top: 6}}
                    onPress={() =>
                      this.onSearchEmployee(this.state.searchEmployees)
                    }>
                    <IconSearch size={20} color="#1e90ff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{marginLeft: 135, top: 7}}>
              <TouchableOpacity onPress={this.closeChangeSearchEmployee}>
                <IconDelete size={20} color="#8c8c8c" />
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        break;
    }
  };
  openInputSearchListRequest = (name) => {
    switch (!name) {
      case false:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10, top: 3}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 20, color: '#1e90ff'}}>
                Attendance request
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.changeSearchListRequest}
                  style={{left: WIDTH - 270, top: 3}}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{left: WIDTH - 260, top: 3}}>
              <TouchableOpacity onPress={this.onGoNewAttendance}>
                <IconAdd size={20} color={'#1e90ff'} />
              </TouchableOpacity>
            </View>
          </View>
        );

      case true:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} style={{top: 8.5}} color="#1e90ff" />
              </TouchableOpacity>
            </View>

            <View style={{left: WIDTH - 285}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputSearchAttendanceRequest}
                  placeholder="Search here (dd-mm-yyyy)"
                  onChangeText={this.searchListRequestAttendance}
                  multiline={true}
                  value={this.state.searchRequests}
                />
                <View style={{position: 'absolute', right: -15, top: 5}}>
                  <TouchableOpacity onPress={this.showPickerSearch}>
                    <IconCalendar size={20} color="#1e90ff" style={{top: 3}} />
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  cancelTextIOS={'Exit'}
                  confirmTextIOS={'OK'}
                  isVisible={this.state.isVisibleSearch}
                  onConfirm={this.handlePickerSearchRequest}
                  onCancel={this.hidePickerSearch}
                  mode={'date'}
                  is24Hour={false}
                />

                <TouchableOpacity
                  style={{position: 'absolute', right: -45, top: 8}}
                  onPress={() =>
                    this.onSearchRequest(this.state.searchRequests)
                  }>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginLeft: 135, top: 8}}>
              <TouchableOpacity onPress={this.closeChangeSearchListRequest}>
                <IconDelete size={20} color="#8c8c8c" />
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        break;
    }
  };

  openInputSearchListLeave = (name) => {
    switch (!name) {
      case false:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10, top: 3}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 20, color: '#1e90ff'}}>Leaves</Text>
            </View>

            <View>
              <View style={{flexDirection: 'row', top: 4}}>
                <TouchableOpacity
                  onPress={this.changeSearchLeave}
                  style={{left: WIDTH - 165}}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{left: WIDTH - 155, top: 4}}>
              <TouchableOpacity onPress={this.onGoAddLeave}>
                <IconAdd size={20} color={'#1e90ff'} />
              </TouchableOpacity>
            </View>
          </View>
        );

      case true:
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onOpenDrawer}>
                <IconBar size={20} style={{top: 7}} color="#1e90ff" />
              </TouchableOpacity>
            </View>

            <View style={{left: WIDTH - 290}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputSearchAttendanceRequest}
                  placeholder="Search here"
                  onChangeText={this.searchListLeaves}
                  placeholderTextColor={'#1e90ff'}
                  multiline={true}
                  value={this.state.searchLeaves}
                />
                <View style={{position: 'absolute', right: -15, top: 7}}>
                  <TouchableOpacity onPress={this.showPickerSearch}>
                    <IconCalendar size={20} color="#1e90ff" />
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  cancelTextIOS={'Exit'}
                  confirmTextIOS={'OK'}
                  isVisible={this.state.isVisibleSearch}
                  onConfirm={this.handlePickerSearchLeave}
                  onCancel={this.hidePickerSearch}
                  mode={'date'}
                  is24Hour={false}
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: -45, top: 7}}
                  onPress={() => this.onSearchLeave(this.state.searchLeaves)}>
                  <IconSearch size={20} color="#1e90ff" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{marginLeft: 135, top: 8}}
                onPress={this.closeChangeSearchLeave}>
                <IconDelete size={20} color="#8c8c8c" />
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        break;
    }
  };
  renderHeaderButton = (name, params) => {
    switch (name) {
      case 'SettingScreen':
        return (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{paddingHorizontal: 10, top: 3}}
              onPress={this.onGoBack}>
              <IconBack size={20} color="#1e90ff" />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Settings</Text>
          </View>
        );
      case 'DetailLeaveScreen':
        return (
          <View style={{flexDirection: 'row', borderBottomWidth: 1}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onGoBack}>
                <IconBack size={20} style={{top: 10}} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 20,
                paddingVertical: 10,
                width: '100%',
                color: '#1e90ff',
              }}>
              Leave detail
            </Text>
          </View>
        );

      // case 'EmployeeDetail':
      //   return (
      //     <View style={styles.header}>
      //       <TouchableOpacity
      //         style={{paddingVertical: 10}}
      //         onPress={this.onGoBack}>
      //         <IconBack size={20} color="blue" />
      //       </TouchableOpacity>
      //       <Text
      //         style={{
      //           paddingHorizontal: 10,
      //           fontSize: 18,
      //           paddingVertical: 10,
      //         }}>
      //         Employee Detail
      //       </Text>
      //       <TouchableOpacity
      //         style={{paddingVertical: 10, paddingLeft: '50%'}}
      //         onPress={this.onPressModal}>
      //         <IconEdit size={20} color="blue" />
      //       </TouchableOpacity>
      //     </View>
      //   );
      case 'UpdateDetailEmployee':
        return (
          <View style={styles.header}>
            <TouchableOpacity
              style={{paddingVertical: 10}}
              onPress={this.onGoBack}>
              <IconBack size={20} color="#1e90ff" />
            </TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                paddingVertical: 10,
                color: '#1e90ff',
              }}>
              Update Detail Employee
            </Text>
          </View>
        );

      case 'EmployeeScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.openInputSearchEmployee(this.state.searchEmployee)}
          </View>
        );
      case 'AttendanceScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.openInputSearchAttendance(this.state.searchAttendance)}
          </View>
        );

      case 'ListNewAttendanceScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.openInputSearchListRequest(this.state.searchRequest)}
          </View>
        );
      case 'LeavesScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.openInputSearchListLeave(this.state.searchLeave)}
          </View>
        );
      case 'AddLeavesScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{paddingHorizontal: 10, top: 3}}
              onPress={this.onGoBack}>
              <IconBack size={20} color="#1e90ff" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: '#1e90ff'}}>
              Request new leave
            </Text>
          </View>
        );
      case 'NewAttendance':
        return (
          <View style={{flexDirection: 'row'}}>
            <View>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={this.onGoBack}>
                <IconBack size={20} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 20, marginTop: -2}}>
                Add new attendace request
              </Text>
            </View>
          </View>
        );
      case 'RequestScreen':
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={this.onGoBack}>
              <IconBack size={20} color="#1e90ff" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, marginTop: -4, color: '#1e90ff'}}>
              Detail attendance request
            </Text>
          </View>
        );

      default:
        return (
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={this.onOpenDrawer}>
            <IconBar size={20} color="#1e90ff" />
          </TouchableOpacity>
        );
    }
  };

  render() {
    const {route} = this.props.scene;
    const {name, params} = route;
    return (
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.viewHeader}>
          {this.renderHeaderButton(name, params)}
          <Text style={{fontSize: 18}}>
            {params == undefined ? '' : params.title}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.attendanceReducer.search, //search attendance
    searchRequests: state.listNewAttendanceReducer.searchRequests,
    searchEmployees: state.employeesReducer.searchEmployee,
    searchLeaves: state.leavesReducer.searchLeaves,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {
    searchList,
    searchListRequest,
    searchListEmployee,
    searchListLeave,
  })(Header),
);
const styles = StyleSheet.create({
  viewHeader: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    //borderBottomWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  inputSearchAttendance: {
    height: 38,
    //left: -20,
    //left:-20,
    left: -75,
    marginRight: -130,
    borderWidth: 1,
    borderRadius: 20,
    width: 290,
    justifyContent: 'center',
    paddingLeft: 20,
    color: '#1e90ff',
    borderColor: '#1e90ff',
  },
  inputSearchAttendanceRequest: {
    height: 38,
    left: -75,
    marginRight: -130,
    borderWidth: 1,
    borderRadius: 20,
    width: 290,
    justifyContent: 'center',
    borderColor: '#1e90ff',
    paddingLeft: 20,
    color: '#1e90ff',
  },
});
