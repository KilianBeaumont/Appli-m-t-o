import WeatherApp from './component/weather';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import AlataRegular from './assets/font/Alata-Regular.ttf';
import {useFonts} from 'expo-font';

export default function App() {

  const [isFontLoaded] = useFonts({
    "Alata-Regular" : AlataRegular
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {isFontLoaded ? <WeatherApp /> : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

