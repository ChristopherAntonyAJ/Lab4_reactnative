import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { collection, onSnapshot, doc, getDoc, updateDoc, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebaseConfig';
import MyCabItem from '../components/MyCabItem';

interface Cab {
  id: string;
  companyName: string;
  carModel: string;
  costPerHour: number;
  passengerCapacity: number;
  rating: number;
  bookingStatus: boolean;
}

const MyCabScreen: React.FC = () => {
  const [bookedCabs, setBookedCabs] = useState<Cab[]>([]);

  useEffect(() => {
    const userBookingsQuery = collection(firestore, 'userBookings');
    const unsubscribe = onSnapshot(userBookingsQuery, async (snapshot) => {
      const bookings = snapshot.docs.map(doc => doc.data().cabId as string);

      const cabsPromises = bookings.map(async (cabId) => {
        const docRef = doc(firestore, 'cabs', cabId);
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() } as Cab;
        } else {
          console.log(`No document found for cabId: ${cabId}`);
          return null;
        }
      });

      const cabs = (await Promise.all(cabsPromises)).filter((cab): cab is Cab => cab !== null);
      setBookedCabs(cabs);
    });

    return () => unsubscribe();
  }, []);

  const handleCancelBooking = async (cabId: string) => {
    try {
      const userBookingQuery = query(collection(firestore, 'userBookings'), where('cabId', '==', cabId));
      const userBookingSnapshot = await getDocs(userBookingQuery);
      userBookingSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const cabDocRef = doc(firestore, 'cabs', cabId);
      await updateDoc(cabDocRef, { bookingStatus: false });

      Alert.alert('Success', 'Booking cancelled.');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      Alert.alert('Error', 'Failed to cancel the booking.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookedCabs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MyCabItem
            cab={item}
            onCancel={() => handleCancelBooking(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
});

export default MyCabScreen;
