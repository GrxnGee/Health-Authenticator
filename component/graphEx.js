import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { db, auth } from '../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const screenWidth = Dimensions.get("window").width;

export default function ExChart() {
  const [exerciseData, setExerciseData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const bmiDocRef = doc(db, "todayex", user.uid);

      const unsubscribe = onSnapshot(bmiDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const exercises = data.exercises || [];

          // Sort exercises by 'day' field in descending order
          exercises.sort((a, b) => {
            const dateA = a.day.toDate ? a.day.toDate() : new Date(a.day);
            const dateB = b.day.toDate ? b.day.toDate() : new Date(b.day);
            return dateA - dateB; 
          });

          // Create a map to combine calories for the same day
          const caloriesByDay = {};

          exercises.forEach(exercise => {
            if (exercise.day && exercise.cal) {
              const exerciseDay = exercise.day.toDate ? exercise.day.toDate() : new Date(exercise.day);
              const formattedDay = exerciseDay.toLocaleDateString('en-US');

              // If the day is already in the map, add the calories to the existing value
              if (caloriesByDay[formattedDay]) {
                caloriesByDay[formattedDay] += exercise.cal;
              } else {
                caloriesByDay[formattedDay] = exercise.cal;
              }
            } else {
              console.warn('Missing day or calories in exercise:', exercise);
            }
          });

          // Convert the map to arrays for chart data
          const calories = Object.values(caloriesByDay);
          const days = Object.keys(caloriesByDay);

          console.log('Calories:', calories);
          console.log('Days:', days);

          setExerciseData(calories); // Set combined calories data
          setLabels(days);
          setLoading(false);
        } else {
          console.warn("Document does not exist.");
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.chartContainer}>
        <ActivityIndicator size="large" color="#e26a00" />
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      {exerciseData.length > 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: exerciseData,
                strokeWidth: 2, 
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text>No exercise data available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});
