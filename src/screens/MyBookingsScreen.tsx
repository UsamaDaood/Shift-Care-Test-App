import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../store/hooks';
import { useNavigation } from '@react-navigation/native';

export const MyBookingsScreen = () => {
  const bookings = useAppSelector(state => state.bookings.bookings);
  const navigation = useNavigation();

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="event-busy" size={64} color="#BDBDBD" />
        <Text style={styles.emptyTitle}>No Bookings Yet</Text>
        <Text style={styles.emptySubtitle}>
          Your confirmed appointments will appear here
        </Text>

        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen' as never)}
        >
          <MaterialIcons name="home" size={22} color="#fff" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 90 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={26} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.doctorName}>{item.doctorName}</Text>
                <View style={styles.status}>
                  <MaterialIcons
                    name="check-circle"
                    size={14}
                    color="#4CAF50"
                  />
                  <Text style={styles.statusText}>Confirmed</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <MaterialIcons name="calendar-today" size={20} color="#2196F3" />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={20} color="#FF9800" />
              <Text style={styles.detailText}>{item.startTime}</Text>
            </View>
          </View>
        )}
      />

      {/* Floating Back to Home Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('HomeScreen' as never)}
      >
        <MaterialIcons name="home" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },

  /* Empty State */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#424242',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },

  /* Buttons */
  homeButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 3,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
