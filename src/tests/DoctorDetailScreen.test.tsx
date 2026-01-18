import React from 'react';
import { render } from '@testing-library/react-native';
import { DoctorDetailScreen } from '../screens/DoctorDetailScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getNext7Days } from '../utils/dates';

const mockStore = configureStore([]);

describe('DoctorDetailScreen', () => {
  const days = getNext7Days();
  const initialState = {
    doctors: {
      data: [{ id: '1', name: 'Dr. Test', timezone: 'UTC', availability: [] }],
      loading: false,
      error: null,
    },
    bookings: { bookings: [], hydrated: true },
  };
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders doctor header correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DoctorDetailScreen
          route={{ params: { doctorId: '1' } } as any}
          navigation={{} as any}
        />
      </Provider>,
    );

    expect(getByText('Dr. Test')).toBeTruthy();
    expect(getByText('UTC')).toBeTruthy();
  });

  it('shows empty slots if doctor has no availability', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DoctorDetailScreen
          route={{ params: { doctorId: '1' } } as any}
          navigation={{} as any}
        />
      </Provider>,
    );

    expect(getByText(/No slots available/i)).toBeTruthy();
  });

  it('renders error if doctor not found', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DoctorDetailScreen
          route={{ params: { doctorId: '999' } } as any}
          navigation={{} as any}
        />
      </Provider>,
    );

    expect(getByText(/Doctor not found/i)).toBeTruthy();
  });
});
