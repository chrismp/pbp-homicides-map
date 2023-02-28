import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        root: {
            marginTop: 75,
        },
        count: {
            fontSize: 46,
            fontWeight: 'bold',
            paddingRight: 5,
        },
    };
};

class HomicideCount extends React.Component {
    render() {
        const {classes, count} = this.props;
        return (
            <div className={classes.root}>
                <span className={classes.count}>{count}</span> <span className={classes.label}>homicides match these criteria</span>
            </div>
        );
    }
}

export default withStyles(styles)(HomicideCount);