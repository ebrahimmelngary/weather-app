import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import axios from 'axios';

import styles from './home.styles';
import { Base_URL } from '../../api/api';
import { SearchResponse } from '../../types';

const Home = () => {
  const [searchText, setSearchText] = useState<string>();
  const [response, setResponse] = useState<SearchResponse>();
  // http://api.weatherapi.com/v1
  console.log('====================================');
  console.log('searchText', searchText);
  console.log('====================================');

  const forecast = async () =>
    await axios
      .get(`${Base_URL}&q=${searchText}`)
      .then((res: SearchResponse) => setResponse(res.data));

  useMemo(async () => {
    forecast();
    await axios
      .get(`${Base_URL}&q=${searchText}`)
      .then((res: SearchResponse) => setResponse(res.data));
  }, [searchText]);

  // console.log('https://www.weatherapi.com' + response?.current?.condition.icon);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTextStyle}>Weather</Text>
      <TextInput
        value={searchText}
        placeholder="Search for a city"
        style={styles.textInputStyle}
        onChangeText={setSearchText}
      />
      <Text>{response?.location?.name}</Text>
      <Text>{response?.location?.country}</Text>
      <Text>{response?.current?.condition?.text}</Text>
      <Image
        source={{
          uri:
            'https://www.weatherapi.com/' + response?.current?.condition.icon,
        }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default Home;
