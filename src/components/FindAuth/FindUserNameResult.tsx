import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../WholeWrapper';
import ReusableHeader from '../ReusableHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import CheckCircle from '../../assets/icons/checkCircle.svg';
import FailCircle from '../../assets/icons/errorOccur.svg';
import {COLORS, FONTSIZE} from '../../theme/theme';
import ReusableBtn from '../ReusableBtn';

type Props = {};

const FindUserNameResult = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userName, setUserName] = React.useState<string>('huntingMaster');
  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'아이디 찾기 결과'}
          handleBackBtn={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.iconWrapper}>
              {userName ? (
                <CheckCircle />
              ) : (
                <FailCircle style={styles.failIcon} width={120} height={120} />
              )}
            </View>
            {userName ? (
              <View style={styles.resultTextWrapper}>
                <Text style={styles.idText}>아이디: </Text>
                <Text style={styles.idResult}>{userName}</Text>
              </View>
            ) : (
              <View style={styles.resultTextWrapper}>
                <Text style={styles.infoText}>
                  입력한정보와 일치하는 정보가 없습니다.
                </Text>
              </View>
            )}
            {userName && (
              <Text style={styles.infoText}>
                찾으신 아이디로 로그인 해주세요!
              </Text>
            )}

            <View style={styles.btnContainer}>
              <View style={styles.btnWrapper}>
                {userName && (
                  <ReusableBtn
                    isClickable={true}
                    onClick={() => navigation.navigate('SignInScreen')}
                    text="로그인 하러가기"
                  />
                )}
                <ReusableBtn
                  isClickable={true}
                  onClick={() => navigation.navigate('FindAuth')}
                  text={`${userName ? '계정 찾기' : '다시 찾기'}`}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    </WholeWrapper>
  );
};

export default FindUserNameResult;

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
  },
  failIcon: {
    width: 120,
    height: 120,
    color: 'red',
  },
});
