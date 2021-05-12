import React from 'react';
const GlobalContext = React.createContext({});
export class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplash: true,
      isSignin: false,
      value: ' ',
      color: 'blue',
      visible: false,
      showPass: true,
      press: false,
      txtSearchAttendance: '',
      txtSearchAttendanceRequest: '',
      txtSearchEmployee: '',
      txtSearchLeave: '',
    };
  }

  setSplash = () => {
    this.setState({
      isSplash: !this.state.isSplash,
    });
  };

  setSignin = () => {
    this.setState({
      isSignin: !this.state.isSignin,
    });
  };

  setSearchAttendance = (text) => {
    this.setState({
      txtSearchAttendance: text,
    });
  };
  setSearchAttendanceRequest = (text) => {
    this.setState({
      txtSearchAttendanceRequest: text,
    });
  };
  setSearchEmployee = (text) => {
    this.setState({
      txtSearchEmployee: text,
    });
  };
  setSearchLeave = (text) => {
    this.setState({
      txtSearchLeave: text,
    });
  };
  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setSplash: this.setSplash,
          setSignin: this.setSignin,
          setSearchAttendance: this.setSearchAttendance,
          setSearchAttendanceRequest: this.setSearchAttendanceRequest,
          setSearchEmployee: this.setSearchEmployee,
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = (ChildComponent) => (props) => (
  <GlobalContext.Consumer>
    {(context) => <ChildComponent {...props} global={context} />}
  </GlobalContext.Consumer>
);
