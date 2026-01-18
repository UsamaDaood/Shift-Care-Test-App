import React from 'react';
import { render } from '@testing-library/react-native';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('MyBookingsScreen', () => {
  it('renders empty state correctly', () => {
    const store = mockStore({ bookings: { bookings: [] } });

    const { getByText } = render(
      <Provider store={store}>
        <MyBookingsScreen />
      </Provider>,
    );

    expect(getByText(/No Bookings Yet/i)).toBeTruthy();
  });

  it('renders list of bookings', () => {
    const store = mockStore({
      bookings: {
        bookings: [
          {
            id: '1',
            doctorName: 'Dr. Test',
            date: '2026-01-20',
            startTime: '10:00',
          },
        ],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MyBookingsScreen />
      </Provider>,
    );

    expect(getByText(/Dr. Test/i)).toBeTruthy();
    expect(getByText(/2026-01-20/i)).toBeTruthy();
    expect(getByText(/10:00/i)).toBeTruthy();
  });
});
