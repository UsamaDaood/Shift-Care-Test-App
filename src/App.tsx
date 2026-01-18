import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './navigation/AppNavigator';
import { useBookingsPersistence } from './hooks/useBookingsPersistence';

const Root: React.FC = () => {
  useBookingsPersistence(); // ✅ hook called inside rendered component
  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root /> {/* render the component that calls your hook */}
      </PersistGate>
    </Provider>
  );
}
