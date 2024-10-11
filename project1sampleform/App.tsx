import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Get from './Components/Get';
import Post from './Components/Post';
import Detail from './Components/Detail';
import SplashScreen from './Components/SplashScreen'; 

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading as true

  useEffect(() => {
    // Simulate a delay to show the splash screen
    const timeout = setTimeout(() => {
      setIsLoading(false); // Hide splash screen after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timeout); // Clean up timeout when the component unmounts
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Show splash screen while loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Get"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#CDE9ED', // Change header background color
          },
          headerTintColor: '#000', // Change header text color
        }}>
        <Stack.Screen name="Home" component={Get}/>
        <Stack.Screen name="Submit" component={Post}/>
        <Stack.Screen name="Detail" component={Detail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
