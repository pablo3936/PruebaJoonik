import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Post, User} from '../../../assets/models';

import Theme from '../../../assets/theme';
import HomeEmptyList from '../../../components/screens/app/home/empty-list';
import HomeHeader from '../../../components/screens/app/home/header';
import HomeListItem from '../../../components/screens/app/home/list-item';
import ModalCreatePost from '../../../components/screens/app/home/modal-create';
import UiButton from '../../../components/_partials/button';

import {getUser, saveUser} from '../../../helpers/user';
import {getPosts} from '../../../services/posts.service';

const headerWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('screen').height;

export interface AppHomePageProps {
  navigation: any;
}

const AppHomePage = ({navigation}: AppHomePageProps) => {
  const insets = useSafeAreaInsets();

  const addPostRef = React.useRef<any>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const [user, setUser] = React.useState<User | null>();
  const [posts, setPosts] = React.useState<Post[]>([]);

  const _handleLogout = async () => {
    await saveUser();
    navigation?.reset({
      index: 0,
      routes: [{name: 'LoginEmail'}],
    });
  };

  const _loadData = React.useCallback(async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const _posts = await getPosts();
      setPosts(_posts);
      setLoading(false);
    } catch (_error) {
      setPosts([]);
      setLoading(false);
    }
  }, [loading]);

  const _handleAdd = () => {
    addPostRef?.current?.open();
  };

  const _handleRefresh = async () => {
    if (refreshing || loading) {
      return;
    }
    setRefreshing(true);
    await _loadData();
    setRefreshing(false);
  };

  React.useEffect(() => {
    const focus = navigation?.addListener('focus', async () => {
      const _user = await getUser();
      setUser(_user);
      _loadData();
    });
    return focus;
  }, [_loadData, navigation]);

  return (
    <>
      <HomeHeader
        style={[styles.header, {marginTop: 10 + insets?.top}]}
        name={user?.name?.trim()}
        onPressLogout={_handleLogout}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            tintColor={Theme.colors.black}
          />
        }
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
        contentContainerStyle={[
          styles.containerContent,
          {minHeight: screenHeight - 50 - insets?.top},
        ]}
        data={posts}
        keyExtractor={(_item, index) => `item-${index}`}
        renderItem={({item}) => <HomeListItem item={item} />}
        ListEmptyComponent={
          <>
            <HomeEmptyList
              loading={loading && !refreshing}
              onPressAdd={_handleAdd}
            />
          </>
        }
      />
      {!!posts?.length && (
        <View style={[styles.footer]}>
          <UiButton
            disabled={!!(loading || refreshing)}
            style={[styles.btn, {marginBottom: insets?.bottom + 10}]}
            onPress={_handleAdd}>
            {loading ? (
              <ActivityIndicator size="small" color={Theme.colors.white} />
            ) : (
              'ADD NEW'
            )}
          </UiButton>
        </View>
      )}
      <ModalCreatePost ref={addPostRef} onCreate={_handleRefresh} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 8,
  },
  containerContent: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: Theme?.colors?.white,
    paddingHorizontal: 31,
    justifyContent: 'flex-start',
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
    width: headerWidth,
  },
  footer: {
    width: headerWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 15,
  },
});

export default AppHomePage;
