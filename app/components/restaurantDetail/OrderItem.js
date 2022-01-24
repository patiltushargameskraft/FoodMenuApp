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
};

export default function OrderItem({item}) {
  const {id, price, name} = item;
  return (
    <View>
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#999',
        }}>
        <Text
          style={{color: 'black', fontWeight: '600', fontSize: 16, margin: 2}}>
          {name} {item.quantity > 1 ? `x ${item.quantity}` : null}
        </Text>
        <Text style={{color: 'black', opacity: 0.7, fontSize: 16, margin: 2}}>
          ₹ {renderTotal(total(item))}
        </Text>
      </View>
      <FlatList
        horizontal
        data={item.addons}
        renderItem={({item: rowData}) => {
          return (
            <TouchableOpacity activeOpacity={0.5} style={{flex: 1}}>
              <Card>
                <Text style={{color: 'black', marginBottom: 10}}>
                  {rowData.name}
                </Text>
                <Text style={{color: 'black'}}>₹ {rowData.price}</Text>
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
  return (
    <Text style={{color: 'black'}}>
      {total[0]} {total[1] ? `+ ${total[1]}` : null}{' '}
    </Text>
  );
};