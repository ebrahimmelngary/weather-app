import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { AxiosResponse } from 'axios';
import { useDebounce } from 'use-debounce';

import styles from './home.styles';
import { Base_URL } from '../../api/api';
import { SearchResponse } from '../../types';
import { Images } from '../../constants';
import instance from '../../utils/axios';
import ForecastList from '../../components/ForecastList/ForecastList';
import Input from '../../components/Input/Input';
import { COLORS } from '../../common/colors';



export const getCountryResult = async (searchText: string) => await instance
  .get(`${Base_URL}&q=${searchText}`)

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AxiosResponse<SearchResponse>>();

  const [debouncedSearchText] = useDebounce(searchText, 500);

  useMemo(async () => {
    if (debouncedSearchText && debouncedSearchText?.length > 2) {
      setIsLoading(true);
      getCountryResult(searchText).then((res: AxiosResponse<SearchResponse>) => setResults(res));;
      setIsLoading(false);
    }
  }, [debouncedSearchText]);

  const currentHour = new Date().toLocaleTimeString();
  const newApiDate = useMemo(() => results?.data?.forecast?.forecastday[0]?.hour?.filter(i => new Date(i.time_epoch * 1000).getHours() >= new Date().getHours()), [results]);


  return (
    <ImageBackground
      source={Images.backGroundImage}
      style={styles.imageBackGroundStyle}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextStyle} testID='weather'>Weather</Text>
        <Text style={styles.hourTextStyle}>{currentHour}</Text>
      </View>
      <Input
        id="inputId"
        value={searchText}
        placeholder="Search for a city"
        onChangeText={setSearchText}
      />

      {isLoading ? <ActivityIndicator testID='loader' color={COLORS.spaceGray} size={'large'} style={styles.loaderStyle} /> : null}

      <View style={styles.weatherStatusContainer}>
        <View style={styles.countryContainer}>
          <Text style={styles.countryTextStyle}>{results?.data?.location?.name}</Text>
          <Text style={styles.countryTextStyle}>{results?.data?.location?.country}</Text>
        </View>
        <Image
          testID='weatherImage'
          source={{
            uri: 'https:' + results?.data?.current?.condition?.icon,
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.conditionTextStyle}>{results?.data?.current?.condition?.text}</Text>
      </View>

      <ForecastList data={newApiDate as []} />
    </ImageBackground>
  );
};

export default Home;
