import { ToggleButton } from '../ToggleButton';
import React from 'react';
import { createRoot } from 'react-dom/client';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// describe('Test Button component', () => {
//   it('Test click event', () => {
//     const mockCallBack = jest.fn();
//     const button = shallow((<ToggleButton />));
//     button.find('button').simulate('click');
//     expect(mockCallBack.mock.calls.length).toEqual(1);
//   });
// });

describe('Testing button', () => {
  it('Check for button', () => {
    expect(ToggleButton);
  });
  it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element);
    root.render(<ToggleButton />);
    root.unmount();
  });
});
