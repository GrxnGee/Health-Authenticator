import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput } from "react-native";
import { auth, db } from "../../../Firebase";
import { doc, getDoc, updateDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Suggest from "../../../component/suggest";
import { useTranslation } from 'react-i18next';

const TodayEx = () => {
  const { t, i18n } = useTranslation();
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState(null);
  const [exerciseTypeId, setExerciseTypeId] = useState(null);
  const [exerciseType, setExerciseType] = useState(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [user, setUser] = useState(null);
  const [userWeight, setUserWeight] = useState(null);
  const navigation = useNavigation();
  const [userBody, setUserBody] = useState(null);

  const categoryOptions = {
    A: t("Weight Training"),
    B: t("Stretching"),
    C: t("Cardio")
  };

  const fetchExercisesByCategory = async (categoryName) => {
    const q = query(collection(db, "exercise"), where("cat", "==", categoryName));
    const querySnapshot = await getDocs(q);
    const fetchedExercises = [];
    querySnapshot.forEach((doc) => {
      fetchedExercises.push({ id: doc.id, ...doc.data() });
    });
    setExercises(fetchedExercises);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserWeight(userDocSnap.data().weight);
          setUserBody(userDocSnap.data().body);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  
  const calculateCalories = (ExMET, weight, hours) => {
    return parseFloat(ExMET) * weight * hours; 
  };

  const handleSubmit = async () => {
    if (user && exerciseType && userWeight) {
      const todayExDocRef = doc(db, "todayex", user.uid);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const caloriesBurned = calculateCalories(exerciseType.ExMet, userWeight, hours);  

      try {
        const docSnap = await getDoc(todayExDocRef);
        if (!docSnap.exists()) {
          await setDoc(todayExDocRef, {
            exercises: [{
              hours: hours,
              type:exerciseType.Exname,
              cal: caloriesBurned,
              day: currentDate,
            }],
          });
        } else {
          let exercises = docSnap.data().exercises;
          exercises.push({
            hours: hours,
            type: exerciseType.Exname,
            cal: caloriesBurned,
            day: currentDate,
          });
          await updateDoc(todayExDocRef, { exercises });
        }
        alert(t("Exercise data processed successfully!"));
      } catch (error) {
        console.error("Error processing exercise data: ", error);
        alert(t("Failed to process exercise data."));
      }
    } else {
      alert(t("Please ensure all fields are filled and try again."));
    }
  };

  const goBack = () => {
    navigation.navigate('Home');
  };

  const pressAdd = async () => {
    await handleSubmit();
    setTimeout(() => {
      goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.homeButtonText}>{t("home")}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text>{t("entertoday")}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHours}
          value={hours}
          placeholder={t("HoursEx")}
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        <View style={styles.pickerWrapper}>
          <TouchableOpacity onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
            <Text style={styles.pickerText}>
              {category ? categoryOptions[category] : t("SelectaCategory")}
            </Text>
          </TouchableOpacity>
          {showCategoryPicker && (
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setCategory(itemValue);
                setExerciseTypeId(null);
                setExerciseType(null);
                setShowCategoryPicker(false); 
                fetchExercisesByCategory(categoryOptions[itemValue]);
              }}
            >
              <Picker.Item label={t("weightTraining")} value="A" />
              <Picker.Item label={t("stretching")} value="B" />
              <Picker.Item label={t("cardio")} value="C" />
            </Picker>
          )}
        </View>

        {category && exercises.length > 0 && (
          <View style={styles.pickerWrapper}>
            <TouchableOpacity onPress={() => setShowExercisePicker(!showExercisePicker)}>
              <Text style={styles.pickerText}>
                {exerciseType ? (i18n.language === 'th' && exerciseType.ExnameTH ? exerciseType.ExnameTH : exerciseType.Exname) : t("selectEx")}
              </Text>
            </TouchableOpacity>
            {showExercisePicker && (
              <Picker
                selectedValue={exerciseTypeId}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setExerciseTypeId(itemValue);
                  setExerciseType(exercises.find(exercise => exercise.id === itemValue));
                  setShowExercisePicker(false); 
                }}
              >
                {exercises.map((exercise) => (
                  <Picker.Item key={exercise.id} label={i18n.language === 'th' && exercise.ExnameTH ? exercise.ExnameTH : exercise.Exname} value={exercise.id} />
                ))}
              </Picker>
            )}
          </View>
        )}

        <Button title={t("Submit")} onPress={pressAdd} />
        {userBody && <Suggest userBody={userBody} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 20,
  },
  input: {
    height: 50,
    marginVertical: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  homeButtonText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 8,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight || 30,
  },
  pickerWrapper: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
  },
  picker: {
    height: 150,
    width: '100%',
    marginTop: 10,
  },
  pickerText: {
    color: '#333',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default TodayEx;