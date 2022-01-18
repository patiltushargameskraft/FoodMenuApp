/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Counter from 'react-native-counters';

import {
  Button,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AddOnItem from './AddOnItem';

const addon = [
  {
    id : 1,
    title: 'Extra',
    description: 'Cheese',
    price: '$0',
    image:
      'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
  
    },
  {
    id : 2,
    title: 'Sauce',
    description: '🔥',
    price: '$0',
    image: 'https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg',
  },
  {
    id : 3,
    title: 'Random',
    description:'Santa',
    price: '$0',
    image:
      'https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg',
  },
  
];

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



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
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
 
  const selectItem = (item, number, type) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{id: item.id, qty: number, addons: [], price: 10},
        restaurantName: restaurantName,
      },
    });

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find(item => item.id === food.id));
    const [visible, setVisible] = React.useState(false);
    const [isLoading,setloading]=React.useState(true);
  return (
    

    <ScrollView showsVerticalScrollIndicator={false}>
 
 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
        <AddOnItem  addon={addon} />
        <Text style={{marginVertical: 20, fontSize: 50, textAlign: 'center'}}>
        <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>Done</Text>
            </TouchableOpacity>
        </Text>
        </View>
      </ModalPoup>     
    </View>


      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>  ) : 
            ( <Counter
                // onPress={() => {setVisible(true),setloading(false)}}
    onChange={(number, type) => {setVisible(true),selectItem(food, number, type)}}

              /> )
            }   
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
      
          </View>
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
  <View style={{width: 240, justifyContent: 'space-evenly', marginLeft: 10}}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({marginLeft, ...props}) => (
  <View>
    <Image
      source={{uri: props.food.image}}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
