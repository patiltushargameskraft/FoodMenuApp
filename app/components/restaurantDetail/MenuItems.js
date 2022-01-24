/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Button} from 'react-native-elements/dist/buttons/Button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {modifyItemInCartThunk} from '../../redux/reducers/cartReducer';

export default function MenuItems({foods, marginLeft, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [addOn, setAddOn] = useState([]);
  const [selectedAddOn, setSelectedAddOn] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const {restaurantId: resIdInCart} = useSelector(
    state => state.cartReducer.selectedItems,
  );
  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const createTwoButtonAlert = food =>
    Alert.alert(
      'Your Cart has Items from a Different Restaurant',
      'Empty Cart and Proceed',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setSelectedAddOn([]);
            setSelectedFood(null);
            setModalVisible(false);
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            getAddOn(food.id)
              .then(res => {
                const addons = res.data.data;
                if (addons.length) {
                  setAddOn(addons);
                  setSelectedFood(food);
                  setModalVisible(true);
                } else {
                  const foodWithAddons = food;
                  foodWithAddons.addons = [];
                  selectItem(foodWithAddons, 1, '+');
                  setSelectedAddOn([]);
                }
              })
              .catch(err => {
                throw err;
              });
          },
        },
      ],
    );

  const dispatch = useDispatch();

  const selectItem = (item, number, counterType) => {
    if (counterType === '-') {
      navigation.navigate('ViewCart');
      return;
    }
    dispatch(
      modifyItemInCartThunk(item, number, counterType, item.restaurant_id),
    );
  };

  const isFoodInCart = foodId => {
    let count = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (foodId === cartItems[i].dish_id) {
        count += cartItems[i].quantity;
      }
    }
    return count;
  };

  const dishCount = foods.map(food => isFoodInCart(food.id));

  const getAddOn = foodId => {
    return axios.get(
      `https://food-menu-app-backend.herokuapp.com/dish/getAddons/${foodId}`,
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignContent: 'center',
              }}>
              <Button
                title="+"
                buttonStyle={{
                  backgroundColor: '#000',
                  marginTop: 30,
                  marginRight: 5,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  console.log(
                    'resIdIncCart',
                    resIdInCart,
                    'foodRes',
                    food.restaurant_id,
                  );
                  if (resIdInCart && resIdInCart !== food.restaurant_id) {
                    createTwoButtonAlert(food);
                  } else {
                    getAddOn(food.id)
                      .then(res => {
                        const addons = res.data.data;
                        if (addons.length) {
                          setAddOn(addons);
                          setSelectedFood(food);
                          setModalVisible(true);
                        } else {
                          const foodWithAddons = food;
                          foodWithAddons.addons = [];
                          selectItem(foodWithAddons, 1, '+');
                          setSelectedAddOn([]);
                        }
                      })
                      .catch(err => {
                        throw err;
                      });
                  }
                }}
              />
              <Text style={{margin: 5, color: 'black'}}>
                {dishCount[index]}
              </Text>
              <Button
                title="-"
                buttonStyle={{
                  backgroundColor: '#000',
                  marginTop: 30,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  selectItem(food, 1, '-');
                }}
              />
            </View>
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          {modalVisible ? (
            <Modal style={{flex: 1}}>
              <SafeAreaView>
                <View style={{marginBottom: 20}}>
                  <View>
                    <Text
                      style={{
                        padding: 10,
                        backgroundColor: '#000',
                        color: '#fff',
                        alignSelf: 'center',
                      }}>
                      Please Select Add Ons
                    </Text>
                  </View>
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
                        }}
                      />
                    </View>
                  ))}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Text style={{color: 'black'}}>
                      Note: A minimum of {selectedFood.min_addon} and A maximum
                      of {selectedFood.max_addon} addons
                    </Text>
                    <Text style={{color: 'black'}}>
                      need to be selected to proceed for order
                    </Text>
                  </View>
                  <Button
                    buttonStyle={{backgroundColor: '#000', margin: 10}}
                    title="Back"
                    onPress={() => {
                      setSelectedAddOn([]);
                      setModalVisible(false);
                    }}
                  />
                  <Button
                    buttonStyle={{backgroundColor: '#000', margin: 10}}
                    title="Done"
                    onPress={() => {
                      if (
                        selectedAddOn.length < selectedFood.min_addon ||
                        selectedAddOn.length > selectedFood.max_addon
                      ) {
                        alert(
                          `Note: A minimum of ${selectedFood.min_addon} and A maximum of ${selectedFood.max_addon} addons can be selected`,
                        );
                        return;
                      }
                      const foodWithAddons = selectedFood;
                      foodWithAddons.addons = selectedAddOn;
                      foodWithAddons.addons.sort((a, b) => a.id - b.id);
                      setModalVisible(false);
                      selectItem(foodWithAddons, 1, '+');
                      setSelectedAddOn([]);
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
    <Text style={{color: 'black'}}>{props.food.description}</Text>
    <Text style={{color: 'black'}}>{props.food.price}</Text>
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
    color: 'black',
    fontSize: 19,
    fontWeight: '600',
  },
});
