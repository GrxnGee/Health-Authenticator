import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../../Firebase";
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";

const Barcode = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { foodData, imageUri } = route.params; 
  const [loading, setLoading] = useState(false); 
  const user = auth.currentUser;

  const UpdateMeal = async (food) => {
    const userMealPlanDoc = doc(db, "mealPlans", user.uid);

    try {
      const docSnapshot = await getDoc(userMealPlanDoc);
      setLoading(true);

      if (docSnapshot.exists()) {
        // Update existing meal plan
        await updateDoc(userMealPlanDoc, {
          foodItems: arrayUnion(food),
        });
      } else {

        await setDoc(userMealPlanDoc, {
          foodItems: [food],
        });
      }

      Alert.alert("Success", "Food item added to your meal plan!");
    } catch (error) {
      console.error("Error updating meal plan: ", error);
      Alert.alert("Error", "Failed to add food item to your meal plan.");
    } finally {
      setLoading(false);
    }
  };

  const pressAdd = async () => {
    const foodToAdd = {
    fname: foodData.product_name,
      cal: foodData.nutriments?.["energy-kcal_serving"] || "N/A",
      picUrl: foodData.image_url,
    };
    
    await UpdateMeal(foodToAdd);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.navHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Scanner" }],
              })
            }
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>Scanner</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{foodData.product_name}</Text>
        </View>

        <View style={styles.card}>
          {foodData.image_url && (
            <Image source={{ uri: foodData.image_url }} style={styles.image} />
          )}

          <Text style={styles.description}>
            ยี่ห้อ: {foodData.brands ? foodData.brands : "ไม่พบชื่อสินค้า"}
          </Text>
          <Text style={styles.description}>
            ชื่อสินค้า:{" "}
            {foodData.product_name ? foodData.product_name : "ไม่พบชื่อสินค้า"}
          </Text>

          <Text style={styles.description}>
            พลังงาน:{" "}
            {foodData.nutriments?.["energy-kcal_serving"]
              ? `${foodData.nutriments["energy-kcal_serving"]} kcal`
              : "ไม่พบข้อมูล"}
          </Text>

          <Text style={styles.description}>
            น้ำตาล:{" "}
            {foodData.nutriments?.sugars
              ? `${foodData.nutriments.sugars} g`
              : "ไม่พบข้อมูล"}
          </Text>
          <Text style={styles.description}>
            ไขมัน:{" "}
            {foodData.nutriments?.fat
              ? `${foodData.nutriments.fat} g`
              : "ไม่พบข้อมูล"}
          </Text>
          <Text style={styles.description}>
            โปรตีน:{" "}
            {foodData.nutriments?.proteins
              ? `${foodData.nutriments.proteins} g`
              : "ไม่พบข้อมูล"}
          </Text>

          
        </View>
        <View style={{ margin: 20 , alignItems: "center",}}>
            <TouchableOpacity
              style={styles.button}
              onPress={pressAdd}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Adding..." : "Add to meal"}
              </Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 30,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingTop: 0,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryPill: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A9B5D",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: "40%",
    height: "9%",
    marginLeft: "7%",
  },
  categoryText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: "5%",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 8,
  },
  button: {
    height: 50,
    width: 115,
    backgroundColor: "#387647",
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
});

export default Barcode;
