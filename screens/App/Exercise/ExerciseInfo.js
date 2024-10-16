import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function ExerciseInfo() {
  const route = useRoute();
  const navigation = useNavigation();
  const { Exname, ExnameTH, IEx, IExTH, picUrl, cat } = route.params;
  const { i18n } = useTranslation();
  const [currentExname, setCurrentExname] = useState(Exname);
  const [currentDescription, setCurrentDescription] = useState(IEx);
  
  // Mapping categories to Thai
  const categoryTranslations = {
    'Weight Training': 'เวทเทรนนิ่ง',
    'Stretching': 'การยืดกล้ามเนื้อ',
    'Cardio': 'คาร์ดิโอ'
  };

  const [currentCat, setCurrentCat] = useState(cat);

  useEffect(() => {
    setCurrentExname(i18n.language === 'th' ? (ExnameTH || Exname) : Exname);
    setCurrentDescription(i18n.language === 'th' ? (IExTH || IEx) : IEx);
    setCurrentCat(i18n.language === 'th' ? categoryTranslations[cat] || cat : cat);
  }, [i18n.language, Exname, ExnameTH, IEx, IExTH, cat]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.navHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('ExerciseCat', { category: cat })}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>{currentCat}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{currentExname}</Text>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: picUrl }} style={styles.image} />
          <Text style={styles.description}>{currentDescription}</Text>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingTop: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryPill: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A9B5D',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: '40%', 
    height: '9%', 
    marginLeft: '7%',  
  },
  categoryText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden', 
    numberOfLines: 1,  
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: '5%',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
