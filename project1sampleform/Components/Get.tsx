import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import axios from 'axios';
import { url } from '../config';

function Get({ navigation }: any): React.JSX.Element {
  const [form, setForm] = useState([]);

  const getAllForm = async () => {
    try {
      const response = await axios.get(`${url}/api/form/`);
      const newData = response.data;
      // console.log(newData, ':+++');
      setForm(newData);
    } catch (error) {
      console.log(error, '??????');
    }
  };

  useEffect(() => {
    getAllForm();
  }, []); // Fetch data on component mount

  const onRefresh = useCallback(() => {
    getAllForm();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Call getAllForm when screen is focused
      getAllForm();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToSubmit = () => {
    navigation.navigate('Submit');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formcontainer}>
        <View style={styles.header}>
          <Text style={styles.headertext}>All User</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={navigateToSubmit}>
          <Text style={{ color: 'black' }}>Add New</Text>
        </Pressable>
        {form.length ? (
          form.reverse().map((item: any, index) => (
            <View key={index} style={styles.block}>
              <View style={styles.main}>
                <Text style={styles.label}>
                  Name : {item.firstname} {item.middlename} {item.lastname}
                </Text>
                <Text style={styles.label}>Phone No : {item.phoneno}</Text>
              </View>
              <View style={styles.seeall}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Detail', { userDetails: item })
                  }>
                  <Text style={styles.label1}>See Detail &gt;&gt;</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.block}>
            <Text style={styles.label}>No data available</Text>
            </View>
        )}
        <Pressable
          style={styles.button}
          onPress={navigateToSubmit}>
          <Text style={{ color: 'black' }}>Add New</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDE9ED',
  },
  formcontainer: {
    margin: '1%',
  },
  block: {
    margin: 10,
    marginBottom: 1,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    
  },
  label1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    backgroundColor:'#b5ebf5',
    padding:10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 40,
    color: '#282323',
  },
  seeall: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '40%',
  },
  main: {
    width: '60%',
  },
  button: {
    margin: 10,
    padding: 10,
    width: '50%',
    backgroundColor: '#85DFEF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
});

export default Get;
