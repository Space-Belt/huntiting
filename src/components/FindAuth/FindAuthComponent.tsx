import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../WholeWrapper';
import ReusableInput from '../ReusableInput';
import ReusableBtn from '../ReusableBtn';

type Props = {
  selectedTabIndex: number;
  handleBtn: () => void;
};

const FindAuthComponent = ({selectedTabIndex, handleBtn}: Props) => {
  const [name, setName] = React.useState<string>('');

  const [userName, setUserName] = React.useState<string>('');

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const [isSend, setIsSend] = React.useState<boolean>(false);

  const [validNumber, setValidNumber] = React.useState<string>('');

  const [isValidated, setIsValidated] = React.useState<boolean>(false);

  React.useEffect(() => {
    setName('');
    setUserName('');
    setPhoneNumber('');
    setIsSend(false);
    setValidNumber('');
    setIsValidated(false);
  }, [selectedTabIndex]);

  return (
    <View style={styles.container}>
      {selectedTabIndex === 1 && (
        <ReusableInput
          category="아이디"
          placeholder="가입하신 아이디를 입력해주세요"
          isMultiline={false}
          setValue={setUserName}
          value={userName}
          focus={true}
        />
      )}
      <ReusableInput
        category="이름"
        placeholder="이름을 입력해주세요"
        isMultiline={false}
        setValue={setName}
        value={name}
        focus={true}
      />
      <ReusableInput
        category="핸드폰 번호"
        placeholder="가입시 등록한 핸드폰번호를 입력해주세요"
        isMultiline={false}
        setValue={setPhoneNumber}
        value={phoneNumber}
        focus={true}
        handleBtn={{
          btnText: !isSend ? '인증발송' : '재발송',
          handleOnPress: async () => {
            setIsSend(true);
            Alert.alert('인증번호를 발송했습니다.');
          },
          disabled: false,
        }}
      />
      <ReusableInput
        category="인증 번호"
        placeholder="발송된 인증번호를 입력해주세요"
        isMultiline={false}
        setValue={setValidNumber}
        value={validNumber}
        focus={true}
        handleBtn={{
          btnText: isSend ? '확인' : '미전송',
          handleOnPress: async () => {
            setIsValidated(true);
            Alert.alert('인증되었습니다.');
          },
          disabled: !isSend,
        }}
      />
      <ReusableBtn
        isClickable={isValidated}
        onClick={() => handleBtn()}
        text={`${selectedTabIndex === 0 ? '아이디 찾기' : '비밀번호 찾기'}`}
      />
    </View>
  );
};

export default FindAuthComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
});
