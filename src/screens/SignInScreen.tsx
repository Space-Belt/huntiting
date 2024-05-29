import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableInput from '../components/ReusableInput';
import {COLORS, FONTSIZE} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {getPlatform} from '../utils/getPlatform';

type Props = {};

const SignInScreen = (props: Props) => {
  const navigation = useNavigation();

  const [userName, setUserName] = React.useState<string>('');

  const [password, setPassword] = React.useState<string>('');

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.pageTitleText}>로그인</Text>

          <ReusableInput
            category="아이디"
            isMultiline={false}
            placeholder="아이디를 입력해주세요"
            setValue={setPassword}
            value={password}
          />
          <ReusableInput
            category="비밀번호"
            isMultiline={false}
            placeholder="비밀번호를 입력해주세요"
            setValue={setPassword}
            value={password}
          />
          <View style={styles.signUpNfindAccountBox}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signUpNfindText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signUpNfindText}>계정찾기</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 10,
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
});
