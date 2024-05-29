import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import {COLORS} from '../theme/theme';
import ReusableHeader from '../components/ReusableHeader';
import ReusableInput from '../components/ReusableInput';
import ReusableBtn from '../components/ReusableBtn';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const SignUpScreen = (props: Props) => {
  const navigation = useNavigation();

  const [userName, setUserName] = React.useState<string>('');

  const [password, setPassword] = React.useState<string>('');
  const [checkPassword, setCheckPassword] = React.useState<string>('');

  const [nickName, setNickName] = React.useState<string>('');

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const handleSignUp = () => {
    let isValidate = true;

    if (userName) {
      isValidate = false;
    }
    if (password) {
      isValidate = false;
    }
    if (password === checkPassword) {
      isValidate = false;
    }
    if (nickName) {
      isValidate = false;
    }
    if (phoneNumber) {
      isValidate = false;
    }

    if (isValidate) {
      navigation.navigate('SignInScreen' as never);
    }
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader handleBackBtn={() => navigation.goBack()} />
        <ScrollView style={styles.container}>
          <Text style={styles.pageTitleText}>회원가입</Text>
          <ReusableInput
            category="아이디"
            isMultiline={false}
            placeholder="아이디를 입력해주세요"
            value={userName}
            setValue={setUserName}
            focus={true}
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
            category="닉네임"
            isMultiline={false}
            placeholder="닉네임을 입력해주세요"
            value={nickName}
            setValue={setNickName}
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
            onClick={handleSignUp}
            text="회원가입 하기"
          />
        </ScrollView>
      </>
    </WholeWrapper>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pageTitleText: {
    fontSize: 30,
    color: COLORS.Orange,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '900',
  },
});
