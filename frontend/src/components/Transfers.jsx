import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {
  updateToEmailTransfer,
  updateToAmountTransfer,
  updateDescriptionTransfer,
  updateToIdTransfer,
  getMyData,
  makeTransfer,
  searchName
} from '../actions';
import '../css/App.css';


class Transfers extends Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex === 2){
      this.props.makeTransfer(this.props.transfer, this.props.user)
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleSearchNames = (value) => {
    this.props.updateToEmailTransfer(value);
    if(this.props.transfer.namesSearched.length){
      let to_id = this.props.transfer.namesSearched.filter((item)=>{
        return item.email === value;
      })
      if(to_id){
        this.props.updateToIdTransfer(to_id[0].id);
      }
    }
    if(value.length > 1)
      this.props.searchName(this.props.user.access_token, value)
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finalizar' : 'Siguiente'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Atras"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;
    let dataSource = [];
    if(this.props.transfer.namesSearched.length){
      dataSource = this.props.transfer.namesSearched.map((item)=>{
        return item.email;
      })
    }
    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Buscar usuario a transferir.</StepLabel>
            <StepContent>
              <AutoComplete
                  hintText="Buscar por email"
                  dataSource={ dataSource }
                  onUpdateInput={this.handleSearchNames}
                  searchText={this.props.transfer.to_email}
                  fullWidth={true}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Monto a transferir</StepLabel>
            <StepContent>
              <p>Ingrese monto a transferir.</p>
              <TextField 
                  hintText="Monto"
                  fullWidth={true}
                  type="number"
                  onChange={(e) => this.props.updateToAmountTransfer(e.target.value)}
                  value={this.props.transfer.to_amount}
                />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirmar transferencia</StepLabel>
            <StepContent>
              <TextField 
                  hintText="Email"
                  fullWidth={true}
                  value={this.props.transfer.to_email}
                  disabled={true}
                />
              <TextField 
                  hintText="Monto"
                  fullWidth={true}
                  type="number"
                  value={this.props.transfer.to_amount}
                  disabled={true}
                />
                <TextField 
                  hintText="Motivo"
                  fullWidth={true}
                  value={this.props.transfer.description}
                  onChange={(e) => this.props.updateDescriptionTransfer(e.target.value)}
                />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            
            Transferencia realizada con exito. <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Nueva Transferencia
            </a>
          </p>
        )}
        <Snackbar
          open={this.props.user.openSnackbar}
          message={this.props.user.snackBarResponse}
          autoHideDuration={4000}
          onRequestClose={this.props.closeSnackbar}
        />
      </div>
      
    );
  }
}

export default connect( state => state, {
  updateToEmailTransfer,
  updateToAmountTransfer,
  updateDescriptionTransfer,
  updateToIdTransfer,
  getMyData,
  makeTransfer,
  searchName
})(Transfers);