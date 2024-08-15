import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../Firebase';
import { Card } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

export default function MealsPlan() {
      const [mealPlanItems, setMealPlanItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMealPlanData = async () => {
            try {
                const user = auth.currentUser;
                const userId = user.uid; 
                const mealPlanCollection = collection(db, 'mealPlans');
                const mealPlanQuery = query(mealPlanCollection, where('userId', '==', userId));
                const querySnapshot = await getDocs(mealPlanQuery);
                const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                setMealPlanItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching meal plan data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlanData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cardoutside: {
        height: 550,
        width: 350,
        backgroundColor: '#FFFFFF',

        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    cardinside: {
        height: 295,
        width: 270,
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 18,
        alignItems: 'center',
    },
    button: {
        height: 50,
        width:115   ,
        backgroundColor: '#387647',
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 20,
    },
    fname: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A9B5D',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        width: 151,
        height: 40,
        marginTop: '25%',
        marginRight: '35%'
    },
});
