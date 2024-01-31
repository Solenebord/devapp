import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'normal':
        return 'lightgrey';
      case 'fighting':
        return 'chocolate';
      case 'flying':
        return 'powderblue';
      case 'poison':
        return 'mediumpurple';
      case 'ground':
        return 'sienna';
      case 'rock':
        return 'tan';
      case 'bug':
        return 'yellowgreen';
      case 'ghost':
        return 'slateblue';
      case 'steel':
        return 'darkgrey';
      case 'fire':
        return 'crimson';
      case 'water':
        return 'dodgerblue';
      case 'grass':
        return 'limegreen';
      case 'electric':
        return 'gold';
      case 'psychic':
        return 'hotpink';
      case 'ice':
        return 'cyan';
      case 'dragon':
        return 'royalblue';
      case 'dark':
        return 'dimgrey';
      case 'fairy':
        return 'plum';
      case 'shadow':
        return 'grey';
      default:
        return 'white';
    }
  };

  // formater le poids pour l'afficher en kg
  const formatWeight = (weight) => {
    const weightString = weight.toString();
    if (weightString.length === 1) {
      return `0.${weightString}`;
    } else {
      const formattedWeight = weightString.slice(0, -1) + '.' + weightString.slice(-1);
      return formattedWeight;
    }
  };

  // formater la taille pour l'afficher en m
  const formatHeight = (height) => {
    const heightString = height.toString();
    if (heightString.length === 1) {
      return `0.${heightString}`;
    } else {
      const formattedHeight = heightString.slice(0, -1) + '.' + heightString.slice(-1);
      return formattedHeight;
    }
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightsalmon', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, width: '100%'}}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', }}>#{pokemon.id}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
          <Icon name={isFavorite ? 'star' : 'star-outline'} size={50} color="gold" />
        </TouchableOpacity>
        </View>

        <Image
          style={{ width: 250, height: 250 }}
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
        />
        
        

      </View>
      <View style={{borderBottomLeftRadius : 1000,  borderBottomRightRadius : 1000, backgroundColor: 'lightsalmon', width: '100%', height: 200}}>
      <Text style={{ marginTop: 50, margin: 10, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
      </View>

      <View style={{ flexDirection: 'row', width:'100%',  justifyContent: 'center' }}>
        {pokemon.types.map((type) => (
          <View key={type.type.name} style={{ backgroundColor: getTypeColor(type.type.name), paddingHorizontal:30, paddingVertical:10, marginVertical: 30, marginHorizontal:10, borderRadius: 20 }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {type.type.name}
          </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
      <Text style={{ fontSize: 18, }}>Weight: {formatWeight(pokemon.weight)}kg</Text>
      <Text style={{ fontSize: 18, }}>Height: {formatHeight(pokemon.height)}m</Text>
      </View>
      
      <Text style={{textAlign:'center', fontSize: 18, fontWeight: 'bold'}}>Abilities:</Text>
      {pokemon.abilities.map(ability => (
        <Text key={ability.ability.name} style={{textAlign:'center', fontSize: 18, marginVertical:10}}>-{ability.ability.name}-</Text>
      ))}

      <View style={{backgroundColor:'lightsalmon', borderTopLeftRadius:50, borderTopRightRadius:50, marginTop:20, paddingBottom:20}}>
        <Text style={{textAlign:'center', fontSize: 18, fontWeight: 'bold', marginTop:20}}>Stats:</Text>
        <View style={{ flexDirection: 'row', width:'100%', justifyContent: 'space-around', marginVertical:10, paddingHorizontal:20 }}>
          {pokemon.stats.slice(0, 3).map(stat => (
            <View key={stat.stat.name} style={{ padding: 5, }}>
              <Text style={{fontWeight:'bold'}}>{stat.stat.name}:</Text>
              <Text>{stat.base_stat}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', width:'100%', justifyContent: 'space-around', marginVertical:10, paddingHorizontal:20 }}>
          {pokemon.stats.slice(3, 6).map(stat => (
            <View key={stat.stat.name} style={{ padding: 5 }}>
              <Text style={{fontWeight:'bold'}}>{stat.stat.name}:</Text>
              <Text>{stat.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>

      
    </ScrollView>
  );
};

export default PokemonDetailScreen;
