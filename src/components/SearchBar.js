// SearchBar.js
import React, { useState } from 'react';
import { TextInput, View, Button } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View>
      <TextInput
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;
