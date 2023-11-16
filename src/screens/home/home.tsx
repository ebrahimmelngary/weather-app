import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';

import styles from './home.styles';
import {Images} from '../../constants';
import ForecastList from '../../components/ForecastList/ForecastList';
import Input from '../../components/Input/Input';
import {COLORS} from '../../common/colors';
import {useHome} from './useHome';

const Home = () => {
  const {searchText, setSearchText, isLoading, results, resultDates} =
    useHome();

  return (
    <ImageBackground
      source={Images.backGroundImage}
      style={styles.imageBackGroundStyle}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextStyle} testID="weather">
          Weather
        </Text>
      </View>
      <Input
        testID="inputId"
        value={searchText}
        placeholder="Search for a city"
        onChangeText={setSearchText}
      />

      {isLoading ? (
        <ActivityIndicator
          testID="loader"
          color={COLORS.spaceGray}
          size={'large'}
          style={styles.loaderStyle}
        />
      ) : null}

      <View style={styles.weatherStatusContainer}>
        <View style={styles.countryContainer}>
          <Text style={styles.countryTextStyle}>
            {results?.data?.location?.name}
          </Text>
          <Text style={styles.countryTextStyle}>
            {results?.data?.location?.country}
          </Text>
        </View>
        <Image
          testID="weatherImage"
          source={{
            uri: 'https:' + results?.data?.current?.condition?.icon,
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.conditionTextStyle}>
          {results?.data?.current?.condition?.text}
        </Text>
      </View>

      <ForecastList data={resultDates as []} />
    </ImageBackground>
  );
};

export default Home;
