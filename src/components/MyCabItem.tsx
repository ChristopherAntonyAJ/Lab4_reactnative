
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Cab {
  companyName: string;
  carModel: string;
}

interface Props {
  cab: Cab;
  onCancel: () => void;
}

const MyCabItem: React.FC<Props> = ({ cab, onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.companyName}>{cab.companyName}</Text>
          <Text style={styles.carModel}>{cab.carModel}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFEBEE', 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFC107', 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F', 
  },
  carModel: {
    fontSize: 16,
    color: '#388E3C', 
  },
  button: {
    backgroundColor: '#FF4C4C', 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MyCabItem;

