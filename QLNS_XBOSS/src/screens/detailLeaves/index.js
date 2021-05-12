import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {DATA_STATUS, LINK, USER_PROFILE} from '../../utils/configs';
import {IconCalendar} from '../../resource/icons';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
class DetailLeaveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      employee_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.employee_id,
      holiday_status_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.holiday_status_id,
      name:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.name,
      holiday_type:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.holiday_type,
      duration_display:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.duration_display,
      date_from:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.date_from,
      date_to:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.date_to,
      department_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.department_id,
      user_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.user_id,
      manager_id:
        this.props.route.params == undefined
          ? 'error'
          : this.props.route.params.manager_id,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.viewHeaderLeft}>
                <Text style={styles.TextHeader}>{this.state.name}</Text>
                <View style={styles.information}>
                  <Text style={styles.TextTitle}> Employee: </Text>
                  <Text style={{paddingLeft: '7 %'}}>
                    {this.state.employee_id}
                  </Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.TextTitle}> Mode: </Text>
                  <Text style={{paddingLeft: '19%'}}>
                    By {this.state.holiday_type}
                  </Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.TextTitle}> Leave Type: </Text>
                  <Text style={styles.TextInfo}>
                    {this.state.holiday_status_id}
                  </Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.TextTitle}> Department: </Text>
                  <Text style={{paddingLeft: '1%'}}>
                    {this.state.department_id}
                  </Text>
                </View>
                <View style={styles.information}>
                  <Text style={styles.TextTitle}> Company: </Text>
                  <Text style={{paddingLeft: '9%'}}>
                    {USER_PROFILE.company}
                  </Text>
                </View>
              </View>
              <View style={styles.viewHeaderRight}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: LINK.urlImageUser + USER_PROFILE.id,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.viewBodyRight}>
            <View style={styles.height}>
              <Text style={styles.TextTitle}> Direct Manager: </Text>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <Image
                  style={styles.logo1}
                  source={{
                    uri: LINK.urlImage + this.state.manager_id[0],
                  }}
                />
                <Text style={{paddingTop: 5, paddingLeft: 5}}>
                  {this.state.manager_id[1]}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: '45%', paddingLeft: 3}}>
              <Text style={styles.TextTitle}> From: </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingLeft: 3,
                }}>
                <IconCalendar size={22} color="#1e90ff" />
                <Text style={{paddingTop: 5, paddingLeft: 5}}>
                  {moment(this.state.date_from).format('DD-MM-YYYY ')}
                </Text>
                <Text style={{paddingTop: 5, paddingLeft: 2}}>
                  {'01:00:00' == moment(this.state.date_from).format('HH:mm:ss')
                    ? 'Afternoon'
                    : 'Morning'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewBodyRight}>
            <View style={styles.height}>
              <Text style={styles.TextTitle}> Duration: </Text>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <Text style={{paddingTop: 5, paddingLeft: 5}}>
                  {this.state.duration_display}
                </Text>
                <CheckBox
                  size={15}
                  title="Half day"
                  checked={
                    this.state.duration_display == '0.5 day(s)'
                      ? !this.state.checked
                      : this.state.checked
                  }
                />
              </View>
            </View>
            <View style={{paddingTop: '45%', paddingLeft: 3}}>
              <Text style={styles.TextTitle}> To: </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingLeft: 3,
                }}>
                <IconCalendar size={22} color="#1e90ff" />
                <Text style={{paddingTop: 5, paddingLeft: 5}}>
                  {moment(this.state.date_to).format('DD-MM-YYYY ')}
                </Text>
                <Text style={{paddingTop: 5}}>
                  {'05:00:00' == moment(this.state.date_to).format('HH:mm:ss')
                    ? 'Afternoon'
                    : 'Morning'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default DetailLeaveScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  TextHeader: {
    color: '#1C75BC',
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  viewHeaderLeft: {
    width: '65%',
    height: '100%',
    padding: 10,
  },
  viewHeaderRight: {
    width: '35%',
    height: '100%',
    padding: 5,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 130,
    borderColor: '#1C75BC',
    borderWidth: 1,
    left: 35,
    top: 10,
  },
  information: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  TextTitle: {
    fontWeight: 'bold',
  },
  TextInfo: {
    paddingLeft: 5,
  },
  viewHeader: {
    flexDirection: 'row',
    height: '48%',
    borderBottomWidth: 1,
  },
  viewBody: {
    flexDirection: 'row',
    height: '20%',
    paddingTop: 5,
  },
  viewBodyRight: {
    width: '50%',
    height: '100%',
    paddingLeft: 10,
  },
  height: {
    height: '5%',
  },
  logo1: {
    width: 30,
    height: 30,
    borderRadius: 150,
  },
});
