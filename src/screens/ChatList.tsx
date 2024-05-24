import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';

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
