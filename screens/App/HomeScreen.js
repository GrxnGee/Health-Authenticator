import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { auth, db } from '../../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const user = auth.currentUser;
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    setUserInfo(doc.data());
                } else {
                    Alert.alert('Error', 'No such document!');
                }
            }, (error) => {
                console.error("Error fetching user data: ", error);
                Alert.alert('Error', 'Failed to fetch user data.');
            });

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {userInfo ? (
                    <>
                        <View style={styles.userInfoContainer}>
                            <Card style={styles.userCard}>
                                <Text style={styles.baseText}>{userInfo.name}</Text>
                                <View style={styles.historyContainer}>
                                    <Text style={styles.historyText}>History</Text>
                                </View>
                                <Text style={styles.secText}>{userInfo.birthdate}</Text>
                                <Text style={styles.infoText}>{userInfo.weight} KG</Text>
                                <View style={styles.barContainer}>
                                    <View style={styles.bar} />
                                    <View style={styles.barGreen} />
                                    <View style={styles.highContainer}>
                                        <Text style={styles.highText}>High</Text>
                                    </View>
                                    <View style={styles.barRed} />
                                </View>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BMI')}>
                                    <Text style={styles.buttonText}>Start Calculate</Text>
                                </TouchableOpacity>
                            </Card>
                        </View>
                        <Text style={styles.sectionTitle}>Today</Text>
                        <Card style={styles.circleCard}>
                            <Text style={{fontWeight:'bold',textAlign:'left',right:65,bottom:2,fontSize:18,top:2}} >Calories</Text>
                            <Text style={{fontWeight:'bold',textAlign:'left',right:65,bottom:6,color:'grey',top:2,fontSize:14}} >Remaining= Goal - Food + Exercise</Text>
                            <View style={styles.item}>
                                <Text style={styles.label}>Base Goal</Text>
                            </View>
                            <Text style={styles.value}>{userInfo.bmi}</Text>
                            <View style={styles.item}>
                                <Text style={styles.label}>Food</Text>
                            </View>
                            <Text style={styles.value}>{userInfo.tdee}</Text>
                            <View style={styles.item}>
                                <Text style={styles.label}>Exercise</Text>
                            </View>
                            <Text style={styles.value}>0</Text>
                            <View style={[styles.circle, styles.circleOutline]}>
                                <View style={styles.circleFill} />
                            </View>
                        </Card>
                        <Text style={styles.sectionTitle}>Available plans</Text>
                        <Card style={styles.circleCard}>
                            <Image
                                source={{ uri: 'https://img1.wsimg.com/isteam/ip/1ee0d8b5-9920-41fc-9085-856fcdd9bb65/iStock-1149241482.jpg' }} // Replace with your image URL or local path
                                style={styles.cardImage}
                            />
                        </Card>
                        <Text style={styles.sectionTitle}>Meal plans</Text>
                        <Card style={styles.circleCard} onPress={() => navigation.navigate('Food')}>
                            <Image
                                source={{ uri: 'https://www.andilynnfitness.com/cdn/shop/files/14-days-clean-eating-meal-plan-1200-lede-601736337d914519bb5bf8eb83540da1.jpg?v=1713741074&width=713' }} // Replace with your image URL or local path
                                style={styles.cardImage}
                            />
                        </Card>
                    </>
                ) : (
                    <Text style={styles.info}>Loading user information...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

 const styles = StyleSheet.create({
     safeArea: {
         flex: 1,
         backgroundColor: '#FFFFFF',
     },
     scrollViewContent: {
         flexGrow: 1,
         paddingBottom: 20,
     },
     userInfoContainer: {
         backgroundColor: '#50A966',
         paddingBottom: 20, 
     },
     userCard: {
         backgroundColor: '#FFFFFF',
         marginTop: 70,
         marginHorizontal: 20,
         marginBottom: 30,
         borderRadius: 20,
         padding: 20,
     },
     baseText: {
         fontWeight: 'bold',
         marginBottom: 10,
     },
     historyContainer: {
         borderColor: '#50A966',
         height: 20,
         width: 80,
         borderRadius: 10,
         borderWidth: 2,
         marginVertical: 10,
         alignItems: 'center',
         justifyContent: 'center',
         position: 'absolute',
         right: 20,
         top: 20,
     },
     historyText: {
         fontWeight: 'bold',
         textAlign: 'center',
     },
     secText: {
         fontWeight: 'bold',
         marginBottom: 10,
     },
     infoText: {
         fontWeight: 'bold',
         textAlign: 'center',
         fontSize: 30,
         marginBottom: 20,
         top:20
     },
     barContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         marginVertical: 15,
     },
     bar: {
         width: 75,
         height: 10,
         backgroundColor: 'cyan',
         borderRadius: 10,
         marginRight: 5,
     },
     barGreen: {
         width: 75,
         height: 10,
         backgroundColor: 'green',
         borderRadius: 10,
         marginRight: 10,
     },
     barRed: {
         width: 75,
         height: 10,
         backgroundColor: 'coral',
         borderRadius: 10,
         marginLeft: 10,
     },
     highContainer: {
         backgroundColor: 'gold',
         paddingHorizontal: 25,
         paddingVertical: 1,
         borderRadius: 20,
         marginHorizontal: 1,
     },
     highText: {
         fontSize: 16,
         fontWeight: 'bold',
         color: 'black',
     },
     button: {
         marginTop: 20,
         alignItems: 'center',
         backgroundColor: '#71AA7F',
         padding: 10,
         borderRadius: 30,
         marginHorizontal: 60,
     },
     buttonText: {
         fontWeight: 'bold',
         color: 'white',
     },
     circleCard: {
         backgroundColor: '#FFFFFF',
         height: 184,
         width: 370,
         marginTop: 20,
         marginHorizontal: 20,
         marginBottom: 20,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center',
     },
     circle: {
         width: 110, // Adjust size as needed
         height: 110,
         borderRadius: 100,  // Half of width/height to make it a circle
         justifyContent: 'center',
         alignItems: 'center',
         right:30,
         bottom:100
       },
       circleOutline: {
         borderWidth: 10,
         borderColor: '#99CE90', 
       },
       circleFill: {
         width: 95, // Slightly smaller than the outline
         height: 95,
         borderRadius: 90,
         backgroundColor: '#4E7C29',
       },
     cardImage: {
         height: 184,
         width: 380,
         borderRadius: 20,

     },
     sectionTitle: {
         fontWeight: 'bold',
         marginTop: 20,
         marginLeft: 20,
         fontSize: 18,
     },
     info: {
         textAlign: 'center',
         marginTop: 20,
     },
     item: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
       },
       label: {
         fontSize: 14, // Adjust font size as needed
         marginLeft:160,
         bottom:2,
         top:10,
       },
       value: {
         fontSize: 15, // Adjust font size as needed
         fontWeight: 'bold',
         marginLeft:160,
         bottom:10,
         top:10,
       },

 });