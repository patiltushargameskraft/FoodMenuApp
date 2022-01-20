/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddOn from './AddOn';

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});

export default function MenuItems({
  restaurantId,
  foods,
  marginLeft,
  navigation,
}) {
  const arr = new Array(10).fill(0);

  const [counter, setCounter] = useState(arr);
  const [modalVisible, setModalVisible] = useState(false);
  const [addOn, setAddOn] = useState([]);

  console.log('Hi ' + counter);
  const dispatch = useDispatch();

  const selectItem = (item, number, counterType) => {
    if (counterType === '-') {
      navigation.navigate('ViewCart');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{id: item.id, qty: number, addons: [], price: item.price},
        restaurantId: restaurantId,
        counterType: counterType,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await Promise.all(
        foods.map(food => {
          return axios
            .get(`http://localhost:3000/dish/getInstancesInCart/1/${food.id}`)
            .then(res => res.data.data[0].count);
        }),
      );
      console.log(response);
      setCounter(response);
    };
    getData();
  }, [foods]);

  const getAddOn = foodId => {
    axios.get(`http://localhost:3000/dish/getAddons/${foodId}`).then(res => {
      setAddOn(res.data.data);
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                title="+"
                style={{
                  backgroundColor: '#000',
                  marginTop: 30,
                  marginRight: 5,
                }}
                onPress={() => {
                  getAddOn(food.id);
                  setModalVisible(true);
                  let newArr = counter;
                  counter[index] = counter[index] + 1;
                  setCounter([...newArr]);
                  selectItem(food, 1, '+');
                  console.log('counter increased: ', counter[index]);
                }}
              />
              <Text>{counter[index]}</Text>
              <Button
                title="-"
                style={{backgroundColor: '#000', marginTop: 30}}
                onPress={() => {
                  // let newArr = counter;
                  // counter[index] = counter[index] - 1;
                  // setCounter([...newArr]);
                  selectItem(food, 1, '-');
                }}
              />
            </View>
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          {modalVisible ? (
            <Modal>
              <SafeAreaView>
                <View>
                  <Button
                    style={{backgroundColor: '#000'}}
                    title="Done"
                    onPress={() => setModalVisible(false)}
                  />
                  {console.log(addOn.length)}
                  {addOn.map((item, index) => (
                    <View key={index}>
                      <Text>{item.name}</Text>
                    </View>
                  ))}
                </View>
              </SafeAreaView>
            </Modal>
          ) : (
            <></>
          )}
          <Divider
            width={0.5}
            orientation="vertical"
            style={{marginHorizontal: 20}}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = props => (
  <View style={{width: 150, justifyContent: 'space-evenly', marginLeft: 10}}>
    <Text style={styles.titleStyle}>{props.food.name}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({marginLeft, ...props}) => (
  <View>
    <Image
      source={{uri: props.food.image_url}}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
