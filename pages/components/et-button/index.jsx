// Custom button

import * as React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ETButton = ({customClick, title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={customClick}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ETButton;
