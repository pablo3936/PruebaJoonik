import * as React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import LeftIcon from './img/left-chevron.svg';

export interface LoginPasswordHeaderProps {
  style?: ViewStyle | ViewStyle[] | undefined[];
  onPressBack?: Function;
}

const LoginPasswordHeader = ({
  style,
  onPressBack,
}: LoginPasswordHeaderProps) => {
  const _handlePressBack = () => {
    typeof onPressBack === 'function' && onPressBack();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={_handlePressBack}>
        <View style={[styles.icon]}>
          <LeftIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    left: -15,
  },
});

export default LoginPasswordHeader;
