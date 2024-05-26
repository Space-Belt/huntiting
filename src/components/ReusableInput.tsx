import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS, FONTSIZE} from '../theme/theme';

type Props = {
  category: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  isMultiline: boolean;
};

const ReusableInput = ({
  category,
  setValue,
  value,
  placeholder,
  isMultiline,
}: Props) => {
  const handleInput = (text: string) => {
    setValue(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      {!isMultiline ? (
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={handleInput}
        />
      ) : (
        <TextInput
          style={styles.multilineInputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={handleInput}
          multiline={true}
          numberOfLines={5}
        />
      )}
    </View>
  );
};

export default ReusableInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  category: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Orange,
    fontWeight: '700',
  },
  inputStyle: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: FONTSIZE.size_14,
    backgroundColor: '#eee',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    color: '#6b650e',
  },
  multilineInputStyle: {
    height: 130,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#eee',
    fontSize: FONTSIZE.size_14,
    borderColor: '#d9d7ba',
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    color: '#6b650e',
  },
});
