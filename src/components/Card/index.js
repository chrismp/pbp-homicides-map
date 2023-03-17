import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import {Element} from 'react-scroll';
import AnimateHeight from 'react-animate-height';

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
// photo: ...


const mobileCutoffWidth = 768;

const styles = theme => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
        clear: 'both',
        color: '#434343',
        margin: '15px auto',
        padding: 20,
        boxSizing: 'border-box',
        background: '#fff',
        borderTop: '1px solid #9b9b8c'
    },
    chunk: {
        float: 'left',
        boxSizing: 'border-box',
    },
    chunkLeft: {
        width: 125,
        minHeight: 1,
        textAlign: 'center',
    },
    chunkRight: {
        width: 'calc(100% - 125px)',
        paddingLeft: 20,
    },
    imageContainer: {
        width: 125,
        height: 125,
        position: 'relative',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translate(-50%, 0%)',
        border: '1px solid #ccc',
        borderRadius: 3,
    },
    buttonShowOnMap: {
        fontSize: 12,
        marginTop: 15,
    },
    victimName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '0.3em',
    },
    containerButtonMoreInfo: {
        position: 'absolute',
        right: 0,
        bottom: 5,
        textAlign: 'right',
    },
    homicideTime: {
        color: '#434343',
        display: 'inline',
    },
    homicideLocation: {
        color: '#434343',
        display: 'inline',
    },
    separator: {
        padding: [[0, 7.5]],
        color: '#434343',
    },
    item: {
        color: '#434343',
        margin: '10px auto',
    },
    subhead: {
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
        marginTop: 20,
        marginBottom: 5,
        paddingTop: 20,
        position: 'relative',
        fontWeight: 'bold',
    },
    subheadDiedOn: {
        paddingTop: 0,
        marginTop: 20,
        fontWeight: 'normal',
        color: '#999',
    },
    story: {
        margin: '10px auto',
        position: 'relative',
    },
    label: {
        color: '#777',
    },
    moreInfo: {
        paddingBottom: 50,
        marginTop: 40,
    },
    moreInfoSeparator: {
        width: 50,
        borderTop: '1px solid #ccc',
        marginBottom: 35,
    },
    [`@media (max-width: ${mobileCutoffWidth}px)`]: {
        containerButtonMoreInfo: {
            position: 'static',
            right: 'auto',
            bottom: 'auto',
        },
    },
});

function titleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.photoRef = React.createRef();
        this.state = {
            noImage: false,
        };
    }

    componentDidMount() {
        this.photoRef.current.addEventListener('error', () => {
            const noImage = true;
            this.setState({ noImage });
        });
    }

    handleClick = () => {
        const {onExpand, expanded, homicide} = this.props;
        if (!expanded) {
            onExpand(homicide.id);
        } else {
            onExpand(null);
        }
    };

    getAgeSentence(victim, personalPronoun) {
        if (victim.ageAtDeath === undefined) return null;
        const age = victim.ageAtDeath.raw;
        let ess = 's';
        if (age === 1) ess = '';
        const years = `${age} year${ess}`;

        return (
            <span>
                {titleCase(personalPronoun)} was {years} old when {personalPronoun} died.
            </span>
        );
    }

    getCauseOfDeath(homicide) {
        const {homicideAction} = homicide;
        let cause = 'died due to unknown cause';

        if (homicideAction !== null) {
            if (homicideAction === 'shot') cause = 'been fatally shot';
        }
        return <span>{cause}</span>;
    }

    // getChargesSentence = (homicide) => {
    //     const chargesFiled = homicide.wereChargesFiled === true;
    //     let count = 'No charges';
    //     if (chargesFiled) {
    //         count = 'Charges';
    //     }
    //     return (
    //         <span>
    //             {count} have been filed in this homicide.
    //         </span>
    //     )
    // }
    
    getCoverage(homicide) {
        const {classes} = this.props;
        const {coverage} = homicide;
        if (coverage.length === 0) return null;
        const stories = [
                    <div className={classes.story} key={`${homicide.id}--1`}>
                        <a href={coverage.link} target="_blank" rel="noopener noreferrer">{coverage.headline}</a>
                    </div>
            ];
        // const stories = coverage
        //     .map((story, i) => {
        //         const {link, headline} = story;
        //         return (
        //             <div className={classes.story} key={`${homicide.id}--${i}`}>
        //                 <a href={link} target="_blank" rel="noopener noreferrer">{headline}</a>
        //             </div>
        //         );
        //     });
        return (
            <div className={classNames(classes.item, classes.coverage)}>
                <div className={classes.subhead}>Coverage</div>
                {stories}
            </div>
        );
    }
    
    getImage(homicide) {
        const {classes} = this.props;
        const {id, victim} = homicide;
        const {photo} = victim;
    
        if (photo === undefined) {
            const src = `https://projects.jsonline.com/apps/Milwaukee-Homicide-Database/media/maps/${id}.png`
            return (
                <img ref={this.photoRef} className={classes.image} src={src} alt={`Homicide victim: ${victim.fullName}`} />
            );
        }
    
        return (
            <img ref={this.photoRef} className={classes.image} src={photo} alt={`Homicide victim: ${victim.fullName}`} />
        );
    }

    getMoreInfo = () => {
        const {homicide, classes} = this.props;
        const {victim} = homicide;
        const personalPronoun = victim.gender === 'female' ? 'she' : 'he';
        const possessivePronoun = victim.gender === 'female' ? 'her' : 'his';
        return (
            <div className={classes.moreInfo}>
                <div className={classes.moreInfoSeparator}></div>
                <p>
                    {victim.fullName} was found to have {this.getCauseOfDeath(homicide)} on {homicide.crimeDate.formatted}
                    . {titleCase(personalPronoun)} was discovered at {homicide.crimeSceneAddress}, and the Milwaukee County Medical
                    Examiner ruled {possessivePronoun} death a homicide.
                </p>
                <p>
                    {this.getAgeSentence(victim, personalPronoun)}
                </p>
{/*                <p>
                    {this.getChargesSentence(homicide)}
                </p>*/}

                {/* Coverage */}
                {this.getCoverage(homicide)}
            </div>
        );
    };

    handleShowOnMap = (id) => {
        const {onMap} = this.props;
        return () => {
            onMap(id);
        }
    };

    render() {
        const {homicide, classes, expanded} = this.props;
        const {victim} = homicide;

        const moreInfo = this.getMoreInfo();
        const moreInfoHeight = expanded ? 'auto' : 0;

        let showMapButton = null;
        if (expanded) {
            showMapButton = (
                <Button
                    color="primary"
                    onClick={this.handleShowOnMap(homicide.id)}
                    className={classes.buttonShowOnMap}
                    variant="outlined">
                    Show on map
                </Button>
            );
        }


        let imageContainer = null;
        if (!this.state.noImage) {
            imageContainer = (
                <div className={classes.imageContainer}>
                    {this.getImage(homicide)}
                </div>
            );
        }

        return (
            <Element className={classes.root} id={`Card--${homicide.id}`} name={`Card--${homicide.id}`}>
                <div className={classNames(classes.chunk, classes.chunkLeft)}>
                    {imageContainer}
                    {showMapButton}
                </div>
                <div className={classNames(classes.chunk, classes.chunkRight)}>
                    <div className={classes.victimName}>{victim.fullName}</div>
                    <div className={classNames(classes.subhead, classes.subheadDiedOn)}>Died on</div>
                    <div className={classes.homicideTime}>{homicide.crimeDate.formatted}</div>
                    <span className={classes.separator}>|</span>
                    <div className={classes.homicideLocation}>{homicide.crimeSceneAddress==null ? "" : homicide.crimeSceneAddress.trim()}</div>
                    <AnimateHeight
                        duration={333}
                        animateOpacity={true}
                        height={moreInfoHeight}
                        >
                        {moreInfo}
                    </AnimateHeight>
                    <div className={classes.containerButtonMoreInfo}>
                        <Button
                            color="primary"
                            onClick={this.handleClick}
                            className={classes.buttonMoreInfo}>
                            {expanded ? 'Collapse' : 'Expand'}
                        </Button>
                    </div>
                </div>
            </Element>
        )
    }
}

export default withStyles(styles)(Card);
