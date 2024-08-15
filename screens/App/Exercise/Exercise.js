import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ExerciseCategories() {
  const navigation = useNavigation();

  const navigateToCategory = (category) => {
    navigation.navigate('ExerciseCat', { category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Exercise Categories</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigateToCategory('Weight Training')}>
          <ImageBackground
            source={require('../../../assets/Exercise/Weight Training.jpg')} 
            style={styles.image}
            imageStyle={styles.imageBorder}
          >
            <Text style={styles.cardText}>Weight Training</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigateToCategory('Stretching')}>
          <ImageBackground
            source={require('../../../assets/Exercise/Stretching.jpg')} 
            style={styles.image}
            imageStyle={styles.imageBorder}
          >
            <Text style={styles.cardText}>Stretching</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigateToCategory('Cardio')}>
          <ImageBackground
            source={require('../../../assets/Exercise/Cardio.jpg')} 
            style={styles.image}
            imageStyle={styles.imageBorder}
          >
            <Text style={styles.cardText}>Cardio</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
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
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  imageBorder: {
    borderRadius: 15,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 128, 0, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
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