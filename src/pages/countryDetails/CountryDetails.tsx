import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';


export const CountryDetails = (props: any) => {

    const params = useParams();
    const countryParam = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id)
            getSingleCountry();
    }, [params.id]);

    const [singleCountry, setSingleCountry] = useState<any>(null);
    const [allCountries, setAllCountries] = useState<any>(null)


    const countryCodeConverter = (givenCode: string) => {
        if (allCountries) {
            console.log("contry code conver", allCountries.find((singleCountry: any) => singleCountry.cca3 === givenCode).name.common, givenCode)
            return allCountries.find((singleCountry: any) => singleCountry.cca3 === givenCode).name?.common
        }
    }
    const getSingleCountry = () => {
        const country = props?.data?.find((e: any) => e.name.common === countryParam);
        setSingleCountry(country);
        setAllCountries(props.data);
    };


    const navigator = (event: any) => {
        navigate(`/country/${event}`);
    };

    const backNavigate = () => {
        navigate(-1);
    }

    const getValue = (element: any) => {
        if(element)
        return Object.keys(element).map((e: any) => element[e].name)
    }



    return (
        <>
            {singleCountry ? (<div className='default-color height-100 text-font'>

                <Box sx={{ flexGrow: 1, m: 5 }} className="margin-left-16 margin-top-0 padding-top-40 default-color">
                    <Button variant="contained" className="element-color text-font" onClick={backNavigate}>
                        &laquo; Back
             </Button>
                </Box>

                <Box sx={{ flexGrow: 1, m: 5 }}>


                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} md={6} lg={6} className="back-groud-image" style={{ backgroundImage: `url(${singleCountry?.flags?.svg})` }}>

                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} className='padding'>

                            <div className="title title-font">
                                <strong>{singleCountry?.name?.common}</strong>
                            </div>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6} md={6} lg={6} className="default-color text-font">
                                    <div className="details-container text-font">
                                        <p><strong className="margin-right">Native Name:</strong>{singleCountry?.name ? (Object.keys(singleCountry?.name?.nativeName).map((e: any) => singleCountry?.name?.nativeName[e].common)) : 'not Found'}</p>
                                    </div>
                                    <div className="details-container text-font">
                                        {singleCountry?.population?(<p><strong className="margin-right">Population:</strong>{singleCountry?.population}</p>):''}
                                    </div>
                                    <div className="details-container text-font">
                                        <p>{singleCountry?.region?(<strong className="margin-right">Region:</strong>):''}{singleCountry?.region}</p>
                                    </div>
                                    <div className="details-container text-font">
                                        <p>{singleCountry?.subregion?(<strong className="margin-right">Sub Region:</strong>):''}{singleCountry?.subregion}</p>
                                    </div>
                                    <div className="details-container text-font">
                                        <p>{singleCountry?.capital? (<strong className="margin-right">Capital:</strong>):''}{singleCountry?.capital?.map((e: any) => e)}</p>
                                    </div>

                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} className="default-color text-font">
                                    <div className="details-container text-font">
                                        <p><strong className="margin-right">Top Level Domain:</strong>{singleCountry?.cca2}</p>
                                    </div>
                                    <div className="details-container text-font">
                                        <p>
                                            {getValue(singleCountry?.currencies)?(<strong className="margin-right">Currencies:</strong>): ''}
                                            <>
                                                {
                                                    getValue(singleCountry?.currencies)
                                                }
                                            </>
                                        </p>
                                    </div> 
                                    <div className="details-container text-font">
                                        <p><strong className="margin-right">Languages:</strong>{singleCountry?.languages ? Object.values(singleCountry?.languages).map((e: any) => e + ',') : 'Not Found'}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} className="default-color text-font">
                                    <div className="display-flex text-font justify-content-start details-container display-toggle">
                                        {singleCountry?.borders?(<strong className="margin-right">Border Countries:</strong>) : ''}
                                        <div>
                                        {singleCountry?.borders?.map((e: any, i: any) => (
                                            
                                            <Button variant="contained" className="element-color text-font margin-10 margin-left-0" key={i} onClick={() => navigator(countryCodeConverter(e))}>{countryCodeConverter(e)}</Button>
                                            
                                        ))}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>


                        </Grid>

                    </Grid>
                </Box>
            </div>) : ( <LoadingButton loading className="loading-style">
      </LoadingButton>)}
        </>
    )
}


