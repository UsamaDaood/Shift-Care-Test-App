import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { generateSlots } from '../utils/slotGenerator';
import { getNext7Days } from '../utils/dates';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector } from '../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorDetail'>;

export const DoctorDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { doctorId } = route.params;

  /* -------------------- HOOKS (TOP ONLY) -------------------- */

  const doctor = useAppSelector(state =>
    state.doctors.data.find(d => d.id === doctorId),
  );

  const { bookings, hydrated } = useAppSelector(state => state.bookings);

  const days = useMemo(() => getNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(days[0].date);

  const slots = useMemo(() => {
    if (!doctor) return [];

    const dayName = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
    });

    const windows = doctor.availability.filter(w => w.day_of_week === dayName);

    return windows.flatMap(window =>
      generateSlots(doctor.name, selectedDate, window),
    );
  }, [doctor, selectedDate]);

  const isBooked = (startTime: string) =>
    bookings.some(
      b =>
        b.doctorName === doctor?.name &&
        b.date === selectedDate &&
        b.startTime === startTime,
    );

  /* -------------------- SAFE RETURNS -------------------- */

  if (!hydrated) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 8 }}>Loading bookings...</Text>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.center}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <View style={styles.container}>
      {/* Doctor Header */}
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={28} color="#fff" />
        </View>

        <View>
          <Text style={styles.title}>{doctor.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="schedule" size={14} color="#E3F2FD" />
            <Text style={styles.subTitle}> {doctor.timezone}</Text>
          </View>
        </View>
      </View>

      {/* Date Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
      >
        {days.map(day => {
          const selected = day.date === selectedDate;

          return (
            <TouchableOpacity
              key={day.date}
              onPress={() => setSelectedDate(day.date)}
              style={[styles.dateChip, selected && styles.dateChipSelected]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}
              >
                <MaterialIcons
                  name="event"
                  size={16}
                  color={selected ? '#fff' : '#555'}
                />
                <Text
                  style={[styles.dateText, selected && styles.dateTextSelected]}
                >
                  {day.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Slots */}
      {slots.length === 0 ? (
        <View style={styles.emptyBox}>
          <MaterialIcons name="event-busy" size={42} color="#9E9E9E" />
          <Text style={styles.noSlots}>No slots available</Text>
        </View>
      ) : (
        <FlatList
          data={slots}
          keyExtractor={item => item.startTime}
          renderItem={({ item }) => {
            const booked = isBooked(item.startTime);

            return (
              <TouchableOpacity
                disabled={booked}
                onPress={() =>
                  navigation.navigate('BookingConfirmation', {
                    doctorId,
                    date: selectedDate,
                    startTime: item.startTime,
                    endTime: item.endTime,
                  })
                }
                style={[
                  styles.slotCard,
                  booked ? styles.slotBooked : styles.slotAvailable,
                ]}
              >
                <View style={styles.slotLeft}>
                  <MaterialIcons
                    name="access-time"
                    size={20}
                    color={booked ? '#9E9E9E' : '#2196F3'}
                  />
                  <Text
                    style={[styles.slotText, booked && styles.slotTextBooked]}
                  >
                    {item.startTime} – {item.endTime}
                  </Text>
                </View>

                {booked ? (
                  <View style={styles.bookedBadge}>
                    <MaterialIcons name="lock" size={14} color="#D32F2F" />
                    <Text style={styles.bookedLabel}>BOOKED</Text>
                  </View>
                ) : (
                  <MaterialIcons
                    name="chevron-right"
                    size={26}
                    color="#4CAF50"
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F7FA' },

  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    marginBottom: 16,
    elevation: 4,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  subTitle: { color: '#E3F2FD', marginLeft: 4 },

  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
  },

  dateChipSelected: { backgroundColor: '#2196F3' },

  dateText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
    lineHeight: 18, // ✅ prevents clipping
  },

  dateTextSelected: { color: '#fff', fontWeight: '600' },

  slotCard: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  slotAvailable: { backgroundColor: '#fff' },
  slotBooked: { backgroundColor: '#F1F1F1' },

  slotLeft: { flexDirection: 'row', alignItems: 'center' },
  slotText: { marginLeft: 10, fontSize: 15, fontWeight: '500' },
  slotTextBooked: { color: '#9E9E9E' },

  bookedBadge: { flexDirection: 'row', alignItems: 'center' },
  bookedLabel: {
    marginLeft: 4,
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 12,
  },

  emptyBox: { marginTop: 48, alignItems: 'center' },
  noSlots: { marginTop: 10, color: '#757575', fontSize: 14 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
