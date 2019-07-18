import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    map: {
        position: "relative !important",
        minHeight: "26em !important"
    },
    paper: {
        position: "relative",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    loader: {
        position: "absolute",
        width: "100%",
        left: "0px",
        top: "0",
        height: "15px"
    }

});

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cordinates: {
                lat: 52.229675,
                lng: 21.012230
            },
            weather: this.getPreviewDataTemplate(),
            loading: false
        }

    }

    componentDidMount(){
        this.onMapClicked();
    }

    getPreviewDataTemplate(data)
    {
        let template = {
            location: 'Unknown',
            description: '--',
            icon: '01n',
            temp: '--',
            pressure: '--',
            humidity: '--',
            wind: '--',
        };

        return typeof data === 'object' ? Object.assign({}, template, data) : template;
    }

    getWeather(lat, lng)
    {
        lat = lat || this.state.cordinates.lat;
        lng = lng || this.state.cordinates.lng;

        return axios.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&units=metric&APPID=739f64dff99e662803ec9a6f6445af8d");
    }

    saveWeather(weatherData)
    {
        return axios.post("/api/addToStore", weatherData);
    }

    async onMapClicked(mapProps, map, event)
    {
        const { loading, cordinates } = this.state;

        if(loading) return false;

        var lat = event ? event.latLng.lat() : cordinates.lat,
            lng = event ? event.latLng.lng() : cordinates.lng,
            date = new Date();

            date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);

        this.setState({
            loading: true,
            cordinates: { lat: lat, lng: lng },
            weather: this.getPreviewDataTemplate({location: "Downloading data"})
        });

        try {
          const weatherData = await this.getWeather(lat, lng);

          if(weatherData.data && weatherData.data.cod === 200){

              let data = {
                  lat: lat,
                  lng: lng,
                  location: weatherData.data.name,
                  description: weatherData.data.weather[0].description,
                  icon: weatherData.data.weather[0].icon,
                  temp: weatherData.data.main.temp,
                  pressure: weatherData.data.main.pressure,
                  humidity: weatherData.data.main.humidity,
                  wind: weatherData.data.wind.speed,
                  time: date
              }

              var saveAction = await this.saveWeather(data);

              if(saveAction.data.status === 'recive'){
                  this.setState({
                    weather: this.getPreviewDataTemplate(data),
                    loading: false
                  });
              }
              else throw "There was an error while seaving data";
          }
          else throw "There is no weather data for this location";

        }
        catch(e) {
            console.error(e);

            this.setState({
                loading: false,
                weather: this.getPreviewDataTemplate({
                  location: 'No weather data for this location',
                  description: 'please select another',
                })
            });
        }

    }

    render() {

        const { classes } = this.props;
        const { loading, cordinates, weather } = this.state;

        return (

            <div className={classes.mapWrapper}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h6" gutterBottom align="center">
                            Click on the selected place on the map to download the weather
                        </Typography>
                        <Paper className={classes.paper}>

                            {loading && ( <LinearProgress className={classes.loader} /> )}

                            <Map
                                google={this.props.google}
                                initialCenter={cordinates}
                                zoom={10}
                                onClick={this.onMapClicked.bind(this)}
                                className={classes.map}
                            >
                            <Marker position={cordinates} />
                            </Map>
                        </Paper>
                    </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h6" gutterBottom align="center">
                        Weather preview
                    </Typography>
                    <Paper className={classes.paper}>

                        {loading && ( <LinearProgress className={classes.loader} /> )}

                        {weather.location && (
                            <div>
                                <Typography variant="h2" component="h2" gutterBottom>
                                    {weather.location}
                                </Typography>

                                <Typography variant="h5" component="h5" gutterBottom>
                                    {weather.description}
                                </Typography>

                                <img src={"http://openweathermap.org/img/wn/"+ weather.icon +"@2x.png"} />

                                <Typography variant="h3" component="h3" gutterBottom>
                                    {weather.temp + "°"}
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.pressure + " hPa"}
                                        </Typography>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            Pressure
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.humidity + " %"}
                                        </Typography>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            Humidity
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.wind + " km/h"}
                                        </Typography>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            Wind
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        )}

                    </Paper>
                </Grid>
                </Grid>
            </div>

        );
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (GoogleApiWrapper({
  apiKey: null
})(Dashboard))
