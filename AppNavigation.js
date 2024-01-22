// AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import PokedexKantoScreen from './src/PokedexKantoScreen';
import TeamScreen from './src/TeamScreen';
import ProfileScreen from './src/ProfileScreen';
import PokemonDetailScreen from './src/PokemonDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Pokedex') {
          iconName = focused ? 'ios-book' : 'ios-book-outline';
        } else if (route.name === 'Team') {
          iconName = focused ? 'ios-briefcase' : 'ios-briefcase-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
   
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Pokedex" component={PokedexKantoScreen} />
    <Tab.Screen name="Team" component={TeamScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabScreen}
          options={{ 
            title: 'Main',
            headerShown: false,
            headerBackTitle: 'Retour',
            headerBackImage: () => (
              <Image
                source={require('./bildad.jpg')}
                style={{ width: 24, height: 24, marginLeft: 10 }}
              />
            ),
          }}
        />
        {/* Vous pouvez ajouter d'autres écrans au stack global si nécessaire */}
        <Stack.Screen name="Pokedex" component={PokedexKantoScreen} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
        <Stack.Screen name="Team" component={TeamScreen} />
      </Stack.Navigator>


    </NavigationContainer>
  );
};

export default AppNavigation;
