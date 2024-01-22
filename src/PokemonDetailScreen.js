// PokemonDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';





const PokemonDetailScreen = ({ route }) => {
  const { pokemon } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Vérifier si le Pokémon est déjà en favori
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await getFavorites();
      const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error('Erreur lors de la vérification des favoris:', error.message);
    }
  };

  const getFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      return favoritesString ? JSON.parse(favoritesString) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error.message);
      return [];
    }
  };

  const toggleFavorite = async () => {
    try {
      let favorites = await getFavorites();

      if (isFavorite) {
        // Retirer le Pokémon des favoris
        favorites = favorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        // Ajouter le Pokémon aux favoris
        favorites.push(pokemon);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error.message);
    }
  };

  return (
    <View>
        <TouchableOpacity onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'star' : 'star-outline'} size={30} color="gold" />
      </TouchableOpacity>

      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
      />
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.name}</Text>
      <Text>Types: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
      <Text>Poids: {pokemon.weight}</Text>
      <Text>Taille: {pokemon.height}</Text>
      


      <Text>Forms: {pokemon.forms.map(form => form.name).join(', ')}</Text>
      
      
      
      <Text>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</Text>
      
      <Text>Stats:</Text>
      {pokemon.stats.map(stat => (
        <Text key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</Text>
      ))}

    </View>
  );
};

export default PokemonDetailScreen;
