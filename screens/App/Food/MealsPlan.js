import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../../../Firebase';
import { Ionicons } from '@expo/vector-icons';
import { doc, onSnapshot } from 'firebase/firestore';

export default function MealsPlan({ navigation }) {
    const user = auth.currentUser;
    const [mealPlan, setMealPlan] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        if (user) {
            console.log('Current User ID:', user.uid);
            const unsubscribe = onSnapshot(doc(db, 'mealPlans', user.uid), (doc) => {
                if (doc.exists()) {
                    const mealPlanData = doc.data();
                    console.log('Real-time meal plan data:', mealPlanData);
                    setMealPlan(mealPlanData.foodItems || []);
                    const total = (mealPlanData.foodItems || []).reduce((sum, item) => sum + (item.cal || 0), 0);
                    setTotalCalories(total);
                } else {
                    console.log('No meal plan found for user:', user.uid);
                    setMealPlan([]);
                    setTotalCalories(0);
                }
            });
            return () => unsubscribe();
        } else {
            console.log('No user');
        }
    }, [user]);

    const UpdateUserMeal = async (food) => {
        const userMealPlanDoc = doc(db, 'users', user.uid);

        try {
            const docSnapshot = await getDoc(userMealPlanDoc);

            if (docSnapshot.exists()) {
                await updateDoc(userMealPlanDoc, {
                    foodItems: arrayUnion(food)
                });
            } else {
                await setDoc(userMealPlanDoc, {
                    foodItems: [food]
                });
            }

            alert('Added to your meal plan!');
        } catch (error) {
            console.error("Error updating meal plan: ", error);
            alert('Failed to add food item to your meal plan.');
        }
    };

    const PressSaveMealCal = async (food) => {
        await UpdateMeal(food);
        setTimeout(() => {
            goBack();
        }, 2000);
    };

    console.log('Meal plan after setting:', mealPlan);
    console.log('Total calories:', totalCalories);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity
                    style={styles.foodButton}
                    onPress={() => navigation.navigate('Food')}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.homeButtonText}>Food List</Text>
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.headerGreenText}>Meal</Text>
                    <Text style={styles.headerBlackText}>Food List</Text>
                </View>

                {Array.isArray(mealPlan) && mealPlan.length > 0 ? (
                    mealPlan.map((item, index) => (
                        <View key={item.id || index} style={styles.cardContainer}>
                            <View style={styles.Foodcard}>
                                <View style={styles.topRow}>
                                    <Image source={{ uri: item.picUrl }} style={styles.cardImage} />
                                    <Text style={styles.cardText}>{item.fname}</Text>
                                </View>
                                <Text style={styles.calText}>{item.cal} Calories</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noMealsText}>No meals found in your plan.</Text>
                )}

                <View style={styles.calculateCal}>
                    <View style={{ marginTop: 15, marginBottom: 15 }}>
                        {Array.isArray(mealPlan) && mealPlan.length > 0 ? (
                            <>
                                {mealPlan.map((item, index) => (
                                    <View key={item.id || index} style={styles.CalcardContainer}>
                                        <View style={styles.CalRow}>
                                            <Text style={styles.itemName}>{item.fname}</Text>
                                            <Text style={styles.itemCal}>{item.cal}</Text>
                                            <Text style={styles.itemCalories}>Calories</Text>
                                        </View>
                                    </View>
                                ))}
                                <Text style={styles.totalCaloriesText}>Total : {totalCalories} Calories</Text>
                            </>
                        ) : (
                            <Text>No items found</Text>
                        )}
                    </View>
                </View>
                <View style={{ margin: 20 }}>
                    <TouchableOpacity style={styles.button} onPress={() => PressSaveMealCal(totalCalories)}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 17 }}>Add to meal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    foodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    homeButtonText: {
        marginLeft: 5,
        fontSize: 18,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerGreenText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#4A9B5D',
        marginRight: 10,
    },
    headerBlackText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
    },
    cardContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    Foodcard: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 15,
        width: 350,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    cardText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    calText: {
        fontSize: 16,
        color: '#777',
        marginLeft: '40%',
    },
    noMealsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
    calculateCal: {
        backgroundColor: 'white',
        width: 300,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '10%',
    },
    CalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    CalcardContainer: {
        width: '100%',
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    itemName: {
        marginRight: 15,
        fontWeight: 'bold',
        color: '#4A9B5D',
    },
    itemCal: {
        marginRight: 15,
    },
    itemCalories: {
        fontWeight: 'bold',
    },
    totalCaloriesText: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
});
