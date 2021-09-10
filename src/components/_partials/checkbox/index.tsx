import * as React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Theme from '../../../assets/theme';

import {Props as AndroidProps} from '@react-native-community/checkbox/dist/CheckBox.android';
import {Props as IOSProps} from '@react-native-community/checkbox/dist/CheckBox.ios';
import {Props as WindowsProps} from '@react-native-community/checkbox/dist/CheckBox.windows';

type CheckBoxProps = AndroidProps & IOSProps & WindowsProps;

export interface UiCheckboxProps extends CheckBoxProps {
  label?: string;
  style?: ViewStyle | ViewStyle[] | undefined[];
}

const UiCheckbox = (props: UiCheckboxProps) => {
  const {style, label, value, onValueChange} = props;

  const _handleToggle = () => {
    typeof onValueChange === 'function' && onValueChange(!value);
  };

  return (
    <>
      <View style={[styles.container, style]}>
        <CheckBox
          tintColor={Theme.colors.grey}
          onTintColor={Theme.colors.primary}
          onCheckColor={Theme.colors.primary}
          boxType="square"
          {...props}
          style={[styles.checkbox]}
        />
        {!!label?.trim() && (
          <Text
            onPress={_handleToggle}
            suppressHighlighting={true}
            style={[styles.label]}>
            {label?.trim()}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});

export default UiCheckbox;
