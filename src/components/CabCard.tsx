import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Cab {
  companyName: string;
  carModel: string;
}

interface Props {
  cab: Cab;
  onPress: () => void;
}

const CabCard: React.FC<Props> = ({ cab, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Text style={styles.companyName}>{cab.companyName}</Text>
        <Text style={styles.carModel}>{cab.carModel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFC107', 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    padding: 16,
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
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
});

export default CabCard;
