import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import queryString from 'query-string';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
		position: "relative"
	},
	table: {
		minWidth: 650,
	},
	tableIconCell: {
		padding: 0,

		"& .weatherIcon": {
			maxWidth: "40px"
		}
	},
	loader: {
        position: "absolute",
        width: "100%",
        left: "0px",
        top: "0",
        height: "15px"
    }

});

class History extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			page: 0,
			rows:[],
			totalRows: 0
		}

	}

	componentDidMount(){
		this.updateTable();

		this.getStatisticsData().then(res => {
	        this.setState({ stats: res.data.stats });
	    })
	}

	getStatisticsData(page = 0) {
	  	return axios.get("/api/getStatisticsData");
	}

	getHistoryData(page = 0) {
	  	return axios.get("/api/getHistoryData/"+ page);
	}

	async updateTable(page = 0){

		const { loading } = this.state;

        if(loading) return false;

        this.setState({
            loading: true,
        });

		var data = await this.getHistoryData(page);

		try {
			this.setState({
				rows: data.data.rows,
				totalRows: parseInt(data.data.totalRows),
				page: page,
				loading: false,
			});
		}
		catch(e) {
            console.error(e);

            this.setState({
                loading: false,
            });
        }
	}

	handleChangePage(e, page)
	{
		const { loading } = this.state;

		if(!loading)
			this.updateTable(page);
	}

	render() {

		const { classes } = this.props;
		const { page, rows, totalRows, loading, stats  } = this.state;

		return (
			<div>
				<Grid container spacing={2} align="center">
					<Grid item xs={2}>
						<Typography variant="h6" gutterBottom>
							{stats ? stats.commonLocation : '---'}
						</Typography>
						<Typography variant="subtitle2" component="h6" gutterBottom>
							Common search Location
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="h6" gutterBottom>
							{stats ? Math.round(stats.avgTemp)+"°" : '---'}
						</Typography>
						<Typography variant="subtitle2" component="h6" gutterBottom>
							Avarge temp
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="h6" gutterBottom>
							{stats ? stats.maxTemp+"°" : '---'}
						</Typography>
						<Typography variant="subtitle2" component="h6" gutterBottom>
							Max temp
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="h6" gutterBottom>
							{stats ? stats.minTemp+"°" : '---'}
						</Typography>
						<Typography variant="subtitle2" component="h6" gutterBottom>
							Min temp
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="h6" gutterBottom>
							{stats ? stats.totalRows : '---'}
						</Typography>
						<Typography variant="subtitle2" component="h6" gutterBottom>
							Total search
						</Typography>
					</Grid>
				</Grid>

				<Paper className={classes.root}>

				  {loading && ( <LinearProgress className={classes.loader} /> )}

			      <Table className={classes.table}>
			        <TableHead>
			          <TableRow>
			            <TableCell>ID</TableCell>
			            <TableCell align="right">Location</TableCell>
			            <TableCell align="right">Description</TableCell>
			            <TableCell align="right">Icon</TableCell>
			            <TableCell align="right">Temp</TableCell>
			            <TableCell align="right">Pressure</TableCell>
			            <TableCell align="right">Humidity</TableCell>
			            <TableCell align="right">Wind</TableCell>
			            <TableCell align="right">Date</TableCell>
			          </TableRow>
			        </TableHead>
			        <TableBody>
			          {rows.map(row => (
			            <TableRow key={row.id}>
			              <TableCell component="th" scope="row">
			                {row.id}
			              </TableCell>
			              <TableCell align="right">{row.location}</TableCell>
			              <TableCell align="right">{row.description}</TableCell>
			              <TableCell align="right" className={classes.tableIconCell}><img src={"http://openweathermap.org/img/wn/"+ row.icon +"@2x.png"} className={"weatherIcon"} /></TableCell>
			              <TableCell align="right">{row.temp + "°"}</TableCell>
			              <TableCell align="right">{row.pressure + " hPa"}</TableCell>
			              <TableCell align="right">{row.humidity + " %"}</TableCell>
			              <TableCell align="right">{row.wind + " km/h"}</TableCell>
			              <TableCell align="right">{row.time.date.split('.')[0]}</TableCell>
			            </TableRow>
			          ))}
			        </TableBody>
			      </Table>
				  <TablePagination
			          component="div"
			          count={totalRows}
			          page={page}
					  rowsPerPageOptions={[10]}
					  rowsPerPage={10}
			          backIconButtonProps={{
			            'aria-label': 'Previous Page',
			          }}
			          nextIconButtonProps={{
			            'aria-label': 'Next Page',
			          }}
			          onChangePage={this.handleChangePage.bind(this)}
			       />
			    </Paper>
			</div>
		)
	}
}

export default withStyles(styles) (History)
