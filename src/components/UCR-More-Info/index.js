import React from 'react';
import ReactModal from 'react-modal';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        height: 'auto',
        padding: 20,
        boxSizing: 'border-box',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
});

const modalStyle = {
    content: {
        maxWidth: 400,
        maxHeight: 500,
        width: '100%',
        top: 100,
        padding: 0,
        left: '50%',
        transform: 'translate(-50%, 0px)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

class UCRMoreInfo extends React.Component {
    render() {
        const {isOpen, onClose, classes} = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                style={modalStyle}
                onRequestClose={onClose}>
                <div className={classes.container}>
                    <div className={classes.closeButtonContainer}>
                        <Button
                            onClick={onClose}
                            color="inherit">
                            <i className="fas fa-times"></i>
                        </Button>
                    </div>

                    <h3>About UCR homicides</h3>
                    <p>Most, but not all, homicides are reported to the federal government as part of the FBI Uniform Crime Reporting system.</p>
                    <p>This national crime reporting standard does not include killings deemed self-defense in its homicide total. Instead, those deaths are tracked separately as justifiable homicide.</p>
                    <p>The Milwaukee Police Department and Milwaukee Homicide Review Commission — and the Milwaukee Journal Sentinel — typically use the number of UCR homicides in public reports because UCR standards provide a consistent way to compare years of data.</p>
                </div>
            </ReactModal>
        );
    }
}

export default withStyles(styles)(UCRMoreInfo);
