import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            Raoulito. {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Album() {
    const [city, setCity] = React.useState("");
    const [cityCoords, setCityCoords] = React.useState("");
    const [domWeather, setDomWeather] = React.useState("");

    const API_KEY = "dd63984fe3f45789a13462ed645cff28";

    async function getCoord() {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${API_KEY}`);
            const cities = await response.json();
            if (cities) {
                console.log(cities);
                setCityCoords({
                    cityLat: cities[0].lat,
                    cityLon: cities[0].lon,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getWeather() {
        try {
            const { cityLat, cityLon } = cityCoords;
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}&units=metric `);
            const weather = await response.json();
            setDomWeather(weather);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (cityCoords) {
            console.log(cityCoords);
            getWeather();
        }
    }, [cityCoords]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Box sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Just a small weather app.
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Search for a city.
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            And discover the weather forecast.
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <TextField label="Enter a city" focused onChange={(e) => setCity(e.target.value)} />
                            <Button variant="contained" onClick={getCoord}>
                                Let's go !
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={3}>
                        <Grid>
                            <Card sx={{ height: "100%", display: "flex" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    {domWeather && (
                                        <>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Weather in {domWeather.name}
                                            </Typography>
                                            <CardMedia component="img" height="100px" width="100px" image={`http://openweathermap.org/img/wn/${domWeather.weather[0].icon}@2x.png`} alt={domWeather.weather[0].description} />

                                            <Typography>Temperature : {Math.round(domWeather.main.temp * 10) / 10}°C</Typography>
                                            <Typography>Feels like : {Math.round(domWeather.main.feels_like * 10) / 10}°C</Typography>

                                            <Typography>Sky : {domWeather.weather[0].description}</Typography>

                                            <Typography>Wind : {domWeather.wind.speed} km/h</Typography>

                                            <Typography>Humidity : {domWeather.main.humidity} %</Typography>

                                            <Typography>Pressure : {domWeather.main.pressure} hPa</Typography>

                                            <Typography>Clouds : {domWeather.clouds.all} %</Typography>

                                            <Typography>Sunrise : {new Date(domWeather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>

                                            <Typography>Sunset : {new Date(domWeather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
