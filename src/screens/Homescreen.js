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
import {useSelector, useDispatch} from 'react-redux';
import getUsers from '../actions/fetch';

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
  const [endIndex, setEndIndex] = useState(10);
  const data = useSelector(state => state);
  console.log(data[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <View style={{justifyContent: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>Home Screen</Text>
      {data.length ? (
        <FlatList
          data={data.slice(0, endIndex)}
          renderItem={({item}) => {
            return <NameItem navigation={navigation} data={item} />;
          }}
          onEndReached={() => {
            setEndIndex(prev => {
              return prev + 10 > data.length ? data.length : prev + 10;
            });
          }}
          onEndReachedThreshold={0.9}
          keyExtractor={item => item.login.uuid}
        />
      ) : (
        <ActivityIndicator />
      )}
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
