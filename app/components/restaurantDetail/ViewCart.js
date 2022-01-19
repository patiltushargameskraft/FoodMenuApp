// /* eslint-disable react-native/no-inline-styles */
// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
// import {Button} from 'react-native-elements/dist/buttons/Button';
// import {ScrollView} from 'react-native-gesture-handler';
// import {useSelector} from 'react-redux';
// import OrderItem from './OrderItem';

// export default function ViewCart({navigation}) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [data, setData] = useState([]);
//   const [total, setTotal] = useState(Number(0));

//   const {items, restaurantId} = useSelector(
//     state => state.cartReducer.selectedItems,
//   );

//   useEffect(() => {
//     console.log('yes');
//     // axios.get('http://localhost:3000/cart/1').then(res => {
//     //   setData(res.data.data);
//     //   setTotal(
//     //     data.map(item => item.price).reduce((prev, curr) => prev + curr, 0),
//     //   );
//     // });
//   }, []);

//   const totalINR = total.toLocaleString('en', {
//     style: 'currency',
//     currency: 'INR',
//   });

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       backgroundColor: 'rgba(0,0,0,0.7)',
//     },

//     modalCheckoutContainer: {
//       backgroundColor: 'white',
//       padding: 16,
//       height: 500,
//       borderWidth: 1,
//     },

//     restaurantName: {
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: 18,
//       marginBottom: 10,
//     },

//     subtotalContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 15,
//     },

//     subtotalText: {
//       textAlign: 'left',
//       fontWeight: '600',
//       fontSize: 15,
//       marginBottom: 10,
//     },
//   });

//   const checkoutModalContent = () => {
//     return (
//       <>
//         <View style={styles.modalContainer}>
//           <ScrollView style={styles.modalCheckoutContainer}>
//             <Text style={styles.restaurantName}>{restaurantId}</Text>
//             <Button
//               style={{backgroundColor: '#000'}}
//               title="view menu"
//               onPress={() => setModalVisible(false)}
//             />
//             {data.map((item, index) => (
//               <OrderItem key={index} item={item} />
//             ))}
//             <View style={styles.subtotalContainer}>
//               <Text style={styles.subtotalText}>Subtotal</Text>
//               <Text>{totalINR}</Text>
//             </View>
//             <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//               <TouchableOpacity
//                 style={{
//                   marginTop: 20,
//                   backgroundColor: 'black',
//                   alignItems: 'center',
//                   padding: 13,
//                   borderRadius: 30,
//                   width: 300,
//                   position: 'relative',
//                 }}
//                 onPress={() => {
//                   navigation.navigate('OrderCompleted');
//                   setModalVisible(false);
//                 }}>
//                 <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
//                 <Text
//                   style={{
//                     position: 'absolute',
//                     right: 20,
//                     color: 'white',
//                     fontSize: 15,
//                     top: 17,
//                   }}>
//                   {total ? totalINR : ''}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </>
//     );
//   };

//   return (
//     <>
//       <Modal
//         animationType="slide"
//         visible={modalVisible}
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}>
//         {checkoutModalContent()}
//       </Modal>
//       {total ? (
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//             position: 'absolute',
//             bottom: 130,
//             zIndex: 999,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               width: '100%',
//             }}>
//             <TouchableOpacity
//               style={{
//                 marginTop: 20,
//                 backgroundColor: 'black',
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 padding: 15,
//                 borderRadius: 30,
//                 width: 300,
//                 position: 'relative',
//               }}
//               onPress={() => setModalVisible(true)}>
//               <Text style={{color: 'white', fontSize: 20, marginRight: 30}}>
//                 View Cart
//               </Text>
//               <Text style={{color: 'white', fontSize: 20}}>{totalINR}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }
