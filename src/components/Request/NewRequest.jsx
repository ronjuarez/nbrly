import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Groceries from './Groceries';
import Header from './Header';
import Search from './Search';
import { FormControl, FormHelperText, InputLabel, Button, Grid, Typography, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import {
  NavLink,
  withRouter
} from "react-router-dom";


const GroceryContainer = styled(Form.Group)`
height: 300px;
margin-top: 10px;
width: 100%;


`
const NewRequestContainer = styled.div`
height: 80%;
width: 100%;
display: flex;
flex-wrap: wrap;
flex-direction: column;
padding: 0 30px;
font-size: 20px;
`
const StyledDiv = styled.div`
margin: 20px 0;
width: 100%;
`

const StyledInputLabel = styled(InputLabel)`
font-size: 20px;`

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 500,
    font: 20,
  },
}));


export default function NewRequest ({
  newRequest,
  changeRequest,
  removeItem,
  setDate,
  request,
  addItem,
  requestDate,
  setCoords,
  setDeliveryAddress,
}) {
  const classes = useStyles();

  
  

  return (
    <div>
      <div>
        <Header />
      </div>
      <NewRequestContainer>
        <Typography variant="h3">Form</Typography>
          <Form
          onSubmit={newRequest}
          action="/requests"
          >
          <Form.Group>
            <Form.Label>Delivery Address</Form.Label>

              <Search 
              setCoords={setCoords} 
              setAddress={setDeliveryAddress}/>

            <Form.Text className="text-muted">
              Please input a delivery address
            </Form.Text>
          </Form.Group>


      <StyledDiv>
        <FormControl className={classes.formControl} >
        <StyledInputLabel variant="outlined">Reimbursement</StyledInputLabel>
        <Select
        style={{width:"100%" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="reimbursement_type" 
          value={request.reimbursement_type} 
          onChange={changeRequest} 
          inputProps={{ 'aria-label': 'label'}}
          Placeholder="Reimbursement Method"

        >
          <MenuItem value={"cash"}>Cash</MenuItem>
          <MenuItem value={"prepaid"}>Prepaid</MenuItem>
          <MenuItem value={"e-transfer"}>E-transfer</MenuItem>
          <MenuItem value={"check"}>Check</MenuItem>
        </Select>
        <FormHelperText>Please choose a Reimbursement Method</FormHelperText>
        </FormControl>
      </StyledDiv>
      <Form.Group>
        <Form.Label>Delivery Date:</Form.Label>
        <DatePicker
          value={requestDate}
          selected={requestDate}
          onChange={date => setDate(date)}
          minDate={new Date()}
          isClearable
          placeholderText="Please pick a date"
        />
      </Form.Group>
      
      <GroceryContainer>
        <Groceries 
          name="items"
          value={request.items}
          deleteItem={removeItem}
          addItem={addItem}
          required
        />
      </GroceryContainer>
          <Button style={{width:"100%" }} color="primary" variant="contained" type="submit">
          <NavLink to ={`/`}> Submit   </NavLink>
          </Button>
        </Form>
      </NewRequestContainer>
    </div>
  )
}

      
    
// export default withRouter(NewRequest)