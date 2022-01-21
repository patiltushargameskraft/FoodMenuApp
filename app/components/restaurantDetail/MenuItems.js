/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  catStyle: {
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
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
  const [selectedAddOn, setSelectedAddOn] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const dispatch = useDispatch();

  const selectItem = (item, number, counterType) => {
    if (counterType === '-') {
      navigation.navigate('ViewCart');
      return;
    }
    console.log('item in selected Item', item);
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{id: item.id, qty: number, addons: selectedAddOn, price: item.price},
        restaurantId: item.restaurant_id,
        counterType: counterType,
      },
    });

    setSelectedAddOn([]);
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
          {/* <Text style={styles.catStyle}>{food.cat}</Text> */}
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
                onPress={async () => {
                  setSelectedFood(food);
                  getAddOn(food.id);
                  setModalVisible(true);
                  let newArr = counter;
                  counter[index] = counter[index] + 1;
                  setCounter([...newArr]);
                  console.log('counter increased: ', counter[index]);
                }}
              />
              <Text>{counter[index] ? counter[index] : 0}</Text>
              <Button
                title="-"
                style={{backgroundColor: '#000', marginTop: 30}}
                onPress={() => {
                  selectItem(food, 1, '-');
                }}
              />
            </View>
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          {addOn.length && modalVisible ? (
            <Modal>
              <SafeAreaView>
                <View>
                  <Text
                    style={{
                      padding: 10,
                      backgroundColor: '#000',
                      color: '#fff',
                    }}>
                    Please Select Add Ons
                  </Text>
                  {addOn.map((item, index) => (
                    <View key={index}>
                      <BouncyCheckbox
                        size={30}
                        fillColor="green"
                        unfillColor="#FFFFFF"
                        text={item.name}
                        iconStyle={{borderColor: 'green', margin: 10}}
                        onPress={isChecked => {
                          if (isChecked) {
                            setSelectedAddOn([...selectedAddOn, item]);
                          } else {
                            setSelectedAddOn([
                              ...selectedAddOn.filter(
                                addOnItem => addOnItem.id !== item.id,
                              ),
                            ]);
                          }
                          console.log('Addon Items: ', selectedAddOn);
                        }}
                      />
                    </View>
                  ))}
                  <Button
                    style={{backgroundColor: '#000', margin: 10}}
                    title="Done"
                    onPress={() => {
                      setModalVisible(false);
                      selectItem(selectedFood, 1, '+');
                    }}
                  />
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
