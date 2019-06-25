import React from 'react';
import './App.css';
import TextBox from './components/TextBox';
import Equivalent from './components/Equivalent';
import Fraction from './data/FractionConstant';
import * as regExConstants from './data/RegExConstant';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fractions: [],
      rupiahValue: '',
      fractionedRupiahValue: [],
      helperText: '',
      isHelperTextEnabled: false
    }
  }

  componentDidMount() {
    this.setState({ fractions: Fraction });
  }

  onTextBoxPressEnter = (event) => {
    if (event.key === 'Enter') {
      this.setState({ fractionedRupiahValue: [] });

      let stringValue = String(event.target.value);

      if(this.validateInput(stringValue)) {
        if (/\w+,\d{2}$/.test(stringValue)) {
          stringValue = stringValue.replace(',00', '');
        }

        let numberValue = Number(stringValue.replace(/\D/g, ''));
        let fractionedValue = [];
        
        this.state.fractions.forEach(element => {
          if (numberValue - element >= 0) {
            const divide = Math.floor(numberValue / element);
            if (divide > 1) {
              numberValue = numberValue - (element * divide);
              fractionedValue.push(`${ divide } x Rp ${ element }`);
            } else {
              numberValue = numberValue - element;
              fractionedValue.push(`${ divide } x Rp ${ element }`);
            }
          }
        });

        if (numberValue > 0) {
          fractionedValue.push(`left Rp ${ numberValue } (no available fraction)`);
        }

        this.setState({ 
          fractionedRupiahValue: fractionedValue,
          isHelperTextEnabled: false,
          helperText: ''
        });
      } else {
        this.setState({ 
          isHelperTextEnabled: true, 
          helperText: 'Invalid inputs' 
        });
      }
    }
  }

  onTextBoxChange = (event) => {
    this.setState({ rupiahValue: event.target.value });
  }

  // return boolean
  validateInput(input) {
    // validasi hanya angka dan delimiter .
    if (regExConstants.reOnlyDigitOrDigitWithPeriodDelimiter.test(String(input))) {
      return true;
    }

    // validasi rupiah dan hanya angka
    if (regExConstants.reRpWithOnlyDigit.test(String(input))) {
      return true;
    }

    // validasi rupiah dan hanya angka
    if (regExConstants.reRpWithOnlyDigitCommaEnds.test(String(input))) {
      return true;
    }

    // validasi rupiah dan separator . dan akhiran ,00
    if (regExConstants.reRpWithPeriodDelimiterCommaEnds.test(String(input))) {
      return true;
    }

    // validasi rupiah dan separator .
    if (regExConstants.reRpWithPeriodDelimiter.test(String(input))) {
      return true;
    }
  }

  render() {
    const { rupiahValue, fractionedRupiahValue, helperText, isHelperTextEnabled } = this.state;

    return (
      <div>
        <TextBox
          onPressEnter={ this.onTextBoxPressEnter }
          rupiahValue={ rupiahValue }
          onTextChange={ this.onTextBoxChange }
          helper={ helperText }
          isHelperEnabled={ isHelperTextEnabled }
        ></TextBox>
        
        {
          fractionedRupiahValue.map((item, i) => {
            return (
              <Equivalent
                key={ i }
                value={ item }
              ></Equivalent>
            )
          })
        }
      </div>
    );
  }
}

export default App;
