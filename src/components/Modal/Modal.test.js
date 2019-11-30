import React from 'react';
import { mount, shallow } from 'enzyme';
import Modal from './Modal';

describe('<Modal />', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(<Modal />);
  });

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

  it('renders children prop correctly', () => {
    const children = <div className='children-div'></div>;
    const props = {
      children,
    };
    const wrapper = mount(<Modal {...props} />);
    const renderedChildren = wrapper.find('.children-div');
    expect(renderedChildren.hasClass('children-div')).toEqual(true);
  });
});
