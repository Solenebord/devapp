// PokedexKantoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios';

const PokedexKantoScreen = () => {
  const [kantoPokemon, setKantoPokemon] = useState([]);

  useEffect(() => {
    const fetchKantoPokemon = async () => {
      try {
        // Appel à l'API pour obtenir la liste des Pokémon de Kanto
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const kantoPokemonData = response.data.results;

        // Mise à jour de l'état avec les données des Pokémon de Kanto
        setKantoPokemon(kantoPokemonData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données Pokémon de Kanto:', error.message);
      }
    };

    // Appel de la fonction
    fetchKantoPokemon();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 20, borderRadius: 10, margin: 10, backgroundColor: 'lightblue' }}>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/').slice(-2, -1)}.png` }}
      />
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={kantoPokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
      />
    </View>
  );
};

export default PokedexKantoScreen;
