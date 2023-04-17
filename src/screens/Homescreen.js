import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import Global from '../../Global';
import axios from 'axios';

const NameItem = ({navigation, data}) => {
  return (
    <Pressable
      style={styles.profileButton}
      onPress={() => {
        navigation.navigate('Profile', {data});
      }}>
      <Image
        source={{uri: data.picture.thumbnail}}
        style={{height: 30, aspectRatio: 1, borderRadius: 50}}
      />
      <Text style={{marginLeft: 10}}>{data.name.first}</Text>
    </Pressable>
  );
};

export default function Homescreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [endIndex, setEndIndex] = useState(10);
  useEffect(() => {
    axios
      .get(Global.API_URL)
      .then(response => {
        setLoading(false);
        setData(response.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{justifyContent: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>Home Screen</Text>
      <FlatList
        data={data ? data.slice(0, endIndex) : null}
        renderItem={({item}) => {
          return <NameItem navigation={navigation} data={item} />;
        }}
        ListFooterComponent={
          loading ? <ActivityIndicator size={'large'} /> : null
        }
        onEndReached={() => {
          if (data) {
            setEndIndex(prev => {
              if (data.length - 10 > prev) {
                return prev + 10;
              } else {
                return data.length;
              }
            });
          }
        }}
        onEndReachedThreshold={0.9}
        keyExtractor={item => item.login.uuid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    backgroundColor: '#f2f2f2',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#222',
    flexDirection: 'row',
    padding: 10,
  },
});
