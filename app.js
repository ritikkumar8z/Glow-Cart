// Provide it in App.js
import { Provider } from 'react-redux';
import AppNavigator from './navigation';
import { store } from './redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}