import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addBooking } from '../store/bookingsSlice';
import { RootStackParamList } from '../navigation/AppNavigator';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>;

export const BookingConfirmationScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { doctorId, date, startTime } = route.params;

  const doctor = useAppSelector(state =>
    state.doctors.data.find(d => d.id === doctorId),
  );

  const bookings = useAppSelector(state => state.bookings.bookings);

  const confirmBooking = () => {
    if (!doctor) return;

    // 🔒 HARD DOUBLE BOOKING CHECK
    const alreadyBooked = bookings.some(
      b =>
        b.doctorId === doctorId && b.date === date && b.startTime === startTime,
    );

    if (alreadyBooked) {
      Alert.alert(
        'Already Booked',
        'This time slot is already booked. Please select another slot.',
      );
      return;
    }

    dispatch(
      addBooking({
        id: uuid(),
        doctorId,
        doctorName: doctor.name,
        date,
        startTime,
      }),
    );

    navigation.replace('MyBookings');
  };

  if (!doctor) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="error-outline" size={48} color="#D32F2F" />
        <Text style={{ marginTop: 8 }}>Invalid booking</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="event-available" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Confirm Appointment</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialIcons name="person" size={22} color="#2196F3" />
          <Text style={styles.label}>Doctor</Text>
          <Text style={styles.value}>{doctor.name}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="calendar-today" size={22} color="#4CAF50" />
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="schedule" size={22} color="#FF9800" />
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{startTime}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoBox}>
        <MaterialIcons name="info-outline" size={18} color="#1976D2" />
        <Text style={styles.infoText}>
          Please confirm your appointment details before proceeding.
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
        <MaterialIcons name="check-circle" size={22} color="#fff" />
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    marginLeft: 8,
    color: '#777',
    width: 70,
    fontSize: 13,
  },

  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },

  infoText: {
    marginLeft: 8,
    color: '#1976D2',
    fontSize: 13,
    flex: 1,
  },

  confirmButton: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
