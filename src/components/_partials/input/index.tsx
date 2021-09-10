import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';

import Theme from '../../../assets/theme';

export interface UiInputProps extends TextInputProps {
  disabled?: boolean;
  label?: string;
  onPress?: Function;
}

const UiInput = (props: UiInputProps) => {
  const {
    style,
    disabled = false,
    label,
    onFocus,
    onBlur,
    onPress,
    multiline,
  } = props;

  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const isPressable = typeof onPress === 'function';

  const _handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(true);
    typeof onFocus === 'function' && onFocus(e);
  };
  const _handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(false);
    typeof onBlur === 'function' && onBlur(e);
  };

  const Container: any = isPressable ? TouchableOpacity : View;

  return (
    <>
      <Container
        style={[styles.container, style]}
        onPress={isPressable ? onPress : undefined}>
        {!!label?.trim() && <Text style={[styles.label]}>{label?.trim()}</Text>}
        <TextInput
          {...props}
          editable={!disabled && !isPressable}
          style={[
            styles.input,
            multiline ? styles.textArea : undefined,
            isFocus ? styles.inputFocus : undefined,
          ]}
          placeholderTextColor={Theme.colors.grey}
          onFocus={_handleFocus}
          onBlur={_handleBlur}
          pointerEvents={isPressable ? 'none' : undefined}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderRadius: 100,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    paddingHorizontal: 15,
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
  },
  inputFocus: {
    borderColor: Theme.colors.primary,
  },
  textArea: {
    height: 100,
    borderRadius: 10,
  },
  label: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 14,
  },
});

export default UiInput;
