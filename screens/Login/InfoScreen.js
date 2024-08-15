import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

export default function InfoScreen({ route }) {
    const navigation = useNavigation();
    const { userId } = route.params;
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [chronic, setChronic] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [showPicker, setShowPicker] = useState(false);


    //chronic
    const activityOptions = [
        { label: 'Little to no exercise', value: 'sedentary' },
        { label: 'Light exercise', value: 'light' },
        { label: 'Moderate exercise', value: 'moderate' },
        { label: 'Heavy physical exercise', value: 'intense' },
        { label: 'Very Heavy physical exercise', value: 'very_intense' },
    ];

    const formatDate = (date) => {
        const cleaned = date.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);
        if (match) {
            const [, year, month, day] = match;
            return `${year}${month ? `/${month}` : ''}${day ? `/${day}` : ''}`;
        }
        return date;
    };

    const handleBirthdateChange = (text) => {
        const formattedDate = formatDate(text);
        setBirthdate(formattedDate);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const calculateold = (birthdate) => {
        const [year, month, day] = birthdate.split('/').map(Number);
        const today = new Date();
        const birthDate = new Date(year, month - 1, day); 
        let old = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            old--;
        }
        return old;
    };

    async function saveInfo() {
        if (!weight || !height || !gender || !birthdate || !activityLevel) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const old = calculateold(birthdate);

        try {
            await updateDoc(doc(db, "users", userId), {
                weight,
                height,
                gender,
                birthdate,
                activityLevel,
                old,
                chronic
            });

            Alert.alert('Success', 'Account created successfully.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.messold);
        }
    }

    return (
        <View style={styles.container}>
            <ExpoStatusBar style="light" />
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Weight (kg)"
                            placeholderTextColor={'gray'}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Height (cm)"
                            placeholderTextColor={'gray'}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.genderContainer}>
                            <TouchableOpacity
                                style={[styles.genderOption, gender === 'Male' && styles.selectedGender]}
                                onPress={() => handleGenderSelect('Male')}>
                                <Text style={styles.genderText}>♂️ Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderOption, gender === 'Female' && styles.selectedGender]}
                                onPress={() => handleGenderSelect('Female')}>
                                <Text style={styles.genderText}>♀️ Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Birthdate (YYYY/MM/DD)"
                            placeholderTextColor={'gray'}
                            value={birthdate}
                            onChangeText={handleBirthdateChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Chronic Disease"
                            placeholderTextColor={'gray'}
                            onChangeText={setChronic}
                            keyboardType="chronic"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Activity Level</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowPicker(!showPicker)}
                        >
                            <Text style={[styles.pickerText, activityLevel ? styles.selectedPickerText : styles.placeholderText]}>
                                {activityLevel ? activityLevel : "Select Activity Level"}
                            </Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <Picker
                                selectedValue={activityLevel}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    setActivityLevel(itemValue);
                                    setShowPicker(false);
                                }}
                            >
                                {activityOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.label} />
                                ))}
                            </Picker>
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={saveInfo}>
                        <Text style={styles.buttonText}>Save Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        paddingTop: 48,
    },
    form: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    inputContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 15,
        borderRadius: 20,
        width: '100%',
        marginBottom: 10,
    },
    input: {
        paddingVertical: 10,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center', 
        marginTop: 20, 
    },
    button: {
        backgroundColor: 'rgba(127, 192, 75, 1)',
        padding: 15,
        borderRadius: 20,
        width: '80%', 
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    genderContainer: {
        flexDirection: 'row',
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    selectedGender: {
        backgroundColor: 'rgba(127, 192, 75, 0.1)',
        borderRadius: 10,
    },
    genderText: {
        fontSize: 16,
        marginLeft: 10,
    },
    picker: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 20,
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
});