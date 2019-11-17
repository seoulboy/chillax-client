import React from 'react';
import { mount } from 'enzyme';
import UploadForm from './UploadForm';

describe('<UploadForm />', () => {
  // snapshot testing
  it('matches snapshot', () => {
    const wrapper = mount(<UploadForm />);
    expect(wrapper).toMatchSnapshot();
  });

  // props 접근
  it('props are passed down correctly', () => {
    const user = {
      name: 'John Smith',
      email: 'johnsmith@gmail.com',
      _id: '3djf481kashd381ksfjdn1',
    };
    const handleClose = jest.fn();
    const showUploadModal = jest.fn();
    const uploadSound = jest.fn();
    const wrapper = mount(
      <UploadForm
        handleClose={handleClose}
        showUploadModal={showUploadModal}
        uploadSound={uploadSound}
        user={user}
      />
    );
    expect(wrapper.props().user).toBe(user);
    expect(wrapper.props().handleClose).toBe(handleClose);
    expect(wrapper.props().showUploadModal).toBe(showUploadModal);
    expect(wrapper.props().uploadSound).toBe(uploadSound);
  });

  // DOM 확인
  it('renders texts on DOM correctly', () => {
    const wrapper = mount(<UploadForm />);

    const whiteNoiseSpanElem = wrapper.find('.white-noise-text');
    expect(whiteNoiseSpanElem.contains('white noise')).toBe(true);
  });

  it('click on cancel button closes upload modal', () => {
    const handleClose = jest.fn();
    const wrapper = mount(<UploadForm handleClose={handleClose} />);
    let cancelButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === 'Cancel'
    );
    cancelButton.simulate('click');
  });
});
