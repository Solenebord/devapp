import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={{ flexDirection:'row', width:'100%', justifyContent:'center', marginTop: 10 }}>
      <TextInput
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{ height: 80, width:200, borderColor: 'tomato', borderWidth: 1, marginBottom: 10, paddingLeft: 10, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, }}
      />
      <TouchableOpacity
      style={{
        alignItems: 'center',  
        justifyContent: 'center', 
        width: 150,  
        height: 80,  
        backgroundColor: 'tomato',  
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      }}
      onPress={handleSearch}
    >
  <Text style={{ textAlign: 'center', color: 'white' }}>Search</Text>
</TouchableOpacity>
    </View>
  );
};

export default SearchBar;
