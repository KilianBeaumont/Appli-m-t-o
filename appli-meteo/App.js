import WeatherApp from './component/weather';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <WeatherApp />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

