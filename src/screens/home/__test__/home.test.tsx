import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import Home from '../Home';

describe('Home component', () => {
  it('should match snapshot', () => {
    const {toJSON} = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders the search input', () => {
    const {getByPlaceholderText} = render(<Home />);
    const input = getByPlaceholderText('Search for a city');
    expect(input).toBeDefined();
  });

  it('updates the search text when input is changed', () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />);
    const input = getByPlaceholderText('Search for a city');
    fireEvent.changeText(input, 'Cairo');
    expect(getByTestId('inputId').props.value).toBe('Cairo');
  });

  it('displays the weather status', () => {
    const {getByTestId, getByText} = render(<Home />);
    expect(getByTestId('weather')).toBeDefined();
    expect(getByTestId('weatherImage')).toBeDefined();
  });
});
