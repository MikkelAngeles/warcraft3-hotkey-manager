import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


const styles = theme => ({

});

class TabContainerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleResults = this.handleResults.bind(this);
    }

    handleResults = (r) => {

    };
    
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.props.title}
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="left">Command</TableCell>
                                <TableCell align="left">Hotkey</TableCell>
                                <TableCell align="left">Tip</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.content.map((u, k) =>
                                <TableRow key={k}>
                                    <TableCell align="left">{u.title}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {u.cmd}
                                    </TableCell>
                                    <TableCell align="left">{u.key}</TableCell>
                                    <TableCell align="left">{u.tip}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
            </React.Fragment>
        )
    }
}

TabContainerContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabContainerContent);