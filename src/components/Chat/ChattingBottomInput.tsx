import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import PlusIcon from '../../assets/icons/customPlus.svg';
import {COLORS} from '../../theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Send from '../../assets/icons/send.svg';
import Camera from '../../assets/icons/addPhoto.svg';

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const ChattingBottomInput = ({text, setText}: Props) => {
  const handleText = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle}>
        <Camera width={30} height={30} style={styles.iconStyle} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        onChangeText={handleText}
        value={text}
        placeholder="채팅"
      />
      <TouchableOpacity style={styles.sendBtn}>
        <Send style={styles.sendIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ChattingBottomInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderTopColor: COLORS.Orange2,
    height: 70,
    backgroundColor: COLORS.WhiteRGBA75,
  },
  btnStyle: {
    alignItems: 'center',
  },
  iconStyle: {
    width: 60,
    height: 60,
    color: COLORS.Orange,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.Orange2,
    paddingHorizontal: 10,
  },
  sendBtn: {
    width: 50,
    height: 45,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: COLORS.Orange2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 30,
    height: 30,
    color: '#fff',
  },
});
