import React from 'react';
import { shallow } from 'enzyme';
import AudioPlayer from './AudioPlayer';

describe('<AudioPlayer />', () => {
  let component = null;
  it('renders correctly', () => {
    component = shallow(<AudioPlayer />)
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  })

});