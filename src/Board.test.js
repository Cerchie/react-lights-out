import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Board from './Board'

test('render w/o crashing', ()=> {
  render(<Board />);
})
//made sure to press u in watch mode to update 
it('should match snapshot', () => {
    const {asFragment} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0}/>);
    expect(asFragment()).toMatchSnapshot();
});

it('should toggle cell on click', () => {
    const {asFragment} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={.25}/>);
    const cells = asFragment().querySelectorAll('Cell')
    fireEvent.click(asFragment());
    expect(asFragment()).toMatchSnapshot();

  
})

it('display msg on win, gets rid of board', () => {
    const {asFragment} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0}/>);
    expect(asFragment()).not.toContain(`<td>`);

});