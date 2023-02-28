import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const mobileCutoffWidth = 768;

const styles = theme => {
    return {
        root: {
            width: '50%',
            boxSizing: 'border-box',
            float: 'left',
            height: '60vh',
            position: 'relative',
            backgroundColor: theme.palette.primary.light,
            color: 'hsla(0, 0%, 100%, 0.85)',
        },
        innards: {
            position: 'absolute',
            padding: 40,
            boxSizing: 'border-box',
            left: 0,
            top: '50%',
            transform: 'translate(0px, -50%)',
            lineHeight: 1.2,
            letterSpacing: 2,
            fontSize: 40,
        },
        highlight: {
            color: '#fff',
            fontWeight: 'bold',
        },
        [`@media (max-width: ${mobileCutoffWidth}px)`]: {
            root: {
                width: '100%',
                height: '100%',
                float: 'auto',
            },
        },
    };
};

class Intro extends React.Component {
    render() {
        const {classes, homicides} = this.props;

        const h = homicides
            .filter(d => d.isUCRReportable)
            .map(d => d.crimeDate.iso);
        
        const thisYearDate = new Date();
        const lastYearDate = new Date();

        lastYearDate.setFullYear(2021);

        const numLastYear = h
            .filter(d => (d.getFullYear() === 2021 && d <= lastYearDate))
            .length;

        const numThisYear = h
            .filter(d => (d.getFullYear() === 2022 && d <= thisYearDate))
            .length;

        const difference = numThisYear - numLastYear;
        let comparisonWord = 'more';
        if (difference < 0) comparisonWord = 'fewer';
        const absDifference = Math.abs(difference);
        return (
            <div className={classes.root}>
                <div className={classes.innards}>
                    <Typography variant="inherit" paragraph={true}>
                        There have been <br/>
                        <span className={classes.highlight}>{numThisYear} homicides</span> in 2022.
                    </Typography>
                    <Typography variant="inherit" paragraph={true}>
                        This is <span className={classes.highlight}>{absDifference} {comparisonWord}</span> than last year at this date.
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Intro);