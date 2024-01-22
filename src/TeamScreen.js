// TeamScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const TeamScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Charger les favoris à partir du stockage local
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
        style={{ padding: 20, borderRadius: 10, margin: 10, backgroundColor: 'lightblue' }}
      >
        <View style={{ padding: 20, borderRadius: 10, margin: 10, backgroundColor: 'lightblue' }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }}
          />
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.name}</Text>
          <Text>{item.id}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
    <View>
      <Text>Mes Favoris</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TeamScreen;
