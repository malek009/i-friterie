import IFriterie from "../../../../core/models/iFriterie";
import {Button} from "primereact/button";

interface FriterieItemProps {
    friterie: IFriterie;
    highlight?: boolean;
}

export default function FriterieItem(props: FriterieItemProps) {
    function openInGmap(): void {
        window.open(`https://www.google.com/maps/search/?api=1&query=${props.friterie.latitude},${props.friterie.longitude}`);
    }
    
    return (
        
        <div style={{color : props.highlight? "red" : ""}}>
            <span>
                {props.friterie.name}
            </span>
            <span className="p-2">
                {props.friterie.address}
            </span>
            
                {props.friterie?.distance && <span className="p-2"> {Math.round(props.friterie.distance!) } m</span>}
            
            <Button onClick={openInGmap}>
                Ouvirir dans GMaps
            </Button>
        </div>
    );
}