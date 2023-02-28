import React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

const modalStyle = {
    content: {
        top: 100,
        left: '50%',
        right: null,
        bottom: null,
        transform: 'translate(-50%, 0px)',
        maxWidth: 550,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit,
    },
    divider: {
        marginBottom: 2 * theme.spacing.unit,
    },
    moreInfo: {
        padding: 10,
        boxSizing: 'border-box',
    },
    buttonContainer: {
        textAlign: 'right',
    },
});

class MoreInfo extends React.Component {
    render() {
        const {classes, isOpen, onClose} = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                style={modalStyle}
                onRequestClose={onClose}>
                <div className={classes.moreInfo}>
                    <h2>About the Milwaukee Homicide Database</h2>
                    <Typography variant="p" paragraph={true}>The Journal Sentinel is tracking homicides in Milwaukee to memorialize the victims and better understand deadly violence in the city. The tracker is updated as regularly as possible.</Typography>
                    <Typography variant="p" paragraph={true}>Anyone with information about these homicide cases can call Milwaukee police at (414) 935-7360. Callers can remain anonymous.</Typography>
                    <Divider className={classes.divider} light={true} />
                    <Typography color="textSecondary" className={classes.sources} variant="p" paragraph={true}>Sources: Milwaukee Police Department, Milwaukee Homicide Review Commission, court records and Journal Sentinel analysis</Typography>
                    <div className={classes.buttonContainer}>
                        <Button
                            className={classes.button}
                            variant="outlined"
                            onClick={onClose}>
                            <Icon className={classNames(classes.icon, 'fas fa-times')} />
                            Close
                        </Button>
                    </div>
                </div>
            </ReactModal>
        )
    }
}

export default withStyles(styles)(MoreInfo);