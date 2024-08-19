import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseInfo() {
  const route = useRoute();
  const navigation = useNavigation(); // Initialize navigation
  const { Exname, IEx, picUrl, cat } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.navHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('ExerciseCat', { category: cat })}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: picUrl }} style={styles.image} />
        <Text style={styles.title}>{Exname}</Text>
        <Text style={styles.category}>{cat}</Text>
        <Text style={styles.description}>{IEx}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  container: {
    flex: 1,
    padding: 16,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 17,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    color: '#32CD32',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});