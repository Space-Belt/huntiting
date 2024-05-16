import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import SettingComponent from '../components/Setting/SettingComponent';

type Props = {};

const Setting = (props: Props) => {
  const [notificationOn, setNotificationOn] = React.useState<boolean>(false);
  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader title="설정" />
        <SettingComponent
          name="알림"
          setValue={setNotificationOn}
          value={notificationOn}
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
