import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DoctorsListScreen } from '../screens/DoctorsListScreen';
import { DoctorDetailScreen } from '../screens/DoctorDetailScreen';
import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParamList = {
  DoctorsList: undefined;
  HomeScreen: undefined;
  DoctorDetail: { doctorId: string };
  BookingConfirmation: {
    doctorId: string;
    date: string;
    startTime: string;
  };
  MyBookings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="DoctorsList" component={DoctorsListScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
      />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
