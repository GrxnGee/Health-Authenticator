import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const BarcodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setFoodData(null);
    }, [])
  );

  const fetchFoodData = async (barcode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data && data.product) {
        setFoodData(data.product);
        navigation.navigate('InfoScanner', { foodData: data.product });
      } else {
        alert("ไม่พบข้อมูลอาหาร");
        setFoodData(null);
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
      setFoodData(null);
    } finally {
      setLoading(false);
      setScanned(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      fetchFoodData(data);
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.text}>กำลังขอสิทธิ์การเข้าถึงกล้อง...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>ไม่สามารถเข้าถึงกล้องได้</Text>;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>BarcodeScanner</Text>


      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>

      {loading && <Text style={styles.text}>กำลังโหลดข้อมูล...</Text>}
      {!foodData && !loading && <Text style={styles.text}>สแกนบาร์โค้ดเพื่อดูข้อมูลอาหาร</Text>}
      
     
      <TouchableOpacity
        style={styles.loadingIcon}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Scanner' }],
          })
        }
      >
        <Ionicons 
          name="reload-sharp" 
          size={50} 
          color="#f5f5f5" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scannerContainer: {
    width: '100%', 
    height: 200,   
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150, 
  },
  scanner: {
    height: '100%', 
    width: '100%',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  loadingIcon: {
    marginTop: 40, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(56, 118, 71, 0.9)', 
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
    borderWidth: 2,
    borderColor: 'rgba(56, 118, 71, 1)', 
  },
  header: {
    fontSize: 28,           
    fontWeight: 'bold',
    color: 'rgba(0, 128, 0, 0.7)',         
    textAlign: 'center',       
    paddingVertical: 15,      
      

    width: '100%', 
    marginTop: 40, 
  },
});

export default BarcodeScannerScreen;
