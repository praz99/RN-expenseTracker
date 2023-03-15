// Home screen

import * as React from 'react';

import {View, Text, SafeAreaView} from 'react-native';

import ETButton from '../components/et-button';
import ETText from '../components/et-text';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = ({navigation}) => {
  React.useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ETText text="SQLite Example" />
          <ETButton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <ETButton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <ETButton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <ETButton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <ETButton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'gray',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'gray',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
