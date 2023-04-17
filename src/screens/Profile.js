import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

export default function Profile({navigation, route}) {
  const {data} = route.params;
  console.log(JSON.stringify(data, null, 1));
  return (
    <>
      <View style={{padding: 10, flexDirection: 'row'}}>
        <Image
          source={{uri: data.picture.large}}
          style={{height: 100, aspectRatio: 1, borderRadius: 50}}
        />
        <View style={{paddingLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>
            {data.name.first} {data.name.last}
          </Text>
          <Text>{data.gender}</Text>
          <Text>{data.cell}</Text>
          <Text>
            Address: {data.location.street.number} {data.location.street.name}
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: '#000',
          marginTop: 10,
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{color: '#fff'}}>BACK</Text>
      </Pressable>
    </>
  );
}
