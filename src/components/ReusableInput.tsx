import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTSIZE} from '../theme/theme';
import {getPlatform} from '../utils/getPlatform';

type Props = {
  category: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
  isMultiline: boolean;
  disabled?: boolean;
  focus?: boolean;
  errorMessage?: string;
  handleBtn?: {
    btnText: string;
    handleOnPress: () => Promise<void>;
    disabled: boolean;
  };
};

const ReusableInput = ({
  category,
  setValue,
  value,
  placeholder,
  isMultiline,
  disabled,
  focus,
  errorMessage,
  handleBtn,
}: Props) => {
  const handleInput = (text: string) => {
    setValue(text);
  };

  const textInputStyle: StyleProp<ViewStyle> = {
    width: handleBtn ? '75%' : '100%',
  };

  const textWrapperStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const disabledBtnStyle: StyleProp<ViewStyle> = {
    backgroundColor: handleBtn?.disabled ? '#3f3e3e6a' : COLORS.Orange2,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <View style={[handleBtn ? textWrapperStyle : {}]}>
        {!isMultiline ? (
          <TextInput
            style={[styles.inputStyle, textInputStyle]}
            placeholder={placeholder}
            value={value}
            onChangeText={handleInput}
            autoFocus={focus ? focus : false}
            editable={disabled ? false : true}
          />
        ) : (
          <TextInput
            style={styles.multilineInputStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={handleInput}
            multiline={true}
            numberOfLines={5}
            autoFocus={focus ? focus : false}
          />
        )}
        {handleBtn && (
          <TouchableOpacity
            style={[styles.btnStyle, disabledBtnStyle]}
            onPress={() => handleBtn.handleOnPress()}
            disabled={handleBtn.disabled}>
            <Text style={styles.btnText}>{handleBtn.btnText}</Text>
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text>{errorMessage}</Text>}
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
  btnStyle: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Orange2,
    borderRadius: 15,
  },
  btnText: {
    textAlign: 'center',
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    fontWeight: '700',
  },
  errorMessageText: {
    color: 'red',
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_12 : FONTSIZE.size_10,
  },
});
