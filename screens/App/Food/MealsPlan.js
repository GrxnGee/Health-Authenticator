import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../../../Firebase';
import { Card } from 'react-native-paper';
import { getDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function MealsPlan({ navigation }) {
    const [mealPlan, setMealPlan] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                if (user) {
                    const mealPlanRef = doc(db, 'mealPlans', user.uid);
                    const docSnap = await getDoc(mealPlanRef);

                    if (docSnap.exists()) {
                        setMealPlan(docSnap.data().meals || []);
                        console.log(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("No user signed in.");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchMealPlan();
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    style={styles.FoodButton}
                    onPress={() => navigation.navigate('Food')}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.homeButtonText}>Food List</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#4A9B5D', marginRight: 20 }}>Meal</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'black' }}>Food List</Text>
                </View>

                {mealPlan && mealPlan.length > 0 ? (
                    mealPlan.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Card style={styles.card}>
                                <Image source={{ uri: item.picUrl }} style={{ width: 155, height: 135, borderRadius: 8 }} />
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{item.fname}</Text>
                            </Card>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No meals found in your plan.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    card: {
        height: 200,
        width: 350,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    FoodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
    },
    homeButtonText: {
        marginLeft: 5,
        fontSize: 18,
    },
});
