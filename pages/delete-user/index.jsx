// Screen to delete a single user

import * as React from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';

import ETTextInput from '../components/et-text-input';
import ETButton from '../components/et-button';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const DeleteUser = ({navigation}) => {
  const [inputUserId, setInputUserId] = React.useState('');

  let deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_user WHERE user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ETTextInput
            placeholder="Enter User Id"
            onChangeText={inputUserId => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <ETButton title="Delete User" customClick={deleteUser} />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};
