import React, {useEffect}  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Groceries from './Groceries'
import Header from './Header'
import { FormControl, FormHelperText, InputLabel, Button, Typography, Select, MenuItem } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useLoadScript} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const libraries = ["places"];


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

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
     libraries 
    })
    

  function Search() {
    const {
      ready,  
      value, 
      suggestions: {status, data}, 
      setValue, 
      clearSuggestions
    } = usePlacesAutocomplete({
    
    })
    
    useEffect(() => {
    }, [value])

    useEffect(() => {
  }, [])
    return (
      <div>
      <Combobox 
          
          onSelect={async (address) => {
            setValue(address, false);
            
            clearSuggestions();
            try {
              const results = await getGeocode({address})
              setDeliveryAddress(results[0].formatted_address)
              const coords = await getLatLng(results[0])
              setCoords(coords.lat, coords.lng)
        
            } catch(error) {
              console.log(error)
            }
          }}>

          
        <ComboboxInput
          style={{width:"100%" }}
          value={value} 
          onChange={(e) => {setValue(e.target.value)}}
          setValue={setValue}
          disabled={!ready}
          placeholder="Enter your address"
        />
        <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({id, description}) => 
          (<ComboboxOption key={id} value ={description}/>
          ))}
          </ComboboxList>
  
        </ComboboxPopover>
      </Combobox>
      </div>
      
  
     )
  }


   
  

  return (
    <div>
      <div>
        <Header />
      </div>
      <NewRequestContainer>
        <Typography variant="h3">Form</Typography>
          <Form
          onSubmit={newRequest}
          >
          <Form.Group>
            <Form.Label>Delivery Address</Form.Label>
            <Search/>
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
          // onChange={changeRequest}
          required
        />
      </GroceryContainer>

        <Button style={{width:"100%" }} color="primary" variant="contained" type="submit">
          Submit
        </Button>

        </Form>
      </NewRequestContainer>
    </div>
  )
}

      
    
