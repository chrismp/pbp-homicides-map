import React from 'react';
import ReactModal from 'react-modal';
import {withStyles} from '@material-ui/core/styles';
import Map from '../Map/';

const styles = theme => ({
    mapContainer: {
        height: '100%',
    },
});

const modalStyle = {
    content: {
        top: 100,
        padding: 0,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

class ExpandedMap extends React.Component {
    render() {
        const {
            isOpen,
            onClose,
            onSelect,
            homicides,
            classes,
            viewport,
            onViewportChange,
        } = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                style={modalStyle}
                onRequestClose={onClose}>
                <div className={classes.mapContainer}>
                    <Map
                        homicides={homicides}
                        onSelect={onSelect}
                        isExpanded={true}
                        onExpand={onClose}
                        viewport={viewport}
                        onViewportChange={onViewportChange}
                    />
                </div>
            </ReactModal>
        );
    }
}

export default withStyles(styles)(ExpandedMap);
