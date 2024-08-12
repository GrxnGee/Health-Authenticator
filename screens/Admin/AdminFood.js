import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../Firebase';
import { Picker } from '@react-native-picker/picker'; // Ensure you have installed this package

const db = getFirestore(app);
const auth = getAuth(app);

const AdminFood = ({ navigation }) => {
  const [fname, setFname] = useState('');
  const [ifood, setIfood] = useState('');
  const [cal, setCal] = useState('');
  const [cat, setCat] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const clearFields = () => {
    setFname('');
    setIfood('');
    setCal('');
    setCat('');
  };

  const validateFields = () => {
    return fname && ifood && cal && cat;
  };

  const addDataToFirestore = async () => {
    if (!validateFields()) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "food"), {
        fname: fname,
        ifood: ifood,
        cal: cal,
        cat: cat,
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success", `Document successfully created with ID: ${docRef.id}`);
      clearFields();
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Error adding document: " + e.message);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add a New Food Item</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFname}
        value={fname}
        placeholder="Enter Food Name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIfood}
        value={ifood}
        placeholder="Enter Ingredients"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCal}
        value={cal}
        placeholder="Enter Calories"
        placeholderTextColor="#aaa"
      />

      <View style={styles.pickerWrapper}>
        <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
          <Text style={[styles.pickerText, cat ? styles.selectedPickerText : styles.placeholderText]}>
            {cat ? cat : "Select Category"}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <Picker
            selectedValue={cat}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setCat(itemValue);
              setShowPicker(false);
            }}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Drink" value="Drink" />
            <Picker.Item label="Snacks" value="Snacks" />
            <Picker.Item label="Bakery" value="Bakery" />
            <Picker.Item label="Cake" value="Cake" />
            <Picker.Item label="Seafood" value="Seafood" />
            <Picker.Item label="Vegetable" value="Vegetable" />
          </Picker>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={addDataToFirestore}
        >
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={Logout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  pickerWrapper: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 150,
    width: '100%',
    marginTop: 10,
  },
  pickerText: {
    color: '#333',
  },
  selectedPickerText: {
    color: '#000',
  },
  placeholderText: {
    color: '#aaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    bottom: 70,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminFood;