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
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import Popover from 'react-native-popover-view';
import DepartmentBusiness from '../../../business/DepartmentBusiness';
import {departmentList} from '../../../redux/actions/departmentAction';
import {connect} from 'react-redux';
import {IconDown} from '../../../resource/icons';
import {DATA_STATUS, LINK} from '../../../utils/configs';
class DashboardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopOver: false,
      department: 'Trưởng phòng',
    };
  }
  onPopover = (t) => {
    this.setState({
      visiblePopOver: !this.state.visiblePopOver,
      department: t,
    });
  };
  onChangeTextDepartment = (text) => {
    this.setState({
      department: text,
    });
  };
  componentDidMount = async () => {
    const departmentBusiness = new DepartmentBusiness();
    let departments = await departmentBusiness.getListDepartments(
      ['|', ['company_id', '=', 3], ['company_id', '=', false]],
      ['id', 'name'],
      0,
      0,
      '',
      LINK.urlImage,
      'search_read',
    );
    this.props.departmentList(departments);
  };
  ItemDepartment = ({item}) => (
    <View style={styles.information}>
      <TouchableOpacity
        onPress={() => this.onPopover(item.name)}
        style={styles.button1}>
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.title}>{item.id}</Text> */}
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={styles.container1}>
        <Popover
          style={styles.popover}
          isVisible={this.state.visiblePopOver}
          onPress={this.onPopover}
          from={
            <TouchableOpacity
              onPress={this.onPopover}
              style={{flexDirection: 'row'}}>
              <TextInput
                value={this.state.department}
                style={styles.input}
                onChangeText={this.onChangeTextDepartment}
                placeholderTextColor={'rgba(255,255,255,1)'}
                underlineColorAndroid="transparent"></TextInput>
              <IconDown
                size={25}
                color="#4169e1"
                style={{
                  paddingVertical: 5,
                  marginLeft: -25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
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
        </Popover>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    departmentData: state.departmentReducer.listDataDepartment,
  };
}
export default connect(mapStateToProps, {departmentList})(DashboardDetail);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'gray',
    height: '100%',
  },
  view: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  button: {
    width: '90%',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 60,
  },
  information: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 15,
  },
  picker: {
    height: 50,
    width: 100,
  },
  container1: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  popover: {},
  input: {
    width: 300,
    height: 35,
    borderRadius: 25,
    fontSize: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
  },
  button1: {
    width: '100%',
  },
});
