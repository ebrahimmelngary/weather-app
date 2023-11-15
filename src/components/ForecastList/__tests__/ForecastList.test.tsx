import React from 'react';
import { render, cleanup } from '@testing-library/react-native';

import ForecastList from '../ForecastList';
import { MockData } from '../MockData';

describe('ForecastList', () => {
  afterEach(cleanup);
  it('should match snapshot', () => {
    const { toJSON } = render(<ForecastList data={MockData} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('renders aForecastList', () => {
    const { getByText } = render(<ForecastList data={MockData} />);
    expect(getByText('Partly cloudy')).toBeTruthy();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<ForecastList data={MockData} />);
    const forecastList = getByTestId('ForecastList');
    expect(forecastList).toBeDefined();
  });

  it('renders the correct number of forecast items', () => {
    const { getAllByTestId } = render(<ForecastList data={MockData} />);
    const forecastItems = getAllByTestId('forecast-item');
    expect(forecastItems).toHaveLength(MockData.length);
  });

});
