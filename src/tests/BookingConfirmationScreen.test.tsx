import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('BookingConfirmationScreen', () => {
  const initialState = {
    doctors: { data: [{ id: '1', name: 'Dr. Test' }] },
    bookings: { bookings: [] },
  };
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders booking info correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BookingConfirmationScreen
          route={
            {
              params: { doctorId: '1', date: '2026-01-20', startTime: '10:00' },
            } as any
          }
          navigation={{ navigate: jest.fn() } as any}
        />
      </Provider>,
    );

    expect(getByText(/Dr. Test/i)).toBeTruthy();
    expect(getByText(/2026-01-20/i)).toBeTruthy();
    expect(getByText(/10:00/i)).toBeTruthy();
  });

  it('alerts on double booking', () => {
    store = mockStore({
      doctors: { data: [{ id: '1', name: 'Dr. Test' }] },
      bookings: [
        { doctorName: 'Dr. Test', date: '2026-01-20', startTime: '10:00' },
      ],
    });

    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { getByText } = render(
      <Provider store={store}>
        <BookingConfirmationScreen
          route={
            {
              params: { doctorId: '1', date: '2026-01-20', startTime: '10:00' },
            } as any
          }
          navigation={{ navigate: jest.fn() } as any}
        />
      </Provider>,
    );

    fireEvent.press(getByText(/Confirm Booking/i));
    expect(alertMock).toHaveBeenCalled();
  });
});
