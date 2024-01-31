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
        onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}>
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, borderBottomLeftRadius: 100, borderTopLeftRadius:100, margin: 10, marginRight: 0, backgroundColor: 'lightsalmon', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>#{item.id}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ fontSize: 30, textAlign:'center', marginVertical:20, fontWeight: 'bold'  }}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style ={{ marginBottom: 80}}
      />
    </View>
  );
};

export default TeamScreen;
