import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  it('should match snapshot', () => {
    const { toJSON } = render(<Input testID="custom-input" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Input testID="custom-input" />);
    const inputComponent = getByTestId('custom-input');
    expect(inputComponent).toBeDefined();
  });

  it('renders with the provided style', () => {
    const { getByTestId } = render(<Input testID="custom-input" style={{ padding: 10 }} />);
    const inputComponent = getByTestId('custom-input');
    expect(inputComponent.props.style).toEqual(expect.objectContaining({ padding: 10 }));
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Input testID="custom-input" onChangeText={handleChange} />);
    const inputComponent = getByTestId('custom-input');

    fireEvent.changeText(inputComponent, 'test input');
    expect(handleChange).toHaveBeenCalledWith('test input');
  });
});
