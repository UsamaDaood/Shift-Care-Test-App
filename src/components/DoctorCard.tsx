import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

/* ---------- Types ---------- */

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
};

type Props = {
  item: Doctor;
  bookings?: {
    doctorName: string;
  }[];
};

/* ---------- Helpers ---------- */

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const COLORS = [
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#9C27B0',
  '#009688',
  '#3F51B5',
];

const getAvatarColor = (name: string) => COLORS[name.length % COLORS.length];

/* ---------- Component ---------- */

const DoctorCard: React.FC<Props> = ({ item, bookings = [] }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const bookedCount = useMemo(() => {
    return bookings.filter(b => b.doctorName === item.name).length;
  }, [bookings, item.name]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
        navigation.navigate('DoctorDetail', {
          doctorId: item.id,
        })
      }
    >
      {/* Avatar */}
      <View
        style={[styles.avatar, { backgroundColor: getAvatarColor(item.name) }]}
      >
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>

      {/* Info */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.row}>
          <MaterialIcons name="local-hospital" size={16} color="#616161" />
          <Text style={styles.specialty} numberOfLines={1}>
            {item.specialty}
          </Text>
        </View>

        {bookedCount > 0 && (
          <View style={styles.badge}>
            <MaterialIcons name="event-busy" size={14} color="#D32F2F" />
            <Text style={styles.badgeText}>
              {bookedCount} slot
              {bookedCount > 1 ? 's' : ''} booked
            </Text>
          </View>
        )}
      </View>

      {/* Arrow */}
      <MaterialIcons name="chevron-right" size={28} color="#9E9E9E" />
    </TouchableOpacity>
  );
};

export default DoctorCard;

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  specialty: {
    marginLeft: 6,
    fontSize: 13,
    color: '#616161',
    fontWeight: '500',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FDECEA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },

  badgeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#D32F2F',
  },
});
