import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from './Cell'

test('render w/o crashing', ()=> {
  render(<Cell />);
})

it('should match snapshot', () => {
    const {asFragment} =render(<Cell/>)
    expect(asFragment()).toMatchSnapshot()
});