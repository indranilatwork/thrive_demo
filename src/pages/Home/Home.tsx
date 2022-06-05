import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Paper, IconButton, InputBase, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';

export const Home = (props: any) => {

    useEffect(() => {
        getCountryData();
    }, []);

    const navigate = useNavigate()

    const [data, setData] = useState<any>(null);
    const [region, setRegion] = useState<any>('');
    const [searchText, setSearchText] = useState<any>('');
    const [regionData, setRegionData] = useState<any>(null)

    const handleChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    };

    useEffect(() => {
        filterBySearch();
    }, [region, searchText]);

    const getCountryData = () => {
        setData(props.data);
        setRegionData(props.data)
    }

    const filterBySearch = () => {
        if (data && data.length) {
            const filter = data.filter((e: any) => e.region.toLowerCase().indexOf(region === 'All' ? '' : region.toLowerCase()) > -1 && e.name?.common.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
            setRegionData(filter)
        }
    }

    const searchData = (event: any) => {
        setSearchText(event.target.value as string);
    }

    const navigateToCountryDetails = (event: any) => {
        navigate(`/country/${event}`)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, m: 5 }}>

                <Box sx={{ flexGrow: 1, m: 5 }} className="padding-left-0">
                    <Grid container spacing={5} className="align-items-center">
                        <Grid item xs={12} sm={12} md={6} lg={6} className="padding-left-0">
                            <Paper
                                className="element-color"
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 200 }}
                            >
                                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                    <i className="fas fa-search text-color" ></i>

                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search for a country..."
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    value={searchText}
                                    onChange={searchData}
                                    className="text-color"
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} className="padding-left-0">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{ m: 1, minWidth: 150 }} className="float element-color" >
                                    <InputLabel id="demo-simple-select-label" className="select-title">Filter by Region</InputLabel>
                                    <Select
                                        className="element-color"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={region}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem className="element-color" value="All" key="all">All</MenuItem>
                                        {data?.map((e: any) => e?.region).filter((e: any, i: any, x: any) => x.indexOf(e) === i).map((region: any, index: any) => (
                                            <MenuItem className="element-color" value={region} key={index}>{region}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
                <Grid container spacing={5}>
                    {regionData?.map((element: any, index: any) => (

                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={() => navigateToCountryDetails(element.name.common)}>


                            <Card className="element-color">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={element?.flags?.svg}
                                    alt="flag"
                                />
                                <CardContent>
                                    <Tooltip className="title-font" title={element.name.common}>
                                        <Typography gutterBottom variant="h6" component="div" className="text-overflow-control title-font">
                                            {element.name.common}
                                        </Typography>
                                    </Tooltip>
                                    <Box className="box-style display-flex flex-direction-column">
                                        <p className="margin text-font"><strong>Population:</strong> {element.population}</p>
                                        <p className="margin text-font"><strong>Region:</strong> {element.region}</p>
                                        <p className="margin text-font"><strong>Capital:</strong> {element.capital?.map((e: any) => e)}</p>
                                    </Box>

                                </CardContent>
                            </Card>

                        </Grid>

                    ))}

                </Grid>
            </Box>
        </>
    )
}
