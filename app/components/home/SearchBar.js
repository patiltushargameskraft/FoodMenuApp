import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MenuItems from '../restaurantDetail/MenuItems';
import RestaurantItems from './RestaurantItems';
import axios from 'axios'
import BottomTabs from './BottomTabs';
import { Divider } from 'react-native-elements';

const API_ENDPOINT = `http://localhost:3000/search`;

export default function App({navigation, searchType}) {
  const [isLoading, setIsLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const typeName = ['dishName', 'cuisine', 'dishCat', 'dishDesc', 'resName'];
  useEffect(() => {
      const query = {
        [typeName[searchType]]: (searchQuery === null ? '': searchQuery)
      }
      axios.post(API_ENDPOINT, query)
        .then(results => {
          if(typeName[searchType] === 'resName'){
            setRestaurant(results.data);
          }else{
            setFoods(results.data);
          }
        })
  }, [searchQuery, searchType]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <ScrollView showsVerticalScrollIndicator={false}>
    {typeName[searchType] === 'resName' ? <RestaurantItems restaurantData = {restaurants} navigation={navigation} /> : <MenuItems foods = {foods}/>}
    </ScrollView>
      <Divider width={1} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});

// import React from 'react';
// /* eslint-disable react-native/no-inline-styles */
// import {View, Text} from 'react-native';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// AntDesign.loadFont().then();
// Ionicons.loadFont().then();

// export default function SearchBar({cityHandler}) {
//   return (
//     <View style={{marginTop: 15, flexDirection: 'row'}}>
//       <GooglePlacesAutocomplete
//         query={{key: 'AIzaSyATiAqIXBARofRD2apZcPQ1eEWZPH4fPV4'}}
//         onPress={(data, details = null) => {
//           console.log(data.description);
//           const city = data.description.split(',')[0];
//           cityHandler(city);
//         }}
//         placeholder="Search"
//         styles={{
//           textInput: {
//             backgroundColor: '#eee',
//             borderRadius: 20,
//             fontWeight: '700',
//             marginTop: 7,
//           },
//           textInputContainer: {
//             backgroundColor: '#eee',
//             borderRadius: 50,
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginRight: 10,
//           },
//         }}
//         renderLeftButton={() => (
//           <View style={{marginLeft: 10}}>
//             <Ionicons name="location-sharp" size={24} />
//           </View>
//         )}
//         renderRightButton={() => (
//           <View
//             style={{
//               flexDirection: 'row',
//               marginRight: 8,
//               backgroundColor: 'white',
//               padding: 9,
//               borderRadius: 30,
//               alignItems: 'center',
//             }}>
//             <AntDesign name="clockcircle" size={11} style={{marginRight: 6}} />
//             <Text>Search</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
