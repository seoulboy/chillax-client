import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

describe('<Modal />', () => {
  it('matches snapshot', () => {
    const handleClose = jest.fn();
    const wrapper = mount(<Modal show='true' handleClose={handleClose} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('props are passed down correctly', () => {
    const handleClose = jest.fn();
    const show = true;

    const wrapper = mount(<Modal show={show} handleClose={handleClose} />);
    expect(wrapper.props().show).toBe(show);
    expect(wrapper.props().handleClose).toBe(handleClose);
  });
});
