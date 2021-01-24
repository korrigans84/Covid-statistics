import React from 'react'
import {Confirm, Container, Header} from "semantic-ui-react";
import CountriesTable from "../Components/CountriesTable";


export default function HomePage(){
    return(
        <>
            <Header />
            <Container >
                <CountriesTable />
            </Container>
        </>
    )
}
