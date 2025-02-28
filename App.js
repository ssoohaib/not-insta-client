import './gesture-handler';
import { StatusBar, View } from 'react-native';
import Navigator from './src';
import useThemeStore from './src/stores/useThemeStore';
import { OTPScreen, ProfileScreen } from './src/screens';

export default function App() {
  const { themeTag } = useThemeStore();
  return (
    <>
      <StatusBar barStyle={themeTag==='light'? 'dark-content':'light-content'} />
      <View style={{flex:1, paddingTop:64}}>
        {/* <Navigator /> */}
        {/* <OTPScreen /> */}
        <ProfileScreen />
        
      </View>
    </>
  );
}