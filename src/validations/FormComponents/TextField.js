import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiTextField  from 'material-ui/TextField';

class TextField extends Component {

  constructor(props){
    super(props);
    this.objRef = {};
    this.state = {
      value: '',
      validationErrorMessage: ''
    }
    this.validateComponent = this.validateComponent.bind(this);
  }

  componentDidMount() {
    switch(this.props.validation.pattern){
      case 'NUMBER': this.objRef.input.pattern = '[0-9]'; break;
      case 'TIN': this.objRef.input.pattern = '.{9,}'; break;
      default: 
        if(this.props.validation.pattern !== undefined){
          this.objRef.input.pattern = this.props.validation.pattern; 
        }
      break;
    }
    if(this.props.validation.required === true){
      this.objRef.input.required = true;
    }
    let validationFunction = this.validateComponent;
    if(this.props.validation.fn){
      validationFunction =  this.props.validation.fn;
    }
    
    this.objRef.input.addEventListener(this.props.validation.validateOn, validationFunction);
  }
 
  validateComponent(evt){
    
    if(this.objRef.input.validity.valueMissing === true){
      this.setState({validationErrorMessage:'This field is required'});
      return;
    }else{
      this.setState({validationErrorMessage: ''});
    }

    if(this.objRef.input.validity.valid === false){
      this.setState({validationErrorMessage: this.props.validation.message});
    }else{
      this.setState({validationErrorMessage: ''});
    }

    
  }
  
  render() {
    let originalProps = Object.assign({}, this.props);
    delete originalProps.validation;
    return (
      <div>
        <MuiTextField
          errorText= { this.state.validationErrorMessage }
          ref={ (obj) => { this.objRef = obj }}
          onChange={ this.validateComponent }
          { ...originalProps } 
        />
      </div>
    );
  }

}

TextField.defaultProps = {
  validation: { pattern: '', message: 'Validation Failed', validateOn: 'change' }
};

TextField.propTypes = {
  validation: PropTypes.shape({
    fn: PropTypes.func,
    pattern: PropTypes.string,
    message: PropTypes.string,
    validateOn: PropTypes.string
  })
};

export default TextField;