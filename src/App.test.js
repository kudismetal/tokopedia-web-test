import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('return true validation with valid inputs', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().validateInput('18.215')).toEqual(true);
  expect(wrapper.instance().validateInput('Rp17500')).toEqual(true);
  expect(wrapper.instance().validateInput('Rp17.500,00')).toEqual(true);
  expect(wrapper.instance().validateInput('Rp 120.325')).toEqual(true);
  expect(wrapper.instance().validateInput('005.000')).toEqual(true);
  expect(wrapper.instance().validateInput('001000')).toEqual(true);
});

it('canonical equivalents', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: '18.215'
    }
  });
  let numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(18215);

  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: 'Rp17500'
    }
  });
  numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(17500);

  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: 'Rp17.500,00'
    }
  });
  numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(17500);

  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: 'Rp 120.325'
    }
  });
  numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(120325);

  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: '005.000'
    }
  });
  numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(5000);

  wrapper.setState({ numberValue: 0 });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: '001000'
    }
  });
  numberState = wrapper.state('numberValue');
  expect(numberState).toEqual(1000);
});

it('return false validation with invalid inputs', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().validateInput('17,500')).toEqual(false);
  expect(wrapper.instance().validateInput('2 500')).toEqual(false);
  expect(wrapper.instance().validateInput('3000 Rp')).toEqual(false);
  expect(wrapper.instance().validateInput('Rp ')).toEqual(false);
});

it('correct fraction results', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ fractionedRupiahValue: [] });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: '15000'
    }
  });
  let fractionedRupiahValueState = wrapper.state('fractionedRupiahValue');
  expect(fractionedRupiahValueState).toEqual([
    '1 x Rp 10000',
    '1 x Rp 5000'
  ]);

  wrapper.setState({ fractionedRupiahValue: [] });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: 'Rp3900'
    }
  });
  fractionedRupiahValueState = wrapper.state('fractionedRupiahValue');
  expect(fractionedRupiahValueState).toEqual([
    '3 x Rp 1000',
    '1 x Rp 500',
    '4 x Rp 100'
  ]);

  wrapper.setState({ fractionedRupiahValue: [] });
  wrapper.instance().onTextBoxPressEnter({ 
    key: 'Enter',  
    target: {
      value: '12510'
    }
  });
  fractionedRupiahValueState = wrapper.state('fractionedRupiahValue');
  expect(fractionedRupiahValueState).toEqual([
    '1 x Rp 10000',
    '2 x Rp 1000',
    '1 x Rp 500',
    'left Rp 10 (no available fraction)'
  ]);
});
