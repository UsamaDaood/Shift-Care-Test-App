import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DoctorCard from '../components/DoctorCard';

describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. Test',
    specialty: 'Cardiology',
  };

  const mockBookings = [
    { doctorName: 'Dr. Test', date: '2026-01-20', startTime: '09:00' },
  ];

  it('renders doctor info correctly', () => {
    const { getByText } = render(
      <DoctorCard
        item={mockDoctor}
        bookings={mockBookings}
        navigation={{ navigate: jest.fn() } as any}
      />,
    );

    expect(getByText('Dr. Test')).toBeTruthy();
    expect(getByText('Cardiology')).toBeTruthy();
    expect(getByText(/1 slot booked/i)).toBeTruthy();
  });

  it('does not show booking badge when no bookings', () => {
    const { queryByText } = render(
      <DoctorCard
        item={mockDoctor}
        bookings={[]}
        navigation={{ navigate: jest.fn() } as any}
      />,
    );
    expect(queryByText(/slot booked/i)).toBeNull();
  });

  it('calls navigation on press', () => {
    const mockNavigate = jest.fn();
    const { getByTestId } = render(
      <DoctorCard
        item={mockDoctor}
        bookings={[]}
        navigation={{ navigate: mockNavigate } as any}
      />,
    );

    fireEvent.press(getByTestId('doctor-card'));
    expect(mockNavigate).toHaveBeenCalledWith('DoctorDetail', {
      doctorId: '1',
    });
  });
});
