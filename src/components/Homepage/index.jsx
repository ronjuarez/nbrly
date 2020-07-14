import React, { useState, useCallback, useRef, useEffect, } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { NavLink } from 'react-router-dom';
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
import AcceptButton from '../Request/AcceptButton';
const libraries = ["places"];

export default function Homepage(props) {
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
          libraries 
    });

    const mapContainerStyle= { 
        height: "800px"
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
   
    const filterRequestList = props.requests.filter(request => {  
    
          return(request.volunteer_id === null)
         }
       )
    
  if (loadError) return "Error loading maps"; 
  if (!isLoaded) return "Loading maps";

  return (
    <div>
    <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8}  
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
    >
        {filterRequestList.map(request => (
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
                <NavLink to={`/requests/${selected.id}`}>
                    <button onClick={() =>props.assignVolunteer(selected.id, props.currentUser.id)} >
                        Accept
                    </button>
                </NavLink>
            </div>
            </InfoWindow>
         )}
        </GoogleMap>
    </div>
    )
}


  


    