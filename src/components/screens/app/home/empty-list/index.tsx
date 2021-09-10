import * as React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../../../../assets/theme';
import UiButton from '../../../../_partials/button';

export interface HomeEmptyListProps {
  loading: boolean;
  style?: ViewStyle | ViewStyle[] | undefined[];
  onPressAdd?: Function;
}

const HomeEmptyList = ({
  loading = false,
  onPressAdd,
  style,
}: HomeEmptyListProps) => {
  const _handlePressAdd = () => {
    typeof onPressAdd === 'function' && onPressAdd();
  };

  return (
    <View style={[styles.container, style]}>
      {!!loading && (
        <ActivityIndicator size="large" color={Theme.colors.black} />
      )}
      {!loading && (
        <>
          <Text style={[styles.title]}>No publications available</Text>
          <UiButton onPress={_handlePressAdd}>ADD ONE</UiButton>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 30,
  },
});

export default HomeEmptyList;
