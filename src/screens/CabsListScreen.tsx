import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebaseConfig';
import CabCard from '../components/CabCard';

type RootStackParamList = {
  CabsList: undefined;
  CabDetail: { cabId: string };
};

type CabsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CabDetail'>;

interface Cab {
  id: string;
  companyName: string;
  carModel: string;
  costPerHour: number;
  passengerCapacity: number;
  rating: number;
}

interface Props {
  navigation: CabsListScreenNavigationProp;
}

const CabsListScreen: React.FC<Props> = ({ navigation }) => {
  const [cabs, setCabs] = useState<Cab[]>([]);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const cabsCollection = collection(firestore, 'cabs');
        const snapshot = await getDocs(cabsCollection);
        const cabsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cab));
        setCabs(cabsList);
      } catch (err) {
        console.error('Error fetching cabs:', err);
      }
    };

    fetchCabs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CabCard
            cab={item}
            onPress={() => navigation.navigate('CabDetail', { cabId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default CabsListScreen;
