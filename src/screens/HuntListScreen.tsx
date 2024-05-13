import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const HuntListScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleBackBtn = () => {
    navigation.navigate('detail' as never);
  };

  return (
    <View>
      <ReusableHeader title="HomeScreen" handleBackBtn={handleBackBtn} />
      <HuntListComponent />
    </View>
  );
};

export default HuntListScreen;

const styles = StyleSheet.create({});
