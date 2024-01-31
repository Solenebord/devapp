// PokedexKantoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './components/SearchBar.js';

const PokedexKantoScreen = () => {
  const navigation = useNavigation();
  const [kantoPokemon, setKantoPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [numColumns, setNumColumns] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalKantoPokemon, setTotalKantoPokemon] = useState(0);

 
  useEffect(() => {
    const fetchTotalKantoPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setTotalKantoPokemon(response.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de Pokémon de Kanto:', error.message);
      }
    };

    fetchTotalKantoPokemon();
  }, []);


  const fetchKantoPokemon = async () => {
    try {
      if (isFetching) return;
      setLoading(true);
      setIsFetching(true);
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=${kantoPokemon.length}`);
      const kantoPokemonUrls = response.data.results;

      const kantoPokemonDetails = await Promise.all(
        kantoPokemonUrls.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          return pokemonDetailsResponse.data;
        })
      );

      setKantoPokemon((prevPokemon) => [...prevPokemon, ...kantoPokemonDetails]);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données Pokémon de Kanto:', error.message);
      setLoading(false);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    console.log('Fetching Kanto Pokemon...');
    fetchKantoPokemon();
  }, [offset]);

  useEffect(() => {
    console.log('Kanto Pokemon updated:', kantoPokemon.length);
  }, [kantoPokemon]);

  const handleLoadMore = () => {
    if (kantoPokemon.length >= totalKantoPokemon || isFetching) {
      console.log('Tous les Pokémon de Kanto ont été chargés ou le chargement est en cours.');
      return;
    }

    // Charger plus de Pokémon lorsque l'utilisateur atteint la fin de la liste
    setOffset((prevOffset) => prevOffset + 5);
  };

  const handleSearch = (query) => {
    const filteredResults = kantoPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log('Filtered Results:', filteredResults);
    setFilteredPokemon(filteredResults);
  };


  const renderItem = ({ item }) => {
    //const pokemonData = kantoPokemon.find(pokemon => pokemon.name === item.name);
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
        /* style={{ flex: 1,
          padding: 0,
          width: '100%',
          borderRadius: 10,
          margin: 0,
          backgroundColor: 'lightpink', }} */
      >
        <View style={{ flex: 1,
        padding: 5,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius:100,
        margin: 10,
        marginRight: 0,
        backgroundColor: 'lightblue',
        alignItems: 'center', 
        
        
        }}>
          <Image
            style={{ width: 100, height: 100 }}
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
    <View style={{ flex: 1, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        style={{ width: '100%' }}
        data={filteredPokemon.length > 0 ? filteredPokemon : kantoPokemon}
        renderItem={renderItem} 
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text>Loading...</Text>}
      />
    </View>
  );
};

export default PokedexKantoScreen;
