import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ displayFlex: 'column', height:'100%', alignItems:'center', justifyContent:'center'}}>
      
      <TouchableOpacity
            style={{
              alignItems: 'center',  
              justifyContent: 'center',  
              width: 300,  
              height: 160,  
              backgroundColor: 'tomato',  
              borderRadius: 30,
              margin: 50,
            }}
            onPress={() => navigation.navigate('Pokedex')}
          >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}>Pokedex</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={{
              alignItems: 'center',  
              justifyContent: 'center',  
              width: 300,  
              height: 160,  
              backgroundColor: 'tomato',  
              borderRadius: 30,
              margin: 50,
            }}
            onPress={() => navigation.navigate('Team')}
          >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 30}}>Team</Text>
      </TouchableOpacity>
      
    </View>
  );
};



export default HomeScreen;
