import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const HuntListScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleBackBtn = () => {
    navigation.navigate('detail' as never);
  };

  return (
    <WholeWrapper>
      <ScrollView>
        <ReusableHeader title="HomeScreen" handleBackBtn={handleBackBtn} />
        <HuntListComponent />
      </ScrollView>
    </WholeWrapper>
  );
};

export default HuntListScreen;

const styles = StyleSheet.create({});
