import * as React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BottomIcon from './img/bottom-chevron.svg';

import Theme from '../../../../../assets/theme';

export interface HomeHeaderProps {
  name?: string;
  style?: ViewStyle | ViewStyle[] | undefined[];
  onPressLogout?: Function;
}

const HomeHeader = ({name, style, onPressLogout}: HomeHeaderProps) => {
  const insets = useSafeAreaInsets();

  const animation = React.useRef(new Animated.Value(0)).current;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const _handleLogout = () => {
    setIsOpen(false);
    typeof onPressLogout === 'function' && onPressLogout();
  };

  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [animation, isOpen]);

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const offset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [insets?.top + 10, insets?.top + 50],
  });

  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback onPress={_toggle}>
          <View style={[styles.icon]}>
            <Text style={[styles.text]}>
              {name?.trim() ? name?.trim() : 'User'}
            </Text>
            <Animated.View
              style={[
                {
                  transform: [{rotate: rotation}],
                },
              ]}>
              <BottomIcon />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [
              {
                translateY: offset,
              },
            ],
          },
        ]}>
        <Text
          onPress={_handleLogout}
          suppressHighlighting={true}
          style={[styles.modalText]}>
          Logout
        </Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: Theme?.colors?.white,
    position: 'relative',
    zIndex: 99,
  },
  icon: {
    height: 30,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
    left: -15,
    flexDirection: 'row',
  },
  text: {
    marginRight: 5,
    marginLeft: 15,
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 16,
    lineHeight: 19,
  },
  modal: {
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    position: 'absolute',
    zIndex: 98,
    left: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 110,
    top: 0,
    backgroundColor: Theme?.colors?.white,
  },
  modalText: {
    fontFamily: Theme.lightFontFamily,
    color: Theme.colors.black,
    fontSize: 14,
    lineHeight: 16,
  },
});

export default HomeHeader;
