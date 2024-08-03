
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebaseConfig';

type RootStackParamList = {
  CabDetail: { cabId: string };
  CabsList: undefined;
};

type CabDetailScreenRouteProp = RouteProp<RootStackParamList, 'CabDetail'>;
type CabDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CabDetail'>;

interface Cab {
  id: string;
  companyName: string;
  carModel: string;
  costPerHour: number;
  passengerCapacity: number;
  rating: number;
  bookingStatus: boolean;
}

interface Props {
  route: CabDetailScreenRouteProp;
  navigation: CabDetailScreenNavigationProp;
}

const CabDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { cabId } = route.params;
  const [cab, setCab] = useState<Cab | null>(null);
  const [bookedCabs, setBookedCabs] = useState<Cab[]>([]);

  useEffect(() => {
    const fetchCab = async () => {
      try {
        const docRef = doc(firestore, 'cabs', cabId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCab({ id: docSnap.id, ...docSnap.data() } as Cab);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching cab:', error);
      }
    };

    const fetchBookedCabs = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'cabs'));
        const booked = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Cab))
          .filter(cab => cab.bookingStatus);

        setBookedCabs(booked);
      } catch (error) {
        console.error('Error fetching booked cabs:', error);
      }
    };

    fetchCab();
    fetchBookedCabs();
  }, [cabId]);

  const handleBookCab = async () => {
    try {
      if (bookedCabs.length >= 2) {
        Alert.alert('Booking Limit Reached', 'You cannot book more than 2 cabs.');
        return;
      }

      if (cab && !cab.bookingStatus) {
        await updateDoc(doc(firestore, 'cabs', cabId), { bookingStatus: true });
        await addDoc(collection(firestore, 'userBookings'), { cabId });
        Alert.alert('Success', 'Cab booked successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Already Booked', 'This cab is already booked.');
      }
    } catch (error) {
      console.error('Error booking cab:', error);
      Alert.alert('Error', 'Failed to book the cab.');
    }
  };

  if (!cab) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Cab Details</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.info}>{cab.companyName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.info}>{cab.carModel}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Capacity:</Text>
          <Text style={styles.info}>{cab.passengerCapacity}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.info}>{cab.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cost/hour:</Text>
          <Text style={styles.info}>${cab.costPerHour}</Text>
        </View>
        <Button title="Book Now" onPress={handleBookCab} color="#FF4C4C" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFC107', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D32F2F', 
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
    color: '#388E3C',
  },
  info: {
    fontSize: 16,
    color: '#333', 
  },
});

export default CabDetailScreen;
