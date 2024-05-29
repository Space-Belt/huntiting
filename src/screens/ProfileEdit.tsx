import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import ReusableInput from '../components/ReusableInput';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const ProfileEdit = (props: Props) => {
  const navigation = useNavigation();
  const [name, setName] = React.useState<string>('김홍도');
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WholeWrapper>
      <View>
        <ReusableHeader title="프로필 변경" handleBackBtn={handleGoBack} />
        <ScrollView>
          <View style={styles.container}>
            <ReusableInput
              category="이름"
              placeholder="물품명을 입력해주세요"
              setValue={setName}
              value={name}
              isMultiline={false}
            />
          </View>
        </ScrollView>
      </View>
    </WholeWrapper>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
});
