import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const ChatList = (props: Props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WholeWrapper>
      <ReusableHeader title={'채팅'} handleBackBtn={handleGoBack} />
    </WholeWrapper>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
