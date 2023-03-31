import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        height: 60,
        flexGrow: 1,
    },
    static: {
        height: 60,
    },
    badge: {
        marginLeft: 10,
        opacity: 0.75,
        height: 60,
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
        },
    },
    logo: {
        height: 60,
        marginLeft: -5,
        marginRight: 30,
        opacity: 0.75,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    h1: {
        fontSize: 40,
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
        },
    },
    moreInfo: {
        fontSize: 14,
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
        },
    },
    moreInfoText: {
        paddingLeft: 5,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
});

class Nav extends React.Component {
    render() {
        const {classes, onClickMoreInfo} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.static}></div>
                <AppBar position="fixed" className={classes.root}>
                    <Toolbar>
                        <img className={classes.badge} src="media/badge.png" alt="Badge icon for The Palm Beach Post" />
                        <img className={classes.logo} src="media/logo.png" alt="Logo text for The Palm Beach Post" />
                        <Typography className={classes.h1} variant="h1" color="inherit">
                            Palm Beach County Homicides
                        </Typography>
                        <div className={classes.buttonContainer}>
                            <Button className={classes.moreInfo} onClick={onClickMoreInfo} color="inherit">
                                <i className="fas fa-info-circle"></i> <span className={classes.moreInfoText}>More info</span>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Nav);
