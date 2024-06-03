import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../../theme/theme';
import ReusableBtn from '../ReusableBtn';
import ReusableHeader from '../ReusableHeader';
import WholeWrapper from '../WholeWrapper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

import CheckCircle from '../../assets/icons/checkCircle.svg';
import FailCircle from '../../assets/icons/errorOccur.svg';

type Props = {};

const ChangePasswordResult = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isSuccess = true;
  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'비밀번호 찾기 결과'}
          handleBackBtn={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.iconWrapper}>
              {isSuccess ? (
                <CheckCircle />
              ) : (
                <FailCircle style={styles.failIcon} width={120} height={120} />
              )}
            </View>
            {isSuccess ? (
              <View style={styles.resultTextWrapper}>
                <Text style={styles.infoText}>
                  {`비밀번호가 변경되었습니다. \n 변경 된 비밀번호로 로그인하세요`}
                </Text>
              </View>
            ) : (
              <View style={styles.resultTextWrapper}>
                <Text style={styles.infoText}>
                  비밀번호 변경에 실패했습니다.
                </Text>
              </View>
            )}

            <View style={styles.btnContainer}>
              <View style={styles.btnWrapper}>
                {isSuccess && (
                  <ReusableBtn
                    isClickable={true}
                    onClick={() => navigation.navigate('SignInScreen')}
                    text="로그인 하러가기"
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </>
    </WholeWrapper>
  );
};

export default ChangePasswordResult;

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
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTextWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  idText: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '700',
    textAlign: 'center',
    marginRight: 15,
  },
  idResult: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Orange,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnContainer: {alignItems: 'center', justifyContent: 'center'},
  btnWrapper: {
    width: '80%',
  },
  infoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
    lineHeight: 25,
  },
  failIcon: {
    width: 120,
    height: 120,
    color: 'red',
  },
});
