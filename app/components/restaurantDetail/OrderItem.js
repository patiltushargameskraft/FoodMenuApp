/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const total = item => {
  let cost = 0,
    addonCost = 0;
  cost += item.price * item.quantity;
  addonCost += item.addons
    .map(addon => addon.price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);
  return [cost, addonCost];
};;

export default function OrderItem({item}) {
  const {id, price, name} = item;
  console.log('addons in order Item', item.addons);
  return (
    <View>
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#999',
        }}>
        <Text style={{fontWeight: '600', fontSize: 16, margin: 2}}>
          {name} {item.quantity > 1 ? `x ${item.quantity}` : null}
        </Text>
        <Text style={{opacity: 0.7, fontSize: 16, margin: 2}}>
          ₹ {renderTotal(total(item))}
        </Text>
        <Text>Addons applied: </Text>
      </View>
      <FlatList
        horizontal
        data={item.addons}
        renderItem={({item: rowData}) => {
          return (
            <TouchableOpacity activeOpacity={0.5}>
              <Card>
                <Text style={{marginBottom: 10}}>{rowData.name}</Text>
                <Text>₹ {rowData.price}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const renderTotal = total => {
  console.log('render Total', total);
  return (
    <Text>
      {total[0]} {total[1] ? `+ ${total[1]}` : null}{' '}
    </Text>
  );
};
