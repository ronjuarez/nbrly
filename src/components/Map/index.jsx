import React from 'react';
import { GoogleMap } from "react-google-maps";

export default function Map() {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 43.653225, lng: -79.383186 }}
        />
    )
}