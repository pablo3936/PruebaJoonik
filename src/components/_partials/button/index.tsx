import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  GestureResponderEvent,
} from 'react-native';

import Theme from '../../../assets/theme';

export interface UiButtonProps extends TouchableHighlightProps {
  children?: any;
  disabled?: boolean;
  outlined?: boolean;
}

const UiButton = (props: UiButtonProps) => {
  const {
    style,
    children,
    disabled = false,
    outlined = false,
    onPress,
    onPressIn,
    onPressOut,
  } = props;

  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  const _handlePress = (e: GestureResponderEvent) => {
    typeof onPress === 'function' && onPress(e);
  };

  const _handlePressIn = (e: GestureResponderEvent) => {
    setIsPressed(true);
    typeof onPressIn === 'function' && onPressIn(e);
  };

  const _handlePressOut = (e: GestureResponderEvent) => {
    setIsPressed(false);
    typeof onPressOut === 'function' && onPressOut(e);
  };

  return (
    <>
      <TouchableHighlight
        {...props}
        underlayColor={Theme.colors.primaryDark}
        style={[
          styles.container,
          outlined ? styles.countainerOutlined : undefined,
          style,
        ]}
        onPressIn={_handlePressIn}
        onPressOut={_handlePressOut}
        onPress={!disabled ? _handlePress : undefined}>
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              outlined ? styles.textOutlined : undefined,
              outlined && isPressed ? styles.textOutlinedPressed : undefined,
            ]}>
            {children}
          </Text>
        ) : React.isValidElement(children) ? (
          children
        ) : (
          <></>
        )}
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primary,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 200,
    justifyContent: 'center',
    borderRadius: 100,
    maxWidth: '100%',
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  countainerOutlined: {
    backgroundColor: 'transparent',
    borderColor: Theme.colors.primaryDark,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.white,
    fontSize: 16,
    lineHeight: 19,
  },
  textOutlined: {
    color: Theme.colors.primary,
  },
  textOutlinedPressed: {
    color: Theme.colors.white,
  },
});

export default UiButton;
