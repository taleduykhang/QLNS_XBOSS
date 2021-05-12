import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import GlobalContextProvider from './GlobalContextProvider';
import RootNavigation from './routes/root/RootNavigation';
import store from './redux/stores';
import {Provider} from 'react-redux';
export default class App extends React.Component {
  render() {
    return (
      <GlobalContextProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </Provider>
      </GlobalContextProvider>
    );
  }
}
