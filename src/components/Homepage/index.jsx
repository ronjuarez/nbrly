import React, { useState, useCallback, useRef, useEffect, } from 'react';
import axios from 'axios';
import Registration from '../auth/Registration';
import Login from '../auth/Login';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";
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
const libraries = ["places"];

export default function Homepage(props) {
    

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
          libraries 
    });

    const mapContainerStyle= { 
        width: '100vw',
        height: "100vh"
    };

    const center = { 
        lat: 43.653225,
        lng: -79.383186
    };

    const [markers, setMarkers] = useState([]);
    const[selected, setSelected] = useState(null);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(), 
            time: new Date()
        }])
    }, [])

    const mapRef = useRef();

    const onMapLoad= useCallback((map) => {
        mapRef.current = map;
    }, [])
   
  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    
  }, []);
    
  if (loadError) return "Error loading maps"; 
  if (!isLoaded) return "Loading maps";
  console.log(props.currentUser)
  return (
    <div>
    <h1>NBRLY</h1>
    <Search panTo={panTo} />
    <Locate panTo={panTo} />
    <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8}  
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
    >
      {props.requests.map(request => (
        <Marker
            key={request.id}
            position={{lat: request.latitude, lng: request.longitude}}
            onClick={()=> {
            setSelected(request)
            }}
        />
    ))}

    {selected && (
        <InfoWindow
            position={{
            lat: selected.latitude, lng: selected.longitude
            }}
            onCloseClick={()=> {
            setSelected(null);
            }}
        >
            <div>
                <h4>Delivery Address</h4>
                <p>{selected.delivery_address}</p>
                <h4>Items Requested</h4>
                <ul>
                    {selected.items.map(item => (
                    <li>{item}</li>
                    ))}
                </ul>
            </div>
        </InfoWindow>
    )}
  </GoogleMap>
    </div>)


    function Locate({panTo}) {
        return (
            <button  
                onClick={() => {
                navigator.geolocation.getCurrentPosition(
                (position) => {

                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                },
                () => null
                );
                }}
            >Submit</button>
        )
    }


    function Search({ panTo }) {
    const {
    ready,
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions } = usePlacesAutocomplete({
    requestOptions:{
        location: { lat: () => 43.653225, lng: () => -79.383186},
        radius: 200 * 1000,
    },
    })
   
    return (
    <Combobox 
    onSelect={async (address) => {
    setValue(address, false);
    clearSuggestions()

    try {
    const results = await getGeocode({address});
    // console.log(results[0])
    const { lat, lng } = await getLatLng(results[0]);
    panTo({ lat, lng })
    } catch(error){
    console.log("error!")
    }

    }}>
    <ComboboxInput 
    value={value} 
    onChange={(e) => {setValue(e.target.value)}}
    disabled={!ready}
    placeholder="Enter an address"
    />
    <ComboboxPopover>
        <ComboboxList>
        {status === "OK" && data.map(({id, description}) => 
        (<ComboboxOption key={id} value ={description}/>
        ))}
        </ComboboxList>

    </ComboboxPopover>
    
    </Combobox>
    )
    }
};

