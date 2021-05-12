import React from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  IconBar,
  IconArrowLeft,
  IconBack,
  IconEdit,
  IconAttendance,
  IconSend,
  IconAdd,
  IconExit,
  IconSearch,
} from '../../resource/icons';
class ReactNativeAnimatedSearchbox extends React.Component {
  state = {
    width: 0,
    textInputAnimated: new Animated.Value(0),
    parentViewWidthAnimated: new Animated.Value(this.props.height),
    isScaled: false,
  };

  //Get parent width value
  onLayout = (e) => {
    const {width} = e.nativeEvent.layout;
    this.setState({width});
  };

  //Animation start - open effect
  open = () => {
    const {focusAfterOpened, animationSpeed, onOpened, onOpening} = this.props;
    onOpening && onOpening();

    Animated.timing(this.state.textInputAnimated, {
      toValue: 1,
      duration: animationSpeed[0],
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.setState({isScaled: true});

        Animated.timing(this.state.parentViewWidthAnimated, {
          toValue: this.state.width,
          duration: animationSpeed[1],
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          onOpened && onOpened();
          if (focusAfterOpened) this.refTextInput.focus();
        });
      }, 125);
    });
  };

  //Animation start - close effect
  close = () => {
    const {animationSpeed, onClosed, onClosing} = this.props;
    onClosing && onClosing();

    Animated.timing(this.state.parentViewWidthAnimated, {
      toValue: this.props.height,
      duration: animationSpeed[1],
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState({isScaled: false});

      setTimeout(() => {
        Animated.timing(this.state.textInputAnimated, {
          toValue: 0,
          duration: animationSpeed[1],
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          onClosed && onClosed();
        });
      }, 125);
    });
  };

  render() {
    const {
      height,
      borderRadius,
      fontSize,
      backgroundColor,
      placeholderTextColor,
      shadowColor,
      placeholder,
    } = this.props;

    return (
      <View onLayout={this.onLayout} styles={styles.container}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [
                {translateX: this.state.textInputAnimated},
                {translateY: this.state.textInputAnimated},
              ],
              opacity: this.state.textInputAnimated,
              scaleX: this.state.parentViewWidthAnimated,
            },
          ]}>
          <TextInput
            {...this.props}
            ref={(ref) => (this.refTextInput = ref)}
            placeholderTextColor={
              this.state.isScaled ? placeholderTextColor : 'transparent'
            }
            placeholder={placeholder}
            style={[
              styles.searchInput,
              {
                shadowColor: shadowColor,
                backgroundColor: backgroundColor,
                height: height,
                borderRadius: borderRadius,
                fontSize: fontSize,
                paddingLeft: height,
                width: 300,
              },
            ]}
          />
          {/* {this.state.isScaled ? (
            <View
              style={[styles.inputSearchIcon, {width: height, height: height}]}>
              {this.searchIcon()}
            </View>
          ) : null} */}
          {this.state.isScaled ? (
            <TouchableOpacity
              style={[styles.inputSearchIcon, {width: height, height: height}]}
              onPress={this.close}>
              <IconSearch size={18} color={'#1e90ff'} style={{paddingTop: 3}} />
            </TouchableOpacity>
          ) : null}
        </Animated.View>

        {this.state.isScaled ? null : (
          <TouchableOpacity
            onPress={this.open}
            style={[
              styles.inputClosedSearchIcon,
              {width: height, height: height},
            ]}>
            <IconSearch size={18} color={'#1e90ff'} style={{paddingTop: 3}} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingRight: 10,
  },
  animatedContainer: {
    marginLeft: 'auto',
  },
  searchInput: {
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  inputSearchIcon: {
    position: 'absolute',
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputClosedSearchIcon: {
    position: 'absolute',
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ReactNativeAnimatedSearchbox.defaultProps = {
  height: 35,
  borderRadius: 48,
  searchIconColor: '#555555',
  searchIconSize: 15,
  focusAfterOpened: false,
  placeholderTextColor: '#555555',
  fontSize: 13,
  backgroundColor: 'rgba(204, 204, 204,0.70)',
  shadowColor: 'rgba(0,0,0,0.12)',
  animationSpeed: [200, 250],
};

ReactNativeAnimatedSearchbox.propTypes = {
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  searchIconSize: PropTypes.number,
  searchIconColor: PropTypes.string,
  focusAfterOpened: PropTypes.bool,
  shadowColor: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  animationSpeed: PropTypes.array,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  onOpening: PropTypes.func,
  onClosing: PropTypes.func,
};

export default ReactNativeAnimatedSearchbox;
