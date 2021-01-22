import {Button, Flag, Icon} from "semantic-ui-react";
import {useHistory} from "react-router-dom";


export default function CardCountry({key, country}){
    const navigate = useHistory()
    console.log(country)
    var countryCode = (country.CountryCode).toLowerCase()
    return(
    <div className="col-md-4 col-sm-6">
        <div className="card card-country p-4 ">
            <div className="card-content row justify-content-center">
                <div className="col-md-12 ml-2 d-inline-flex align-items-center justify-content-center mb-4"><Flag name={countryCode}/><h3>{country.Country}</h3></div>
                <div className="col-md-12">
                    <div className="row justify-content-center">
                        <div className="col-3 ">
                            <Icon name="user plus"/> {country.NewConfirmed}
                        </div>
                        <div className="col-3">
                            <Icon name="user cancel"/> {country.NewDeaths}
                        </div>
                        <div className="col-3">
                            <Icon name="minus"/> {country.NewRecovered}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <Button onClick={() => navigate.push(`/country/${countryCode}`)} color='teal'>See More</Button>
                </div>
            </div>
        </div>
    </div>
    );
}
