import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActionSheetIOS,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ReusableBtn from '../components/ReusableBtn';
import ReusableHeader from '../components/ReusableHeader';
import ReusableInput from '../components/ReusableInput';
import WholeWrapper from '../components/WholeWrapper';
import FastImage from 'react-native-fast-image';
import ImageSelectWayModal from '../components/Modal/ImageSelectWayModal';
import ReusableModal from '../components/ReusableModal';
import {
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {COLORS} from '../theme/theme';
import PlusCircle from '../assets/icons/addCircle.svg';

type Props = {};

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
  selectionLimit: 1,
};

const ProfileEdit = (props: Props) => {
  const navigation = useNavigation();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [userName, setUserName] = React.useState<string>('CrucialSub');

  const [password, setPassword] = React.useState<string>('');
  const [checkPassword, setCheckPassword] = React.useState<string>('');

  const [nickName, setNickName] = React.useState<string>('김흥도');

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const [profileImage, setProfileImage] = React.useState<Asset>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {};

  const handleModalOpen = () => {
    if (Platform.OS === 'android') {
      setModalOpen(prev => !prev);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['사진 찍기', '사진 선택', '취소'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onLaunchCamera();
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary();
          }
        },
      );
    }
  };

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    let temp: Asset | undefined = profileImage ? profileImage : undefined;

    for (let i = 0; i < res.assets.length; i++) {
      temp =
        Platform.OS === 'android'
          ? res.assets[i].uri
          : res.assets[i].uri!.replace('file://', '');
    }

    setProfileImage(temp);
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption as CameraOptions, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
  };

  return (
    <WholeWrapper>
      <View>
        <ReusableHeader title="프로필 변경" handleBackBtn={handleGoBack} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                onPress={handleModalOpen}
                style={styles.imageBox}>
                <View>
                  <FastImage
                    source={{
                      uri: !profileImage
                        ? 'https://picsum.photos/200'
                        : profileImage,
                    }}
                    style={styles.imageStyle}
                  />
                  <PlusCircle
                    width={30}
                    height={30}
                    style={styles.plusCircleIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <ReusableInput
              category="아이디"
              placeholder=""
              setValue={setUserName}
              value={userName}
              isMultiline={false}
              disabled={true}
            />
            <ReusableInput
              category="닉네임"
              isMultiline={false}
              placeholder="닉네임을 입력해주세요"
              value={nickName}
              setValue={setNickName}
            />
            <ReusableInput
              category="비밀번호"
              isMultiline={false}
              placeholder="사용하실 비밀번호를 입력해주세요"
              value={password}
              setValue={setPassword}
            />
            <ReusableInput
              category="비밀번호 확인"
              isMultiline={false}
              placeholder="비밀번호 확인 (위와 동일하게)"
              value={checkPassword}
              setValue={setCheckPassword}
            />

            <ReusableInput
              category={'핸드폰 번호'}
              isMultiline={false}
              placeholder="핸드폰 번호를 입력해주세요"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
            <ReusableBtn
              isClickable={true}
              onClick={handleEditProfile}
              text="프로필 변경하기"
            />
          </View>
        </ScrollView>
        <ReusableModal
          animationType="fade"
          onClose={() => setModalOpen(prev => !prev)}
          visible={modalOpen}
          children={
            <ImageSelectWayModal
              onClose={() => setModalOpen(prev => !prev)}
              onLaunchCamera={() => {}}
              onLaunchImageLibrary={() => {}}
            />
          }
        />
      </View>
    </WholeWrapper>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageBox: {
    position: 'relative',
  },
  plusCircleIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: -5,
    right: -5,
    color: COLORS.Orange,
    zIndex: 1,
  },
});
