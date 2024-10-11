import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 2:
      return 'Poor';
    case 3:
      return 'Fair';
    case 4:
      return 'Average';
    case 5:
      return 'Good';
    case 6:
      return 'Excellent';
    default:
      return 'Not Rated';
  }
};

export default function Detail({ route }: any) {
  const { userDetails } = route.params;
  const [loading, setLoading] = useState(true); // State to track image loading

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formcontainer}>
        <View style={styles.headerinner}>
          <Text style={styles.headertext}>Detailed Page</Text>
        </View>
        <View>
          {loading && ( // Show loader while image is being fetched
            <ActivityIndicator size="large" color="green" style={styles.loader} />
          )}
          <Image
            source={{ uri: userDetails.image }}
            style={styles.image}
            onLoadEnd={() => setLoading(false)} // Hide loader when image has loaded
            onError={() => setLoading(false)} // Hide loader if image fails to load
          />
        </View>
        <View style={styles.block}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>
            Name: {userDetails.firstname} {userDetails.middlename} {userDetails.lastname}
          </Text>
          <Text style={styles.label}>Age: {userDetails.age}</Text>
          <Text style={styles.label}>Phone Number: {userDetails.phoneno}</Text>
          <Text style={styles.label}>Rating: {getRatingDescription(userDetails.rating)}</Text>
          <Text style={styles.label}>Feedback : {userDetails.feedback}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDE9ED',
    height: '100%',
  },
  headertext: {
    fontSize: 30,
    color: '#282323',
    justifyContent: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  formcontainer: {
    borderColor: 'black',
    borderWidth: 2,
    margin: '5%',
  },
  image: {
    width: 190,
    height: 190,
    marginTop: 20,
    borderRadius: 100,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
  },
  headerinner: {
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  label: {
    fontSize: 17,
    marginBottom: 10,
    color: 'black',
  },
  block: {
    margin: 10,
    padding: 20,
    marginLeft: 20,
  },
});
