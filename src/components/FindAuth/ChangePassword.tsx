import {StyleProp, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../../theme/theme';
import ReusableHeader from '../ReusableHeader';
import WholeWrapper from '../WholeWrapper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import ReusableInput from '../ReusableInput';
import ReusableBtn from '../ReusableBtn';

type Props = {};

const ChangePassword = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = React.useState<string>('');
  const [checkPassword, setCheckPassword] = React.useState<string>('');

  const isValidateStyle: StyleProp<ViewStyle> = {
    backgroundColor: password === checkPassword ? COLORS.Orange : '#4c4a4a7a',
  };

  const changePasswordClick = () => {
    navigation.navigate('ChangePasswordResult' as never);
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'아이디 찾기 결과'}
          handleBackBtn={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.setPasswordTitle}>비밀번호 설정</Text>
            <ReusableInput
              category="비밀번호"
              isMultiline={false}
              placeholder="사용하실 비밀번호를 입력해주세요"
              setValue={setPassword}
              value={password}
              focus={true}
            />
            <ReusableInput
              category="비밀번호 확인"
              isMultiline={false}
              placeholder="확인 비밀번호를 입력해주세요"
              setValue={setCheckPassword}
              value={checkPassword}
              focus={false}
            />
            <ReusableBtn
              isClickable={password.length > 10 && checkPassword.length > 10}
              text="비밀번호 변경"
              onClick={() => {
                changePasswordClick();
              }}
            />
          </View>
        </View>
      </>
    </WholeWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  wrapper: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#eee',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.Orange,
    shadowOpacity: 1,
    shadowRadius: 2,
    transform: [
      {
        translateY: -50,
      },
    ],
  },
  setPasswordTitle: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
    color: COLORS.Orange2,
    textAlign: 'center',
    marginBottom: 20,
  },
});
