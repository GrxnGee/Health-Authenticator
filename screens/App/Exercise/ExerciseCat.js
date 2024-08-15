import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function ExerciseCat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const [exercises, setExercises] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchExercises = async () => {
      const q = query(collection(db, 'exercise'), where('cat', '==', category));
      const querySnapshot = await getDocs(q);
      const fetchedExercises = [];
      querySnapshot.forEach((doc) => {
        fetchedExercises.push(doc.data());
      });
      setExercises(fetchedExercises);
    };

    fetchExercises();
  }, [category]);

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate('ExerciseInfo', { 
        Exname: item.Exname,
        IEx: item.IEx,
        picUrl: item.picUrl,
        cat: item.cat 
      })}
    >
     <View >
    <Image source={{ uri: item.picUrl }} style={styles.exerciseImage} />
    <View style={styles.textOverlay}>
      <Text style={styles.exerciseName}>{item.Exname}</Text>
    </View>
  </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Exercise')}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.homeButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0, 128, 0, 0.7)',
    textAlign: 'left',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'space-between',
  },
  exerciseCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  exerciseImage: {
    width: '100%',
    height: 150,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 128, 0, 0.4)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 0, 
    paddingVertical: 10, 
  },
});