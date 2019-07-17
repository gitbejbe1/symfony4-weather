import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
		table: {
		minWidth: 650,
	},

});

class History extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			page: 0,
			rows:[

			],
			totalRows: 0
		}
	}

	componentDidMount(){
		this.updateTable();
	}

	getHistoryData() {
	  	return axios.get("/api/getHistoryData/"+this.state.page);
	}

	async updateTable(){

		const { loading } = this.state;

        if(loading) return false;

        this.setState({
            loading: true,
        });

		var data = await this.getHistoryData();

		try {	console.warn(data);
			this.setState({
				rows: data.data.rows,
				totalRows: data.data.totalRows,
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

	handleChangePage(){
		this.getHistoryData();
	}

	render() {

		const { classes } = this.props;
		const { page, rows, totalRows  } = this.state;

		return (
			<Paper className={classes.root}>
		      <Table className={classes.table}>
		        <TableHead>
		          <TableRow>
		            <TableCell>Dessert (100g serving)</TableCell>
		            <TableCell align="right">Calories</TableCell>
		            <TableCell align="right">Fat&nbsp;(g)</TableCell>
		            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
		            <TableCell align="right">Protein&nbsp;(g)</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {rows.map(row => (
		            <TableRow key={row.name}>
		              <TableCell component="th" scope="row">
		                {row.name}
		              </TableCell>
		              <TableCell align="right">{row.calories}</TableCell>
		              <TableCell align="right">{row.fat}</TableCell>
		              <TableCell align="right">{row.carbs}</TableCell>
		              <TableCell align="right">{row.protein}</TableCell>
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
		)
	}
}

export default withStyles(styles) (History)
