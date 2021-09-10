import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Theme from '../../../assets/theme';
import LoginPasswordHeader from '../../../components/screens/auth/login-password/header';
import UiButton from '../../../components/_partials/button';
import UiCheckbox from '../../../components/_partials/checkbox';
import UiInput from '../../../components/_partials/input';

import http from '../../../helpers/http';
import {showToast} from '../../../helpers/toast';
import {saveUser} from '../../../helpers/user';

const headerWidth: number = Dimensions.get('window').width;

export interface AuthLoginPasswordPageProps {
  navigation: any;
  route: any;
}

const AuthLoginPasswordPage = ({
  navigation,
  route,
}: AuthLoginPasswordPageProps) => {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = React.useState<boolean>(false);

  const [password, setPassword] = React.useState<string>();

  const email = route?.params?.email?.trim();
  const token = route?.params?.token;

  const _handlePressBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  const _handleNext = async () => {
    try {
      if (loading) {
        return;
      }
      if (!acceptTerms) {
        showToast('Debes aceptar los terminos y condiciones');
        return;
      }
      setLoading(true);
      const response = await http.post(
        '/login/password',
        {
          password: password?.trim()?.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await saveUser({
        name: response?.data?.name?.trim(),
        email,
        token: response?.data?.token,
      });
      navigation?.reset({
        index: 0,
        routes: [{name: 'HomePage'}],
      });
      setLoading(false);
    } catch (_error: any) {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
        contentContainerStyle={[
          styles.containerContent,
          {paddingBottom: insets?.bottom + 10},
        ]}>
        <LoginPasswordHeader
          style={[styles.header, {marginTop: 10 + insets?.top}]}
          onPressBack={_handlePressBack}
        />
        <Text style={[styles.email]}>{email?.trim()}</Text>
        <UiInput
          style={[styles.input]}
          value={password}
          disabled={!!loading}
          label="PASSWORD"
          secureTextEntry={true}
          onSubmitEditing={_handleNext}
          onChangeText={setPassword}
        />
        <UiCheckbox
          value={acceptTerms}
          style={[styles.checkbox]}
          disabled={!!loading}
          label="Aceptar terminos y condiciones"
          onValueChange={setAcceptTerms}
        />
        <UiButton disabled={!!loading} onPress={_handleNext}>
          {loading ? (
            <ActivityIndicator size="small" color={Theme.colors.white} />
          ) : (
            'SIGN IN'
          )}
        </UiButton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme?.colors?.white,
    paddingHorizontal: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    marginBottom: 42,
    width: '100%',
    textAlign: 'center',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginBottom: 19,
  },
  checkbox: {
    marginBottom: 60,
  },
  header: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    width: headerWidth,
  },
});

export default AuthLoginPasswordPage;
