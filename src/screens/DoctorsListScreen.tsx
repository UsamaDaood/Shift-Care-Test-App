import React, { useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchDoctors } from '../store/doctorsSlice';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import DoctorCard from '../components/DoctorCard';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DoctorsList'
>;

export const DoctorsListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.doctors);
  const allBookings = useAppSelector(state => state.bookings.bookings);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // 🔄 Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading doctors...</Text>
      </View>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="error-outline" size={32} color="#D32F2F" />
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // 📭 Empty
  if (data.length === 0) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="medical-services" size={36} color="#9E9E9E" />
        <Text style={styles.empty}>No doctors available</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const doctorBookings = allBookings.filter(
          b => b.doctorName === item.name, // ✅ using name (no doctorId in response)
        );

        return <DoctorCard item={item} bookings={doctorBookings} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#F5F7FA',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  specialty: {
    marginLeft: 6,
    color: '#757575',
    fontSize: 13,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  badgeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  loadingText: {
    marginTop: 8,
    color: '#555',
  },

  empty: {
    marginTop: 8,
    color: '#757575',
  },

  error: {
    marginTop: 8,
    color: '#D32F2F',
    textAlign: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
