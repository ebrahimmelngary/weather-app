import React, {FC, useCallback} from 'react';
import {FlatList, Image, Text, View} from 'react-native';

import {Hour} from '../../types';
import styles from './ForecastList.styles';

type Props = {
  data: Hour[];
};

const ForecastList: FC<Props> = ({data}) => {
  const renderForecastItems = useCallback(
    ({item, index}: {item: Hour; index: number}) => {
      return (
        <View
          key={index.toString()}
          style={styles.cardStyle}
          testID="forecast-item">
          <Image
            source={{uri: 'https:' + item.condition.icon}}
            style={styles.imageStyle}
          />
          <Text>{item.condition.text}</Text>
          <Text>{new Date(item?.time)?.toLocaleTimeString()}</Text>
        </View>
      );
    },
    [],
  );

  const key_Extractor = useCallback(
    (item: Hour) => item?.time_epoch + 'item',
    [],
  );

  return (
    <FlatList
      numColumns={3}
      data={data}
      windowSize={5}
      removeClippedSubviews={false}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={renderForecastItems}
      keyExtractor={key_Extractor}
      testID="ForecastList"
    />
  );
};

export default ForecastList;
