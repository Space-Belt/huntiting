import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';

type Props = {};

const HuntDetail = (props: Props) => {
  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'상세보기'} />
      </>
    </WholeWrapper>
  );
};

export default HuntDetail;

const styles = StyleSheet.create({
  imageWrapper: {},
});
