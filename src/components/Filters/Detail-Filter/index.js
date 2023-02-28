import React from 'react';
import * as d3 from 'd3';
import { includes } from 'lodash'
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const fullWidth = 190;
const paddingLeft = 85;
const width = fullWidth - paddingLeft;

const formatPercent = d3.format('.0%');

const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

const styles = theme => ({
    root: {
        textAlign: 'left',
        margin: '20px 0px',
        marginRight: 80,
        display: 'inline-block',
        verticalAlign: 'top',
        position: 'relative',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: theme.palette.primary.main,
    },
    barContainer: {
        position: 'relative',
        cursor: 'pointer',
        padding: 3,
        marginTop: -3,
        marginLeft: -3,
        '&:hover': {
            boxShadow: '-4px 0px rgba(0, 155, 255, 0.54)',
        },
    },
    barContainerActive: {
        boxShadow: '-4px 0px #009bff',
        '&:hover': {
            boxShadow: '-4px 0px #009bff',
        },
    },
    bar: {
        position: 'relative',
    },
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        background: '#ddd',
    },
    foreground: {
        position: 'absolute',
        left: 0,
        top: 0,
        background: theme.palette.primary.main,
    },
    value: {
        position: 'relative',
    },
    barLabel: {
        color: '#999',
        position: 'absolute',
        left: 3,
        top: '50%',
        transform: 'translate(0px, -50%)',
        whiteSpace: 'nowrap',
    },
    closeButton: {
        fontSize: 16,
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#009cff',
        padding: [[2, 4]],
        minWidth: 'auto',
    },
});

class DetailFilter extends React.Component {
    handleClick = (ids) => {
        const { onClick } = this.props;
        return () => {
            onClick(ids);
        }
    }

    handleClear = (id) => {
        const { onClear } = this.props;
        return () => {
            onClear(id);
        };
    }
    
    render() {
        const {
            homicides,
            label,
            choices,
            chosen,
            classes,
            id: filterId,
        } = this.props;

        const filterStyle = {
            width: fullWidth,
        };

        const numHomicides = homicides.length;

        const bars = choices
            .map(({label, filter, id: choiceId}, i) => {
                const numInGroup = homicides.filter(filter).length;
                
                let percent = 0;
                if (numHomicides > 0) {
                    percent = numInGroup / numHomicides;
                }
                
                const barWidth = xScale(percent) || 0;
                const barContainerStyle = {width, paddingLeft};
                const barStyle = {width};
                const backgroundStyle = {width};
                const foregroundStyle = {width: barWidth};
                const labelPosition = percent > 0.6 ? width + 3 : barWidth + 3;
                const valueStyle = {left: labelPosition};
                const isChosen = includes(chosen, choiceId);
                
                let barContainerClassNames = classes.barContainer;
                if (isChosen) {
                    barContainerClassNames = classNames(classes.barContainer, classes.barContainerActive);
                }

                return (
                    <div className={barContainerClassNames} key={i} style={barContainerStyle} onClick={this.handleClick([filterId, choiceId])}>
                        <div className={classes.barLabel}>{label}</div>
                        <div className={classes.bar} style={barStyle}>
                            <div className={classes.background} style={backgroundStyle}>&nbsp;</div>
                            <div className={classes.foreground} style={foregroundStyle}>&nbsp;</div>
                            <div className={classes.value} style={valueStyle}>{formatPercent(percent)}</div>
                        </div>
                    </div>
                );
            });

        const anyChosen = chosen.length > 0;

        let clearButton = null;
        if (anyChosen) {
            clearButton = (
                <Button
                    className={classes.closeButton}
                    onClick={this.handleClear(filterId)}
                    color="inherit">
                    <i className="fas fa-times"></i>
                </Button>
            );
        }

        return (
            <div className={classes.root} style={filterStyle}>
                <div className={classes.label}>{label}</div>
                {bars}
                {clearButton}
            </div>
        )
    }
}

export default withStyles(styles)(DetailFilter);
