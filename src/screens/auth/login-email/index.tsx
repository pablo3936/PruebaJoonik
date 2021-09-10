import * as React from 'react';
import {StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Theme from '../../../assets/theme';
import UiButton from '../../../components/_partials/button';
import UiInput from '../../../components/_partials/input';

import http from '../../../helpers/http';
import {getUser, saveUser} from '../../../helpers/user';

export interface AuthLoginEmailPageProps {
  navigation: any;
}

const AuthLoginEmailPage = ({navigation}: AuthLoginEmailPageProps) => {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>();

  const _handleNext = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      await saveUser();
      const response = await http.post('/login/email', {
        email: email?.trim()?.toLowerCase(),
      });
      navigation?.navigate('LoginPassword', {
        token: response?.data?.result,
        email: email?.trim()?.toLowerCase(),
      });
      setLoading(false);
    } catch (_error: any) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const focus = navigation?.addListener('focus', async () => {
      try {
        const _user = await getUser();
        if (_user?.token) {
          navigation?.reset({
            index: 0,
            routes: [{name: 'HomePage'}],
          });
        }
      } catch (_error) {}
    });
    return focus;
  }, [navigation]);

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
          {paddingTop: insets?.top + 10, paddingBottom: insets?.bottom + 10},
        ]}>
        <UiInput
          style={[styles.input]}
          value={email}
          disabled={!!loading}
          label="EMAIL"
          keyboardType="email-address"
          onSubmitEditing={_handleNext}
          onChangeText={setEmail}
        />
        <UiButton disabled={!!loading} onPress={_handleNext}>
          {loading ? (
            <ActivityIndicator size="small" color={Theme.colors.white} />
          ) : (
            'NEXT'
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
  input: {
    marginBottom: 65,
  },
});

export default AuthLoginEmailPage;
