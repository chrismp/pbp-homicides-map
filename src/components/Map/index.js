import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ReactMapGL, {NavigationControl, Popup} from 'react-map-gl';
import memoize from 'memoize-one';
import { isEqual } from 'lodash';
import {fromJS} from 'immutable';
import {point, featureCollection} from '@turf/helpers';
import bbox from '@turf/bbox';
// import {MAPBOX_API_ACCESS_TOKEN} from './credentials';
import {baseMapStyle, homicidesLayer} from './map-style.js';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const styles = theme => ({
    controlsContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    expandButtonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    expandButton: {
        padding: '0px 10px',
        display: 'block',
        outline: 'none',
        border: 0,
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        cursor: 'pointer',
        boxShadow: '0px 0px 0px 2px hsla(0, 0%, 0%, 0.1)',
        borderRadius: 4,
        color: '#434343',
        fontSize: '1.2em',
        fontWeight: 'bold',
        height: 40,
    },
    icon: {
        paddingRight: 8,
    },
    popup: {
        fontSize: 14,
    },
    popupReadMoreButton: {
        fontSize: 14,
        padding: [[0, 4]],
        marginTop: 10,
    },
});

class Map extends React.Component {
    state = {
        popupVisible: false,
        popupInfo: {},
    };

    map = React.createRef();

    getMapStyle = memoize((homicides) => {
        const points = homicides
            .filter(d => {return d.crimeLocationLatitude !== null && d.crimeLocationLongitude !== null})
            .map((d) => {
                const coordinates = [d.crimeLocationLongitude, d.crimeLocationLatitude];
                const properties = d;
                return point(coordinates, properties);
            });
        const geojson = featureCollection(points);
        
        const mapStyle = baseMapStyle
            .setIn(['sources', 'homicides'], fromJS({type: 'geojson', data: geojson}))
            .set('layers', baseMapStyle.get('layers').push(homicidesLayer));
        
        return mapStyle;
    }, isEqual);

    getBounds = memoize((homicides) => {
        const points = homicides
            .filter(d => d.crimeLocationLatitude !== null && d.crimeLocationLongitude !== null)
            .map((d) => {
                const coordinates = [d.crimeLocationLongitude, d.crimeLocationLatitude];
                const properties = d;
                return point(coordinates, properties);
            });
        return bbox(featureCollection(points));
    }, isEqual);

    getCursor = ({isHovering}) => {
        return isHovering ? 'pointer' : 'default';
    };

    handleClick = (event) => {
        const feature = event.features[0];
        if (feature !== undefined) {
            const {
                id,
                crimeLocationLatitude: lat,
                crimeLocationLongitude: lon,
                crimeSceneAddress: location,
                victim,
            } = feature.properties;
            const { fullName: victimName } = JSON.parse(victim);
            const popupInfo = {id, lat, lon, victimName, location};
            this.setState({popupInfo, popupVisible: true});
        }
    };

    handleSelect = (id) => {
        const {onSelect} = this.props;
        return () => {
            onSelect(id);
        };
    };

    closePopup = () => {
        this.setState({popupVisible: false});
    };

    render() {
        const {popupVisible, popupInfo} = this.state;
        const {viewport, homicides, onExpand, isExpanded, classes, onViewportChange} = this.props;
        
        let expandButton;
        if (isExpanded) {
            expandButton = (
                <button className={classes.expandButton} onClick={onExpand}>
                    <Icon className={classNames(classes.icon, 'fas fa-times')} />
                    <span style={{verticalAlign: 'top'}}>Close</span>
                </button>
            );    
        } else {
            expandButton = (
                <button className={classes.expandButton} onClick={onExpand}>
                    <Icon className={classNames(classes.icon, 'fas fa-map-marked')} />
                    <span style={{verticalAlign: 'top'}}>Expand</span>
                </button>
            );
        }

        let popup = null;
        if (popupVisible) {
            const {id, lat, lon, victimName, location} = popupInfo;
            popup = (
                <Popup
                    className={classes.popup}
                    latitude={+lat}
                    longitude={+lon}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={this.closePopup}
                    anchor="top"
                >
                    <div className={classes.popupVictimName}><b>{victimName}</b></div>
                    <div className={classes.popupLocation}>{location}</div>
                    <Button
                        className={classes.popupReadMoreButton}
                        onClick={this.handleSelect(id)}
                        color="inherit"
                        variant="outlined">
                        Read more
                    </Button>
                </Popup>
            )
        }

        return (
            <ReactMapGL
                ref={this.map}
                className={classes.root}
                {...viewport}
                width="100%"
                height="100%"
                scrollZoom={isExpanded ? true : false}
                touchAction={isExpanded ? 'pan' : 'pan-y'}
                mapStyle={this.getMapStyle(homicides)}
                interactiveLayerIds={["homicides"]}
                getCursor={this.getCursor}
                onClick={this.handleClick}
                mapboxApiAccessToken='pk.eyJ1IjoiY2hyaXNtcGVyc2F1ZCIsImEiOiJjbGR1c3VmMnEwOHl0M29xbDNvbzYzYzRvIn0.uuZUQOYcHze9TLAWXBGjkA'
                onViewportChange={onViewportChange}
            >
                <div className={classes.controlsContainer}>
                    <NavigationControl onViewportChange={onViewportChange} />
                </div>

                <div className={classes.expandButtonContainer}>
                    {expandButton}
                </div>

                {popup}
            </ReactMapGL>
        );
    }
}

export default withStyles(styles)(Map);