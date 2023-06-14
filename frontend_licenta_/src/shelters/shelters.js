import React, { useEffect } from "react";
import './shelters.css';
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { _get } from "../utils/api";
import { useState } from "react";

export const Shelters = () => {
    const [shelters, setShelters] = useState([]);
    const history = useNavigate()
    const getShelters = () => {
        _get("http://localhost:3001/shelters").then((shelters) => {
            setShelters(shelters.data)
        })
    }
    useEffect(() => {
        getShelters();
    }, [])
    const markers = [
        {
            geocode: [48.86, 2.3522],
            popUp: "Hello, I am pop up 1",
            link: "https://www.facebook.com/"
        },{
            geocode: [48.85, 2.3522],
            popUp: "Hello, I am pop up 2",
            link: "https://www.facebook.com/"
        },{
            geocode: [48.855, 2.34],
            popUp: "Hello, I am pop up 3",
            link: "https://www.facebook.com/"
        }
    ];

    const customIcon = new Icon({
        iconUrl: require("../images/marker.png"),
        iconSize: [38,38]
    })

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: point(33,33,true)
        })
    }
    return(
    <>
    <Navbar/>
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
        >
        {shelters.map(marker => (
            <Marker position={[marker.geocodex, marker.geocodey]} icon={customIcon}>
                <Popup>
                    <button onClick={() => window.location.replace(`${marker.link}`)}>{marker.name}</button>
                </Popup>
            </Marker>
        ))
        }
        </MarkerClusterGroup>
    </MapContainer>
    </>
    )

}

