import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth, db } from '../../Firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from "firebase/auth";

export default function Profile() {
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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login'); 
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            {userInfo ? (
                <>
                    <Text style={styles.headerText}>Profile</Text>
                    <View style={styles.profileSection}>
                        <Image
                            source={userInfo.gender === 'Female' ? require('../../assets/female.png') : require('../../assets/male.png')}
                            style={styles.profileImage}
                        />
                        <Text style={styles.nameText}>{userInfo.name}</Text>
                        <Text style={styles.infoText}>{userInfo.phoneNumber}</Text>
                        <Text style={styles.infoText}>{userInfo.email}</Text>
                    </View>
                    <View style={styles.menuSection}>
                        
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="lock-closed-outline" size={24} color="#ff8c00" />
                            <Text style={styles.menuText}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name="settings-outline" size={24} color="#ff8c00" />
                            <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Icon name="log-out-outline" size={24} color="#ff8c00" />
                            <Text style={styles.menuText}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    headerText: {
      color: '#4A9B5D',
      fontWeight: 'bold',
      fontSize: 35,
       textAlign: 'center',
      marginBottom: 30,
     marginTop: 30,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    menuSection: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 20,
        marginLeft: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        marginLeft: 20,
        fontSize: 16,
        color: '#333',
    },
});