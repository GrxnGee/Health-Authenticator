import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../../../Firebase';
import { Card } from 'react-native-paper';
import { collection, getDoc, query, where, arrayUnion, doc, setDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function FoodDetails() {
    const [foodItems, setFoodItems] = useState([]);
    const route = useRoute();
    const { fname } = route.params;
    const user = auth.currentUser;
    const navigation = useNavigation();
    useEffect(() => {
        const getFoodData = async () => {
            try {
                const foodCollection = collection(db, 'food');
                const fnameQuery = query(foodCollection, where('fname', '==', fname));
                const querySnapshot = await getDocs(fnameQuery);
                const fetchResult = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setFoodItems(fetchResult);
            } catch (error) {
                console.error("Error fetching food data: ", error);
                alert('Failed to fetch food data.');
            }
        };

        getFoodData();
    }, [fname]);

    const UpdateMeal = async (food) => {
        const userMealPlanDoc = doc(db, 'mealPlans', user.uid);

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

    const goBack = () => {
        navigation.navigate('Food');
    };
    
    const pressAdd = async (food) => {
        await UpdateMeal(food);
        setTimeout(() => {
            goBack();
        }, 2000);
      };
    return (
        <SafeAreaView>
            {foodItems.map((food) => (
                <View key={food.id} style={{ alignItems: 'center' }}>
                    <View style={styles.fname}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{food.fname}</Text>
                    </View>
                    <Card style={styles.cardoutside}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: food.picUrl }} style={{ width: 200, height: 200, borderRadius: 8, margin: 10 }} />

                            <Card style={styles.cardinside}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#50A966', textAlign: 'center' }}>Ingredient</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#453131', textAlign: 'left' }}>{food.ifood}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFC85C', textAlign: 'center', marginRight: 5 }}>{food.cal}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Calorie</Text>
                                </View>

                            </Card>
                            <View style={{ margin: 20 }}>
                                <TouchableOpacity style={styles.button} onPress={() => pressAdd(food)}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 17 }}>Add to meal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Card>
                </View>
            ))}
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
        width: 115,
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
