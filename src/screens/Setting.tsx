import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import SettingComponent from '../components/Setting/SettingComponent';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const Setting = (props: Props) => {
  const navigation = useNavigation();

  const [notificationOn, setNotificationOn] = React.useState<boolean>(false);
  const [marketingAccept, setMarketingAccept] = React.useState<boolean>(false);

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader
          title="설정"
          handleBackBtn={() => navigation.goBack()}
        />
        <SettingComponent
          name="알림"
          setValue={setNotificationOn}
          value={notificationOn}
        />
        <SettingComponent
          name="마케팅 수신동의"
          setValue={setMarketingAccept}
          value={marketingAccept}
        />
      </View>
    </WholeWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
