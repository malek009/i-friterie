import { useEffect, useState } from "react";
import IFriterie from "../../core/models/iFriterie";
import FriteriesList from "./friteriesList";
import ICoordinate from '../../core/models/ICoordinate';
import { getDistance } from 'geolib';
import friterieFacade from '../../core/facades/frietrieFacade';

export default function Friteries() {
    
    const [friteries, setFriteries] = useState<IFriterie[]>([]);
    const [coords, setCoords] = useState<ICoordinate>();

    //ICI ON VA CHERCHER LES DONNEES

    const fetchData = async () => {
        const friteries = await friterieFacade.getAll();
        if(coords) {
        setFriteries(friteries.map(f => ({ ...f , 
                                    distance: getDistance(
                                        { lat: coords.latitude  ,lng : coords.longitude },
                                        { lat: f.latitude , lng: f.longitude },
                                        coords?.accuracy
                                        ) })).sort((a,b) => a.distance! - b.distance!));    
                                    
        }
    };


    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (value) => {
                setCoords(value.coords);
            },
            (error) => {
                console.log(error);
            })
        }
        else
         { console.log("geolocation not available"); }
        
    }, []);

    useEffect(() => {
        if(coords ) {
            fetchData();
        }
    }, [coords]);




    return (
        <FriteriesList friteries={friteries}/>
    );
}