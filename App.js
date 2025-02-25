import './gesture-handler';
import { StatusBar } from 'react-native';
import Navigator from './src';
import useThemeStore from './src/stores/useThemeStore';

export default function App() {
  const { themeTag } = useThemeStore();
  return (
    <>
      <StatusBar barStyle={themeTag==='light'? 'dark-content':'light-content'} />
      <Navigator />
    </>
  );
}