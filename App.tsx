import "./global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./navigations/appNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
