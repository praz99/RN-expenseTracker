import * as React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import ETTextInput from '../components/et-text-input';
import ETButton from '../components/et-button';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const UpdateUser = ({navigation}) => {
  const [inputUserId, setInputUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userContact, setUserContact] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');

  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE usr_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };

  let updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress);

    if (!inputUserId) {
      alert('Please fill user id');
      return;
    }

    if (!userName) {
      alert('Please fill name');
      return;
    }

    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }

    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user SET user_name=?, user_contact=?, user_address=? WHERE user_id=?',
        [userName, userContact, userAddress, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Update Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <ETTextInput
                placeholder="Enter User Id"
                style={{padding: 10}}
                onChangeText={inputUserId => setInputUserId(inputUserId)}
              />
              <ETButton title="Search User" customClick={searchUser} />
              <ETTextInput
                placeholder="Enter Name"
                value={suerName}
                style={{padding: 10}}
                onChangeText={userName => setUserName(userName)}
              />
              <ETTextInput
                placeholder="Enbter Contact Number"
                value={'' + userContact}
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <ETTextInput
                value={userAddress}
                placeHolder="Enter Address"
                onChangeText={userAddress => setUseAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <ETButton title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
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

export default UpdateUser;
