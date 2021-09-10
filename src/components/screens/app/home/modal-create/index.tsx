import * as React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';

import Theme from '../../../../../assets/theme';

import UiButton from '../../../../_partials/button';
import UiInput from '../../../../_partials/input';

import http from '../../../../../helpers/http';
import {showToast} from '../../../../../helpers/toast';

import {
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera,
  Asset,
} from 'react-native-image-picker';

export interface ModalCreatePostProps {
  onCreate?: Function;
}

const ModalCreatePost = React.forwardRef(
  ({onCreate}: ModalCreatePostProps, ref) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [title, setTitle] = React.useState<string>();
    const [content, setContent] = React.useState<string>();
    const [image, setImage] = React.useState<Asset>();

    const _handleOpen = () => {
      setTitle(undefined);
      setContent(undefined);
      setImage(undefined);
      setIsVisible(true);
    };

    const _handleClose = () => {
      setIsVisible(false);
    };

    const _handleCancel = () => {
      _handleClose();
    };

    const validate = () => {
      if (!title?.trim()) {
        throw {errorMessage: 'The title field is required'};
      }
      if (!content?.trim()) {
        throw {errorMessage: 'The content field is required'};
      }
      if (!image) {
        throw {errorMessage: 'The image is required'};
      }
    };

    const _handleSave = async () => {
      try {
        if (loading) {
          return;
        }
        Keyboard?.dismiss();
        setLoading(true);
        validate();
        const payload = new FormData();
        payload.append('title', title);
        payload.append('content', content);
        payload.append('image', {
          uri: image?.uri,
          type: image?.type,
          name: image?.fileName ? image?.fileName : 'profileimage.png',
        });
        await http.post('/posts', payload, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        });
        setLoading(false);
        typeof onCreate === 'function' && onCreate();
        _handleClose();
      } catch (_error: any) {
        setLoading(false);
        if (_error?.errorMessage?.trim()) {
          showToast(_error?.errorMessage?.trim());
        }
      }
    };

    const _handleSetImage = (response: ImagePickerResponse) => {
      if (response?.didCancel) {
        showToast('Upload cancelled');
      } else if (response?.errorMessage) {
        showToast(response?.errorMessage);
      } else if (response?.errorCode) {
        showToast(response?.errorCode);
      } else {
        setImage(response?.assets ? response?.assets[0] : undefined);
      }
    };

    const _hanleChoose = () => {
      Alert.alert('Upload image', 'upload post image', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Take Photo',
          onPress: () =>
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.5,
                saveToPhotos: false,
                maxWidth: 150,
                maxHeight: 150,
              },
              _handleSetImage,
            ),
        },
        {
          text: 'Select from library',
          onPress: () =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.5,
                maxWidth: 150,
                maxHeight: 150,
              },
              _handleSetImage,
            ),
        },
      ]);
    };

    React.useImperativeHandle(ref, () => ({
      open: _handleOpen,
      close: _handleClose,
    }));

    return (
      <Modal animationType="fade" visible={isVisible} transparent={true}>
        <View style={[styles.container]}>
          <View style={[styles.modal]}>
            <Text style={[styles.title]}>Create Post</Text>
            <UiInput
              style={[styles.input]}
              label="Title"
              value={title}
              disabled={loading}
              onChangeText={setTitle}
            />
            <UiInput
              style={[styles.input]}
              label="Image"
              value={image?.fileName?.trim()}
              disabled={true}
              onPress={_hanleChoose}
            />
            <UiInput
              style={[styles.input]}
              label="Content"
              multiline={true}
              disabled={loading}
              value={content}
              onChangeText={setContent}
            />
            <UiButton
              style={[styles.btn]}
              outlined={false}
              disabled={loading}
              onPress={_handleSave}>
              {loading ? (
                <ActivityIndicator size="small" color={Theme.colors.white} />
              ) : (
                'CREATE POST'
              )}
            </UiButton>
            <UiButton
              style={[styles.btnCancel]}
              outlined={true}
              disabled={loading}
              onPress={_handleCancel}>
              CANCEL
            </UiButton>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modal: {
    backgroundColor: Theme.colors.white,
    width: '100%',
    maxWidth: 600,
    padding: 15,
    borderRadius: 8,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: Theme.regularFontFamily,
    color: Theme.colors.black,
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 30,
    marginTop: 15,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
  },
  btnCancel: {
    marginTop: 10,
  },
});

export default ModalCreatePost;
