import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import moment from 'moment';
import {DATA_STATUS, LINK, USER_PROFILE} from '../../../utils/configs';
//import { TextInput } from 'react-native-gesture-handler';

class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      option: '',
      check: '',
      session: '',
      morning: 'Morning',
      afternoon: 'Afternoon',
      dateto: '',
    };
  }
  checkSession = () => {
    let sessionEnd = '';
    let dateto = '';
    if (
      //check date_to in api, some date_to null in api
      this.props.route.params.date_to == undefined ||
      this.props.route.params.date_to == null ||
      this.props.route.params.date_to == ''
    ) {
      dateto = 'Null';
    } else {
      (dateto = moment(this.props.route.params.date_to.slice(0, 10)).format(
        'DD-MM-YYYY',
      )),
        (sessionEnd = this.props.route.params.date_to.slice(11, 19));
    }

    let sessionStart = this.props.route.params.date_from.slice(11, 19);

    if (sessionStart == '17:00:00' && sessionEnd == '05:00:00') {
      this.state.check = 'am';
    }
    if (sessionStart == '05:00:00' && sessionEnd == '16:59:59') {
      this.state.check = 'pm';
    }

    switch (this.state.check) {
      case 'am':
        return (
          <View>
            <Text style={styles.viewTitle}>From: </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.viewInfo}>
                {this.props.route.params == undefined
                  ? 'error'
                  : moment(
                      this.props.route.params.date_from.slice(0, 10),
                    ).format('DD-MM-YYYY')}
              </Text>
              <Text style={styles.viewInfo}> Morning</Text>
            </View>
          </View>
        );

      case 'pm':
        return (
          <View>
            <Text style={styles.viewTitle}>From: </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.viewInfo}>
                {this.props.route.params == undefined
                  ? 'error'
                  : moment(
                      this.props.route.params.date_from.slice(0, 10),
                    ).format('DD-MM-YYYY')}
              </Text>
              <Text style={styles.viewInfo}> Afternoon</Text>
            </View>
          </View>
        );

      default:
        return (
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.viewTitle}>From: </Text>
              <Text style={styles.viewInfo}>
                {this.props.route.params == undefined
                  ? 'error'
                  : moment(
                      this.props.route.params.date_from.slice(0, 10),
                    ).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={{left: 100}}>
              <Text style={styles.viewTitle}>To: </Text>
              <Text style={styles.viewInfo}>
                {this.props.route.params == undefined ? 'error' : dateto}
              </Text>
            </View>
          </View>
        );
    }
  };

  render() {
    var start = this.props.route.params.date_from.slice(11, 19);
    if (
      //chech date_to, some date_to null
      this.props.route.params.date_to == undefined ||
      this.props.route.params.date_to == null ||
      this.props.route.params.date_to == ''
    ) {
      this.state.option = 'Null';
    } else {
      var end = this.props.route.params.date_to.slice(11, 19);
    }

    if (start == '17:00:00' && end == '16:59:59') {
      this.state.option = 'Days-long';
    }
    if (
      (start == '17:00:00' && end == '05:00:00') ||
      (start == '05:00:00' && end == '16:59:59')
    ) {
      this.state.option = 'Half-day';
    }
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.viewBody}>
          <View>
            <Text style={styles.TextHeader}>
              {this.props.route.params == undefined
                ? 'error'
                : this.props.route.params.name}
            </Text>
          </View>
          <View>
            <Text style={styles.viewTitle}>Employee: </Text>
            <Text style={styles.viewInfo}>
              {this.props.route.params == undefined
                ? 'error'
                : this.props.route.params.object_of_application}
            </Text>
          </View>
          <View>
            <Text style={styles.viewTitle}>Type: </Text>
            <Text style={styles.viewInfo}>
              {this.props.route.params == undefined
                ? 'error'
                : this.props.route.params.leave_status_id}
            </Text>
          </View>
          <View>
            <Text style={styles.viewTitle}>Mode: </Text>
            <Text style={styles.viewInfo}>Employee (Multi)</Text>
          </View>
          <View>
            <Text style={styles.viewTitle}>Option: </Text>
            <Text style={styles.viewInfo}>{this.state.option}</Text>
          </View>
          <View>{this.checkSession()}</View>
          <View>
            <Text style={styles.viewTitle}>Description: </Text>
            <View style={{borderWidth: 1, width: 335, height: 170}}>
              <Text style={styles.viewInfo}>
                {this.props.route.params == undefined
                  ? 'error'
                  : this.props.route.params.description}
              </Text>
            </View>
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
    );
  }
}
export default RequestScreen;
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    left: 10,
    top: 5,
    width: '95%',
  },
  viewTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
  },
  viewInfo: {
    marginTop: 1,
    marginBottom: 5,
    fontSize: 16,
    left: 15,
  },
  viewHeaderRight: {
    width: '35%',
    height: '100%',
    padding: 5,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 150,
    borderColor: '#1C75BC',
    borderWidth: 1,
    left: 10,
    top: 10,
    flexDirection: 'row',
  },
  TextHeader: {
    color: '#1C75BC',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 10,
  },
  Description: {
    borderRadius: 150,
  },
});
