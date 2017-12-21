import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Form from './validations/Form';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
        <Form/>
      </MuiThemeProvider>
    );
  }
}
export default App;
