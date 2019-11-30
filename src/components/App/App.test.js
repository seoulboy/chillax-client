import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let component = null;
  const user = { likedSounds: false};
  const currentlyPlaying = [];

  it('renders correctly', () => {
    component = shallow(<App user={user} currentlyPlaying={currentlyPlaying} />);
  })

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  })

})