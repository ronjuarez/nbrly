import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';
import Task from './components/Task';
import TaskCompleted from './components/Task/TaskCompleted';
import Profile from './components/Profile';
import Registration from './components/auth/Registration';
import MostDeliveries from './components/Leaderboard/MostDeliveries';
import NewRequest from './components/Request/NewRequest';
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
    const mapContainerStyle= { 
      width: '100vw',
      height: "100vh"
    }
    const center = { 
      lat: 43.653225,
      lng: -79.383186
    };


 export default function App(props) {
  const [state, setState] = useState ({
    users: [],
    requests: [],
    leaderboard: []
  });


  const [logged, setLogged] = useState({
    loggedInStatus: "Not logged in",
    user: {}
  });

  useEffect(() => {
    checkLoginStatus()
    Promise.all([
    axios.get('http://localhost:3000/users'),
    axios.get('http://localhost:3000/requests'),
    axios.get('http://localhost:3000/leaderboard')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        users: all[0].data.body, requests: all[1].data.body, leaderboard: all[2].data.body}));
        })
      .catch((error) => {
        console.log(error)
      })
    }, []);
    function checkLoginStatus() {
      axios.get('http://localhost:3000/logged_in', { withCredentials: true }
      ).then(response => {
        if (response.data.logged_in && logged.loggedInStatus === "Not logged in") {
          setLogged({
            loggedInStatus: "Logged in",
            user: response.data.user
          })
        } else if (!response.data.logged_in && logged.loggedInStatus === "Logged in") {
          setLogged({
            loggedInStatus: "Not logged in",
            user: {}
          })
        }

      })
      .catch(error => {
        console.log(error); 
      })
    }
    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
       libraries 
      })
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
    
     return (
      <div> 
        <Router>
            <div>
              <Navigation />
              <Switch>
                <Route exact path="/requests">
                  <Request
                    requests={state.requests}
                  />
                </Route>
                <Route path="/requests/new">
                  <NewRequest
                  currentUser={logged.user}/>
                </Route>
                <Route path="/requests/:id">
                  <Task
                    currentUser={logged.user}
                    requests={state.requests}
                  />
                </Route>
                <Route path={`/requests/complete`}>
                  <TaskCompleted/>
                  </Route>  
                <Route exact path="/leaderboard">
                  <Leaderboard
                    users={state.leaderboard}
                  />
                </Route>
                <Route path ="/leaderboard/mostdeliveries">
                  <MostDeliveries
                  players={state.leaderboard}/>
                </Route>
      
                <Route path="/profile">
                  <Profile 
                    currentUser={logged.user}
                  />
                </Route>
               
                <Route path="/">
                  
                  <Homepage 
                    {...props} 
                    handleLogin={handleLogin}
                    handleLogout={handleLogout} 
                    loggedInStatus={logged.loggedInStatus}
                  />
                </Route>
              </Switch>
            </div>
      
          </Router>
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
          {state.requests.map(request => (
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
      </div>
    )



    function handleLogin(data) {
      setLogged({
        loggedInStatus: "Logged in",
        user: data
      })
    }
    function handleLogout() {
      setLogged({
        loggedInStatus: "Not logged in",
        user: {}  
      })
    }


function Locate({panTo}) {
  return (
  <button  
  onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }}
  >HElloooo</button>
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
      console.log(results[0])
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
}
