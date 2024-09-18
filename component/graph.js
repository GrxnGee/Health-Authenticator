import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { db, auth } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const screenWidth = Dimensions.get("window").width;

export default function ExerciseChart() {
  const [exerciseData, setExerciseData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const bmiDocRef = doc(db, "bmi", user.uid);
          const docSnap = await getDoc(bmiDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const exercises = data.exercises || [];

            // Sort exercises by the 'day' field in descending order
            exercises.sort((a, b) => {
              const dateA = a.day.toDate ? a.day.toDate() : new Date(a.day);
              const dateB = b.day.toDate ? b.day.toDate() : new Date(b.day);
              return dateB - dateA; 
            });

            // Get only the last 5 days
            const recentExercises = exercises.slice(0, 5);

            const weights = [];
            const days = [];

            recentExercises.forEach(exercise => {
              if (exercise.day && exercise.weight) {
                const exerciseDay = exercise.day.toDate ? exercise.day.toDate() : new Date(exercise.day);
                weights.push(exercise.weight);
                days.push(exerciseDay.toLocaleDateString());
              } else {
                console.warn('Missing day or weight in exercise:', exercise);
              }
            });

            console.log('Weights:', weights);
            console.log('Days:', days);

            setExerciseData(weights);
            setLabels(days);
          } else {
            console.warn("Document does not exist.");
          }
        } else {
          console.warn("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching exercise data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
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
                strokeWidth: 2, // optional
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
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
