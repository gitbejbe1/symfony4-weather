import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    map: {
        position: "relative !important",
        minHeight: "70vh !important"
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

const History = () => (

	<div className='container'>
	  History Page
	</div>
)


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cordinates: {
                lat: 52.229675,
                lng: 21.012230
            },
            weather: {},
            loading: true,
        };

    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather(lat, lng) {
        lat = lat || this.state.cordinates.lat;
        lng = lng || this.state.cordinates.lng;

        this.setState({
            loading: true
        })

        fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&units=metric&APPID=739f64dff99e662803ec9a6f6445af8d")
        .then(res => res.json())
        .then(
            (result) => {

                if(result.cod === 200){
                    this.setState({
                        cordinates: {lat: lat, lng: lng},
                        weather: result,
                        loading: false
                    });
                }
                else{
                    this.setState({
                        loading: false
                    });
                }
            },
        )
    }

    onMapClicked(mapProps, map, event) {

        const { loading, weather } = this.state;

        var lat = event.latLng.lat(),
            lng = event.latLng.lng();

        if(!loading) this.getWeather(lat, lng);
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

                        {weather.name && (
                            <div>
                                <Typography variant="h2" component="h2" gutterBottom>
                                    {weather.name}
                                </Typography>

                                <Typography variant="h5" component="h5" gutterBottom>
                                    {weather.weather[0].description}
                                </Typography>

                                <img src={"http://openweathermap.org/img/wn/"+ weather.weather[0].icon +"@2x.png"} />

                                <Typography variant="h3" component="h3" gutterBottom>
                                    {weather.main.temp + "°"}
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.main.pressure + " hPa"}
                                        </Typography>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            Pressure
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.main.humidity + " %"}
                                        </Typography>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            Humidity
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" gutterBottom>
                                            {weather.wind.speed + " km/h"}
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
