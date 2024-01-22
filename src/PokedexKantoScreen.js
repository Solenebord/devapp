// PokedexKantoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PokedexKantoScreen = () => {
  const navigation = useNavigation();
  const [kantoPokemon, setKantoPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchKantoPokemon = async () => {
      try {
        setLoading(true);
        // Appel à l'API pour obtenir la liste des Pokémon de Kanto
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const kantoPokemonUrls = response.data.results;

        const kantoPokemonDetails = await Promise.all(
          kantoPokemonUrls.map(async (pokemon) => {
            const pokemonDetailsResponse = await axios.get(pokemon.url);
            return pokemonDetailsResponse.data;
          })
        );

        

        // Mise à jour de l'état avec les données des Pokémon de Kanto
        // setKantoPokemon(kantoPokemonDetails);
        setKantoPokemon((prevPokemon) => [...prevPokemon, ...kantoPokemonDetails]);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données Pokémon de Kanto:', error.message);
        setLoading(false);
      }
    };

    // setOffset(0);

    // Appel de la fonction
    fetchKantoPokemon();
  }, []);

    const handleLoadMore = () => {
      // Charger plus de Pokémon lorsque l'utilisateur atteint la fin de la liste
      
        setOffset((prevOffset) => prevOffset + 5);
        
    };

  const renderItem = ({ item }) => {
    //const pokemonData = kantoPokemon.find(pokemon => pokemon.name === item.name);
    
    return (
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
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={kantoPokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text>Loading...</Text>}
      />
    </View>
  );
};

export default PokedexKantoScreen;
