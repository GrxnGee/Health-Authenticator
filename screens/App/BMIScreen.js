import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../Firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';

export default function InfoScreen({ route }) {
    const navigation = useNavigation();
    const user = auth.currentUser;
    const [userInfo, setUserInfo] = useState(null);

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [chronic, setChronic] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    setUserInfo(doc.data());
                } else {
                    console.error('Error', 'No such document!');
                }
            }, (error) => {
                console.error("Error fetching user data: ", error);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const activityOptions = [
        { label: 'Little to no exercise', value: '1.2' },
        { label: 'Light exercise', value: '1.375' },
        { label: 'Moderate exercise', value: '1.55' },
        { label: 'Heavy physical exercise', value: '1.725' },
        { label: 'Very Heavy physical exercise', value: '1.9' },
    ];

    const handleBirthdateChange = (text) => {
        setBirthdate(text);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const calculateBMIBMR = async () => {
        if (!height || !weight || !activityLevel) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        const parsedHeight = parseFloat(height);
        const heightInMeters = parsedHeight / 100;
        const parsedWeight = parseFloat(weight);
        const parsedActivityLevel = parseFloat(activityLevel);

        if (isNaN(parsedWeight) || isNaN(parsedHeight) || isNaN(parsedActivityLevel)) {
            Alert.alert('Error', 'Invalid input values.');
            return;
        }

        let bmi = parsedWeight / (heightInMeters ** 2);
        let age = userInfo ? new Date().getFullYear() - new Date(userInfo.birthdate).getFullYear() : 0;

        let bmr;
        if (userInfo && userInfo.gender === 'Male') {
            bmr = 66 + (13.7 * parsedWeight) + (5 * parsedHeight) - (6.8 * age);
        } else if (userInfo && userInfo.gender === 'Female') {
            bmr = 665 + (9.6 * parsedWeight) + (1.8 * parsedHeight) - (4.7 * age);
        }

        let tdee = bmr * parsedActivityLevel;

        let bodyType;
        if (bmi < 18.5) {
            bodyType = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            bodyType = 'Normal';
        } else if (bmi >= 25 && bmi <= 29.9) {
            bodyType = 'Overweight';
        } else if (bmi >= 30 && bmi <= 34.9) {
            bodyType = 'Obese';
        } else {
            bodyType = 'Extremely Obese';
        }

        try {
            await updateDoc(doc(db, "users",  user.uid), {
                weight: parsedWeight,
                height: parsedHeight,
                bmi: bmi.toFixed(2),
                bmr: bmr.toFixed(2),
                tdee: tdee.toFixed(2),
                bodyType,
                chronic,
                birthdate
            });
            Alert.alert('Success', 'Updated your health metrics successfully.');
        } catch (error) {
            Alert.alert('Error', 'Failed to update your health metrics.');
            console.error("Error updating user data: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ marginTop: Constants.statusBarHeight }}>
                <Text style={styles.bmiText}>BMI</Text>

                <View style={styles.card}>
                    <TextInput
                        placeholder="Height"
                        style={styles.textBox}
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                    />
                    <Text style={styles.unitText}>CM</Text>
                </View>

                <View style={styles.card}>
                    <TextInput
                        placeholder="Weight"
                        style={styles.textBox}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                    />
                    <Text style={styles.unitText}>KG</Text>
                </View>

                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={activityLevel}
                        onValueChange={(itemValue) => setActivityLevel(itemValue)}
                        style={styles.picker}
                    >
                        {activityOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={calculateBMIBMR}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    bmiText: {
        color: '#4A9B5D',
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 45,
        marginBottom: 20,
    },
    card: {
        height: 145,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 3, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textBox: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
    },
    unitText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4A9B5D',
    },
    button: {
        height: 50,
        backgroundColor: '#387647',
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    pickerView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        overflow: 'hidden',
        height: 50,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#4A9B5D',
        justifyContent: 'center',
        marginTop: 20,
    },
    picker: {
        color: '#fff',
        justifyContent: 'center',
        marginLeft: 15,
    },
});
