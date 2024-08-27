import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput ,TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { db } from '../../../Firebase';
import { Card } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Food() {
  const [foodItems, setFoodItems] = useState([]);
  const [categoriesItems, setcategoriesItems] = useState([]);
  const [SearchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchFoodData = async () => {
      const foodCollection = collection(db, 'food');
      const snapshot = await getDocs(foodCollection);
      const foods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFoodItems(foods);
    };

    fetchFoodData();
  }, []);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesCollection = collection(db, 'categories');
      const snapshot = await getDocs(categoriesCollection);
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setcategoriesItems(categories);
    };

    fetchCategoriesData();
  }, []);

  const Search = async () => {
    if (SearchText.trim() === '') {
      setSearchResults([]);
      return;
    }
  
    const foodCollection = collection(db, 'food');
    const fnameQuery = query(foodCollection, where('fname', '==', SearchText));
    const catQuery = query(foodCollection, where('cat', '==', SearchText));
  
    const [fnameSnapshot, catSnapshot] = await Promise.all([
      getDocs(fnameQuery),
      getDocs(catQuery),
    ]);
    const searchResults = [
      ...fnameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ...catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    ];
    const uniqueResults = Array.from(new Map(searchResults.map(item => [item.id, item])).values());
  
    if (uniqueResults.length === 0) {
      console.log("No matching documents.");
      setSearchResults([]);
    } else {
      console.log("Matched documents.");
      setSearchResults(uniqueResults);
    }
  };
  
  const pressFoodpic = (fname) => {
    navigation.navigate('FoodInfo', { fname });
};

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.MealsButton}
          onPress={() => navigation.navigate('MealsPlan')}
        >
          <Ionicons name="clipboard" size={24} color="#50A966" />
          <Text style={styles.MealsButtonText}>Your Plan</Text>
        </TouchableOpacity>

      </View>
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <View style={{ height: 33, marginLeft: 40, marginRight: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: '#397A49', borderRadius: 8, margin:5}}>
          <Ionicons
            name="search-sharp"
            size={20}
            color="white"
            style={{ marginLeft: 10 }}
            onPress={Search}
          />
          <TextInput
            placeholder="SEARCH"
            style={[styles.textBox, { flex: 1 }]}
            keyboardType="default"
            value={SearchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView horizontal={true} style={{margin:15 }}>
          {foodItems.map((food, index) => (
            <Card key={food.id} style={styles.item}>
              <Image source={{ uri: food.picUrl }} style={{ width: 220, height: 135, borderRadius: 8 }} />
            </Card>
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 1, marginLeft: '5%' }}>Categories</Text>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color="black"
            style={{ marginRight: 15, marginTop: 4 }}
            onPress={Search}
          />
        </View>
        <ScrollView horizontal={true} style={{ flexWrap:'wrap', marginLeft: '2%' }}>
          {categoriesItems.map((categorie, index) => (
            <Card key={categorie.id} style={styles.Category}    onPress={() => {setSearchText(categorie.Cname); Search();}}>
              <Image source={{ uri: categorie.Cpic }} style={{ width: 50, height: 50, borderRadius: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', paddingTop:2}}>{categorie.Cname}</Text>
            </Card>
          ))}
        </ScrollView>


        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 1, marginLeft: '5%' }}>Recommended Menu</Text>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color="black"
            style={{ marginRight: 15, marginTop: 4 }}
            onPress={Search}
          />
        </View>

        <FlatList
  data={searchResults.length > 0 ? searchResults : foodItems}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Card key={item.id} style={styles.item2} onPress={() => pressFoodpic(item.fname)}>
      <Image source={{ uri: item.picUrl }} style={{ width: 175, height: 125, borderRadius: 8 }} />
    </Card>
  )}
  numColumns={2}
  columnWrapperStyle={styles.row}
  ListEmptyComponent={() => (
    <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No items found</Text>
    </View>
  )}
/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    width: 220,
    height: 135,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    flex: 2,
    marginRight: 5
  },
  textBox: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#4A9B5D',
    height: 33,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 10,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 0,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  item2: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4, 
    borderRadius: 8,
    width: 175,
    height: 125,
    
  },
  Category: {
    width: 55,
    height: 75,
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    marginRight: 5,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10 
  },
  homeButtonText: {
    fontSize: 18,
    marginLeft: 8 
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  
    padding: 10, 
  },
  homeButtonText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 8, 
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  MealsButton: {
    alignItems: 'center',
    padding: 10,
    marginLeft: '50%' ,
  },
  MealsButtonText: {
    fontSize: 10,
    marginLeft: 8 
  }
});
