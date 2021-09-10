import * as React from 'react';
import {StyleSheet, ViewStyle, View, Text, Image} from 'react-native';
import {Post} from '../../../../../assets/models';
import Theme from '../../../../../assets/theme';

export interface HomeListItemProps {
  item: Post;
  style?: ViewStyle | ViewStyle[] | undefined[];
}

const HomeListItem = ({item, style}: HomeListItemProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={[styles.image]}
        source={{
          uri: item?.image ? item?.image : 'https://via.placeholder.com/79',
        }}
      />
      <View style={[styles.informationArea]}>
        {!!item?.title?.trim() && (
          <Text style={[styles.title]}>{item?.title?.trim()}</Text>
        )}
        {!!item?.content?.trim() && (
          <Text style={[styles.content]}>{item?.content?.trim()}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    marginBottom: 15,
  },
  image: {
    width: 79,
    height: 76,
    backgroundColor: Theme.colors.grey,
    borderRadius: 16,
    marginRight: 10,
    resizeMode: 'cover',
  },
  informationArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  title: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 21,
    lineHeight: 25,
    marginBottom: 15,
  },
  content: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6,
  },
});

export default HomeListItem;
