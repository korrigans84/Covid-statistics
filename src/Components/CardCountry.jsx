import {Flag, Icon} from "semantic-ui-react";


export default function CardCountry({key, country}){
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
                    
                </div>
            </div>
        </div>
    </div>
    //eturn(
    //   <div className="col-md-4 mb-4">
    //       <div className="card country-card">
    //           <img
    //               src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb"
    //               alt={country.Country} className="background"/>
    //           <div className="card-content">
    //               <Flag name={countryCode}/><h3>{country.Country}<small></small></h3>
    //               <div className="icon-block">
    //                   <a href="#" className="text-white"><Icon name="user plus"/> {country.NewConfirmed}</a>
    //                   <a href="#" className="text-white"><Icon name="user cancel"/> {country.NewDeaths}</a>
    //                   <a href="#" className="text-white"><Icon name="minus"/> {country.NewRecovered}</a>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    );
}
