import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth, db } from '../../Firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
import { Picker } from "@react-native-picker/picker";

export default function AssetExample() {
    const [userInfo, setUserInfo] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    setUserInfo(doc.data());
                } else {
                    console.สนเ('Error', 'No such document!');
                }
            }, (error) => {
                console.error("Error fetching user data: ", error);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const [activityLevel, setActivityLevel] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const calculateBMIBMR = async () => {
        if (!height || !weight || !activityLevel) {
            Alert.alert('Please fill all fields.');
            return;
        }

        const parsedHeight = parseFloat(height);
        const heightInMeters = parsedHeight / 100;

        if (isNaN(weight) || isNaN(parsedHeight)) {
            Alert.alert('Error', 'Invalid input values.');
            return;
        }

        const bmi = weight / (heightInMeters ** 2);

        if (!userInfo) {
            Alert.alert('Error', 'User information not available.');
            return;
        }

        let bmr;
        if (userInfo.gender === 'Male') {
            bmr = 66 + (13.7 * weight) + (5 * parsedHeight) - (6.8 * userInfo.old);
        } else {
            bmr = 665 + (9.6 * weight) + (1.8 * parsedHeight) - (4.7 * userInfo.old);
        }
if(parseFloat(activityLevel) == 0){
    Alert.alert('Please Select Activity');
    return;
}
    const tdee = bmr * parseFloat(activityLevel);



        console.log('BMI : ', bmi.toFixed(2));
        console.log('BMR : ', bmr.toFixed(2));
        console.log('TDEE : ', tdee.toFixed(2));

        try {
            await updateDoc(doc(db, "users", user.uid), {
                bmi: bmi.toFixed(2),
                bmr: bmr,
                tdee: tdee.toFixed(2),
            });
            console.log('Updated');
        } catch (error) {
            console.error("Error updating user data: ", error);
        }
    };

    const activityOptions = [
        { label: 'SELECT ACTIVITY', value: '0' },
        { label: 'Little to no exercise', value: '1.2' },
        { label: 'Light exercise', value: '1.375' },
        { label: 'Moderate exercise', value: '1.55' },
        { label: 'Heavy physical exercise', value: '1.725' },
        { label: 'Very heavy physical exercise', value: '1.9' },
    ];

    return (
        <View>
            <SafeAreaView>
                <View style={{ marginTop: Constants.statusBarHeight }}>
                    <Text style={styles.bmiText}>BMI</Text>
                    <Card style={styles.card}>
                        <TextInput
                            placeholder="Height"
                            style={styles.textBox}
                            keyboardType="numeric"
                            value={height}  
                            onChangeText={setHeight}
                        />
                         <Text style={{textAlign:'center', marginLeft:'32%', fontWeight:'bold'}}>CM</Text>
                    </Card>

                    <Card style={styles.card}>
                        <TextInput
                            placeholder="Weight"
                            style={styles.textBox}
                            keyboardType="numeric"
                            value={weight}
                            onChangeText={setWeight}
                        />
                        <Text style={{textAlign:'center', marginLeft:'32%', fontWeight:'bold'}}>KG</Text>
                    </Card>
                </View>

                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={activityLevel}
                        onValueChange={(itemValue) => setActivityLevel(itemValue)}
                        style={{ backgroundColor: '#4A9B5D', justifyContent:'center', marginLeft: 40, paddingTop:25}}
                    >
                        {activityOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>

                <View style={{marginTop: '45%'}}>
                    <TouchableOpacity style={styles.button} onPress={calculateBMIBMR}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Calculate</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    bmiText: {
        color: '#4A9B5D',
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 45,
    },
    card: {
        height: 145,
        marginTop: '5%',
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        elevation: 0,
    },
    textBox: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        marginLeft:'32%'
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
        marginTop:'5%'
  
    },
    picker: {
        marginTop: '5%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        overflow: 'hidden',
        height: 50,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#4A9B5D',
        justifyContent: 'center',
    }
});