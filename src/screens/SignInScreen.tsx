import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableInput from '../components/ReusableInput';
import {COLORS, FONTSIZE} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {getPlatform} from '../utils/getPlatform';
import ReusableBtn from '../components/ReusableBtn';
import UnCheckedBox from '../assets/icons/uncheckedBox.svg';
import CheckedBox from '../assets/icons/checkedBox.svg';

type Props = {};

const SignInScreen = (props: Props) => {
  const navigation = useNavigation();

  const [userName, setUserName] = React.useState<string>('');

  const [password, setPassword] = React.useState<string>('');

  const [passwordShow, setPasswordShow] = React.useState<boolean>(false);

  const handleLogin = () => {
    let isValidated = true;
    if (userName.length < 6) {
      isValidated = false;
    }

    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/.test(
        password,
      ) === false
    ) {
      isValidated = false;
    }

    if (isValidated) {
      navigation.navigate('BottomTab' as never);
    } else {
      Alert.alert('일치하는 계정이 존재하지 않습니다.');
    }
  };

  const handleShowPassword = () => {
    setPasswordShow(prev => !prev);
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.pageTitleText}>로그인</Text>

          <ReusableInput
            category="아이디"
            isMultiline={false}
            placeholder="아이디를 입력해주세요"
            value={userName}
            setValue={setUserName}
          />
          <ReusableInput
            category="비밀번호"
            isMultiline={false}
            placeholder="비밀번호를 입력해주세요"
            security={passwordShow}
            value={password}
            setValue={setPassword}
          />
          <TouchableOpacity onPress={handleShowPassword}>
            <View style={styles.showPassword}>
              {!passwordShow ? (
                <CheckedBox style={styles.checkIcon} />
              ) : (
                <UnCheckedBox style={styles.checkIcon} />
              )}
              <Text style={styles.showPasswordText}>비밀번호 보기</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signUpNfindAccountBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen' as never)}>
              <Text style={styles.signUpNfindText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FindAuth' as never)}>
              <Text style={styles.signUpNfindText}>계정찾기</Text>
            </TouchableOpacity>
          </View>
          <ReusableBtn
            text={'로그인'}
            isClickable={true}
            onClick={handleLogin}
          />
        </View>
      </View>
    </WholeWrapper>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  wrapper: {
    backgroundColor: '#eee',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1.5,
      width: 1.5,
    },
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 20,
  },
  pageTitleText: {
    fontSize: 30,
    color: COLORS.Orange,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '900',
  },
  signUpNfindAccountBox: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpNfindText: {
    color: COLORS.Orange2,
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : FONTSIZE.size_10,
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  showPassword: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  checkIcon: {
    width: 20,
    height: 20,
    color: COLORS.Orange,
  },
  showPasswordText: {
    marginLeft: 5,
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_12 : FONTSIZE.size_10,
    color: COLORS.Orange,
  },
});
