import React from 'react'
import {Confirm, Container} from "semantic-ui-react";
import CountriesTable from "../Components/CountriesTable";


export default function HomePage(){
    return(
        <>
            <Container >
                <CountriesTable />
            </Container>
        </>
    )
}
