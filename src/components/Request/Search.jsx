import React, { useEffect, useState } from 'react';
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

  

  export default function Search({
    setCoords,
    setAddress
  }) {
  const {
    ready,  
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions
  } = usePlacesAutocomplete({
  
  })
  
  useEffect(() => {
      console.log('value', value)
  }, [value])

  useEffect(() => {
    console.log('new')
}, [])


  return (
    <div>
    <Combobox 
        
        onSelect={async (address) => {
          setValue(address, false);
          
          clearSuggestions();
          try {
            const results = await getGeocode({address})
            setAddress(results[0].formatted_address)
            const coords = await getLatLng(results[0])
            setCoords(coords.lat, coords.lng)
      
          } catch(error) {
            console.log(error)
          }
        }}>

        
      <ComboboxInput
        style={{width:"100%"}}
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
 

