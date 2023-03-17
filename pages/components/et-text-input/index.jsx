// Custom TextInput

import * as React from 'react';

import {View, TextInput} from 'react-native';

const ETTextInput = ({
  placeholder,
  keyboardType,
  onChangeText,
  returnKeyType,
  numberOfLines,
  multiline,
  onSubmitEditing,
  style,
  value,
}) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#007fff',
        borderWidth: 1,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor="#007fff"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        style={style}
        value={value}
        blurOnSubmit={false}
      />
    </View>
  );
};

export default ETTextInput;
