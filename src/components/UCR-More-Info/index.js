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
                </div>
            </ReactModal>
        );
    }
}

export default withStyles(styles)(UCRMoreInfo);
