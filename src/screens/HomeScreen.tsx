import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ShiftCare</Text>
        <Text style={styles.subtitle}>Doctor Appointment Scheduler</Text>
      </View>

      {/* Cards */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DoctorsList')}
        activeOpacity={0.85}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons name="medical-services" size={26} color="#2196F3" />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Browse Doctors</Text>
          <Text style={styles.cardDesc}>
            Find doctors and book available slots
          </Text>
        </View>

        <MaterialIcons name="chevron-right" size={28} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MyBookings')}
        activeOpacity={0.85}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons name="event-available" size={26} color="#4CAF50" />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>My Bookings</Text>
          <Text style={styles.cardDesc}>View your booked appointments</Text>
        </View>

        <MaterialIcons name="chevron-right" size={28} color="#BDBDBD" />
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <MaterialIcons name="cloud-off" size={16} color="#888" />
        <Text style={styles.footerText}>Offline bookings supported</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F7FA',
  },

  header: {
    marginTop: 40,
    marginBottom: 36,
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#212121',
  },

  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },

  cardDesc: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  footerText: {
    fontSize: 12,
    color: '#888',
  },
});
