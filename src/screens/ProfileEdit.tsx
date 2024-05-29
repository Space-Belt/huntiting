import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import ReusableInput from '../components/ReusableInput';
import {useNavigation} from '@react-navigation/native';
import ReusableBtn from '../components/ReusableBtn';

type Props = {};

const ProfileEdit = (props: Props) => {
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState<string>('CrucialSub');

  const [password, setPassword] = React.useState<string>('');
  const [checkPassword, setCheckPassword] = React.useState<string>('');

  const [nickName, setNickName] = React.useState<string>('김흥도');

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {};

  return (
    <WholeWrapper>
      <View>
        <ReusableHeader title="프로필 변경" handleBackBtn={handleGoBack} />
        <ScrollView>
          <View style={styles.container}>
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
});
