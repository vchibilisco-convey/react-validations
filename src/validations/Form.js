import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from './FormComponents/TextField';

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="Validations"
          subtitle="Form Validation example"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardTitle title="Form" subtitle="Enter values in textfields to see validations in action" expandable={true} />
        <CardText expandable={true}>
          <form>
            <TextField  
              validation = {{ pattern: 'TIN', message: 'TIN number must contain 9 digits.', validateOn:  'keyup', required: true }}
              hintText="Enter your TIN"
            />
            <br/>
            <TextField  
              validation = {{ pattern: '[0-9]{13,16}', message:'Please enter a valid Credit Card', required: true, validateOn: 'blur' }}
              hintText="Credit Card"
            />
            <br/>
            <TextField
              validation = {{
                fn: (evt)=>{
                  
                  if( parseInt(evt.target.value) == 10 )
                    evt.target.setCustomValidity('error');
                  else
                    evt.target.setCustomValidity('');
                  
                  console.log(evt.target.validity);
                }, 
                
                message:'You can enter anything less the number 10.', 
                required: true, 
                validateOn : 'keyup' 
              }}
              hintText="Any value less 10 (custom)"
            />
          </form>
        </CardText>
        <CardActions>
          <FlatButton label="Save Form"  />
        </CardActions>
      </Card>
    );
  }
}