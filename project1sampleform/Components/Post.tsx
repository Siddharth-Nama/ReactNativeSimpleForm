import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../config';
import ImageResizer from 'react-native-image-resizer';

export default function Post({navigation}:any ,{route}:any) {
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [age, setAge] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('1');
  const [image, setimage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    phoneno: '',
    age: '',
    feedback: '',
    rating: '',
    image: '',
  });

  interface FormDataType {
    firstname: string;
    middlename?: string;
    lastname: string;
    phoneno: string;
    age: string;
    feedback: string;
    rating: string;
    image: string | null | undefined;
  }
  const [formData, setFormData] = useState<FormDataType>({
    firstname: '',
    middlename: '',
    lastname: '',
    phoneno: '',
    age: '',
    feedback: '',
    rating: '1',
    image: null,
  });
    
  const handleSelectImage = () => {
    launchImageLibrary(
      { includeBase64: true, mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedAsset = response.assets[0];
          const imageUri = selectedAsset.uri;
  
          if (imageUri) {
            // Resize the image if needed
            ImageResizer.createResizedImage(imageUri, 800, 600, 'JPEG', 70)
              .then((resizedImage) => {
                setimage(resizedImage.uri); // Set the URI of the resized image for display
                
                // If you still need to handle the base64 image, you can get it from the original response
                if (selectedAsset.base64) {
                  setFormData((prev: FormDataType) => ({
                    ...prev,
                    image: selectedAsset.base64, // Use the original image's base64
                  }));
                } else {
                  console.log('Base64 not available in selected asset');
                }
              })
              .catch((err) => {
                console.log('Error during image compression:', err);
              });
          }
        } else {
          console.log('No image selected');
        }
      }
    );
  };
  
  
  const validate = () => {
    let valid = true;
    let errors = {
      firstname: '',
      lastname: '',
      phoneno: '',
      age: '',
      feedback: '',
      rating: '',
      image: '',
    };
    const namePattern = /^[a-zA-Z]+$/;

    if (!firstname.trim()) {
      errors.firstname = 'First Name is required';
      valid = false;
    } else if (!namePattern.test(firstname)) {
      errors.firstname = 'Name should contain only letters';
      valid = false;
    }

    if (!lastname.trim()) {
      errors.lastname = 'Last Name is required';
      valid = false;
    } else if (!namePattern.test(lastname)) {
      errors.lastname = 'Name should contain only letters';
      valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phoneno.trim()) {
      errors.phoneno = 'Phone No. is required';
      valid = false;
    } else if (!phonePattern.test(phoneno)) {
      errors.phoneno = 'Phone No. must be 10 digits';
      valid = false;
    }

    const agePattern = /^[0-9]{1,3}$/;
    if (!age.trim()) {
      errors.age = 'Age is required';
      valid = false;
    } else if (!agePattern.test(age)) {
      errors.age = 'Age must be valid between 1-120';
      valid = false;
    }

    if (!rating.trim() || rating == '1') {
      errors.rating = 'Rating is required';
      valid = false;
    }

    if (!feedback.trim()) {
      errors.feedback = 'Feedback is required';
      valid = false;
    }

    if (!image) {
      errors.image = 'Image is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };


  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append('phoneno', phoneno);
      formData.append('firstname', firstname);
      formData.append('middlename', middlename);
      formData.append('lastname', lastname);
      formData.append('age', age);
      formData.append('feedback', feedback);
      formData.append('rating', rating);
  
      if (image) {
        const formDataImage = {
          uri: image, // Ensure this is a valid URI
          type: 'image/jpeg', // Change this according to the actual image type (e.g., 'image/png' for PNG files)
          name: 'image.jpg', // Use a valid filename with extension
        };
        formData.append('image', formDataImage);
      }
      
      console.log("hi--------------------->");
  
      axios.post(url + '/api/submit/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        console.log('Success-------------------------->', response.data);
        const refreshData = route?.refreshData;
        if (refreshData) {
          refreshData();
        }
        navigation.navigate("Home");
        console.log("home");
      })
      .catch(error => {
        if (error.response) {
          console.log('Error Data:', error.response.data);
          console.log('Error Status:', error.response.status);
        } else if (error.request) {
          console.log('Error Request:', error.request);
        } else {
          console.log('Error Message:', error.message);
        }
      });
    } else {
      Alert.alert('Error', 'Please correct the errors before submitting.');
      console.log('Error:');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formcontainer}>
        <View style={styles.block}>
          <Text style={styles.label}>First Name :</Text>
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={setFirstname}
          />
          {errors.firstname ? <Text style={styles.errorText}>{errors.firstname}</Text> : null}
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Middle Name (Optional) :</Text>
          <TextInput
            style={styles.input}
            value={middlename}
            onChangeText={setMiddlename}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Last Name :</Text>
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastname}
          />
          {errors.lastname ? <Text style={styles.errorText}>{errors.lastname}</Text> : null}
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Phone No. :</Text>
          <TextInput
            style={styles.input}
            value={phoneno}
            onChangeText={setPhoneno}
            keyboardType="numeric"
          />
          {errors.phoneno ? <Text style={styles.errorText}>{errors.phoneno}</Text> : null}
        </View>
        
        <View style={styles.block}>
          <Text style={styles.label}>Age :</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Rating:</Text>
          <Picker
            style={styles.input}
            onValueChange={(itemValue) => setRating(itemValue)}
            selectedValue={rating}
          >
            <Picker.Item label="Select here" value="1" />
            <Picker.Item label="1 - Poor" value="2" />
            <Picker.Item label="2 - Fair" value="3" />
            <Picker.Item label="3 - Average" value="4" />
            <Picker.Item label="4 - Good" value="5" />
            <Picker.Item label="5 - Excellent" value="6" />
          </Picker>
          {errors.rating ? <Text style={styles.errorText}>{errors.rating}</Text> : null}
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Profile Image:</Text>
          <Button color='#85DFEF' title="Select Image" onPress={handleSelectImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}   
         {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Feedback :</Text>
          <TextInput
            style={[styles.input, styles.feedback]}
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
          {errors.feedback ? <Text style={styles.errorText}>{errors.feedback}</Text> : null}
        </View>
        <View style={styles.submit}><Button  color='#85DFEF' title="Submit" onPress={handleSubmit} /></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDE9ED',
  },
  formcontainer: {
    borderColor: 'black',
    borderWidth: 2,
    margin: '5%',
  },
  block: {
    margin: 10,
    marginBottom: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
  },
  feedback: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  submit:{
    margin:15,
    borderColor:'blue',
    borderRadius:8,
  },
});
