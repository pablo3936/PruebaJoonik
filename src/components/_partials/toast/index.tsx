import * as React from 'react';
import {StyleSheet, Text, Dimensions, ViewStyle, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Theme from '../../../assets/theme';

const toastWidth: number = Dimensions.get('window').width - 30;

type ToastStatus = 'default' | 'success' | 'error';

export interface showOptions {
  duration?: number;
  status?: ToastStatus;
}

export interface UiToastProps {
  style?: ViewStyle | ViewStyle[] | undefined[];
}

const UiToast = React.forwardRef(({style}: UiToastProps, ref: any) => {
  const insets = useSafeAreaInsets();

  const offsetAnimation = React.useRef(new Animated.Value(0)).current;

  const hiddenTop: number = -50;
  const showTop: number = insets.top + 10;

  const [message, setMessage] = React.useState<string>();
  const [messageStatus, setMessageStatus] =
    React.useState<ToastStatus>('default');
  const [messageDuration, setMessageDuration] = React.useState<number>(900);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [currentTimeout, setCurrentTimeOut] = React.useState<any>();

  const show = (
    value?: string,
    {duration, status}: showOptions | undefined = {
      duration: 900,
      status: 'default',
    },
  ) => {
    if (value?.trim() && value?.trim() !== message?.trim()) {
      setIsVisible(true);
      setMessage(value);
      clearTimeout(currentTimeout);
      if (status !== undefined) {
        setMessageStatus(status);
      } else {
        setMessageStatus('default');
      }
      if (duration !== undefined) {
        setMessageDuration(duration);
      } else {
        setMessageDuration(900);
      }
    }
  };

  React.useImperativeHandle(ref, () => ({
    show,
  }));

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(offsetAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && isVisible) {
          setCurrentTimeOut(
            setTimeout(() => {
              Animated.timing(offsetAnimation, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }).start(({finished: finish}) => {
                if (finish) {
                  setIsVisible(false);
                  setMessage(undefined);
                }
              });
            }, messageDuration),
          );
        }
      });
    }
  }, [isVisible, message, offsetAnimation, messageDuration]);

  const offset = offsetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [hiddenTop, showTop],
  });

  const displayMessage = (): string => {
    if (message?.trim()) {
      const textContainerWidth: number = toastWidth - 30;
      const textLetterSize: number = 14 / 2;
      if (message?.trim()?.length * textLetterSize > textContainerWidth) {
        return (
          `${message
            ?.trim()
            ?.substr(0, textContainerWidth / textLetterSize - 3)}`.trim() +
          '...'
        );
      }
      return message?.trim();
    }
    return '';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        messageStatus === 'success' ? styles?.success : undefined,
        messageStatus === 'error' ? styles?.error : undefined,
        style,
        {
          transform: [
            {
              translateY: offset,
            },
          ],
        },
      ]}>
      {!!message?.trim() && (
        <Text style={[styles.message]}>{displayMessage()?.trim()}</Text>
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.black,
    width: toastWidth,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 999,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  message: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.white,
    fontSize: 14,
    lineHeight: 40,
  },
  success: {
    backgroundColor: Theme.colors.success,
  },
  error: {
    backgroundColor: Theme.colors.error,
  },
});

export default UiToast;
