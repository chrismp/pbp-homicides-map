import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '../Card/';

// coverage: []
// crimeDate: {iso: "2018-12-27T02:45:00+00:00", formatted: "Dec. 27, 2018"}
// crimeLocationLatitude: "43.066070"
// crimeLocationLongitude: "-87.970170"
// crimeSceneAddress: "4500 block of W. Clarke St."
// geojson: {geometry: {…}, type: "Feature", properties: {…}}
// homicideAction: "shot"
// id: 543
// isUCRReportable: true
// publicDisplay: true
// suspects: []
// victim: {bio: "", popupOverride: "", gender: "male", birthDate: {…}, race: "black", …}
// wasArrestMade: null
// wereChargesFiled: null


// ageAtDeath: {raw: 37, formatted: "37 years"}
// bio: ""
// birthDate: {iso: "1982-08-28T00:00:00-05:00", formatted: "Aug. 28, 1982"}
// fullName: "Nathaniel H. Oliver"
// gender: "male"
// id: 549
// lastName: "Oliver"
// popupOverride: ""
// race: "black"

const styles = theme => ({
    root: {
        maxWidth: 900,
        margin: '0 auto',
    },
});

class List extends React.Component {
    render() {
        const {classes, expandedCard, onExpand, onMap} = this.props;
        const cards = this.props.homicides
            .map((homicide) => {
                let expanded = homicide.id === expandedCard;
                return (
                    <Card
                        key={homicide.id}
                        homicide={homicide}
                        onMap={onMap}
                        onExpand={onExpand}
                        expanded={expanded}
                    />
                );
            });
        return (
            <div className={classes.root}>
                {cards}
            </div>
        )
    }
}

export default withStyles(styles)(List);