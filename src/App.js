import React, { Component } from 'react';
import { ajax } from 'jquery';
import { timeParse } from 'd3';
import { includes, difference, union, clone } from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {scroller} from 'react-scroll';
import Nav from './components/Nav/';
import Intro from './components/Intro/';
import Map from './components/Map/';
import List from './components/List/';
import Filters from './components/Filters/';
import MoreInfo from './components/More-Info/';
import ExpandedMap from './components/Expanded-Map/';
import UCRMoreInfo from './components/UCR-More-Info/';
import HomicideCount from './components/Homicide-Count/';
import detailFiltersSpec from './components/Filters/detail-filters-spec';

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

function all(values) {
  return values.reduce((a, b) => { return a & b; });
}

function any(values) {
  return values.reduce((a, b) => { return a | b; });
}

const initialDetails = detailFiltersSpec.filters
  .map(filter => filter.id)
  .reduce((object, id) => { object[id] = []; return object }, {});

const initialViewport = {
  latitude: 26.669890622346635, 
  longitude: -80.3679338462279, 
  zoom: 9,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#56564e',
    },
    secondary: {
      main: '#c4c393',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Unify Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    fontSize: 18,
    h1: {fontWeight: 700},
    h2: {fontWeight: 700},
    h3: {fontWeight: 700},
    h4: {fontWeight: 700},
    h5: {fontWeight: 700},
    h6: {fontWeight: 700},
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homicides: [],
      showMoreInfo: false,
      showExpandedMap: false,
      UCR: true,
      year: 2022,
      details: initialDetails,
      viewport: initialViewport,
      expandedCard: null,
      dataLoaded: false,
    };
  }

  componentDidMount() {
    // const url = 'https://homicidesv3.dhb.io/api/list-homicides/2010-1-1_2023-1-1/?spaceless=true';
    // const url = 'https://pbcdata.com/pbp-homicides/pbp-homicides-min.json';
    const url = 'pbp-homicides-min.json';
    const parseDate = timeParse('%Y-%m-%d');
    ajax({
      url,
      dataType: 'json',
      success: ({homicides}) => {
        homicides.forEach((d) => { d.crimeDate.date = parseDate(d.crimeDate.date); });
        this.setState({homicides, dataLoaded: true});
      },
    });
  }

  dateFilter = (homicide) => {
    const { year } = this.state;
    var crimeDate = homicide.crimeDate.date;
    return crimeDate == null ? null : crimeDate.getFullYear() === year;
  }

  ucrFilter = (homicide) => {
    const { UCR } = this.state;
    if (UCR) return homicide.isUCRReportable;
    else return true;
  }

  detailFilters = () => {
    const { details } = this.state;

    const filters = Object.keys(details)
      .map((filterId) => {
        const choiceIds = details[filterId];
        
        if (choiceIds.length === 0) return () => true;

        const choiceFilters = choiceIds.map((choiceId) => {
          return detailFiltersSpec
            .filters[filterId]
            .choices[choiceId]
            .filter;
        });
        
        return (homicide) => {
          return any(choiceFilters.map(choiceFilter => choiceFilter(homicide)));
        };
      });

    return (homicide) => {
      return filters
        .map((filter) => { return filter(homicide); });
    };
  };

  getVisibleHomicides = () => {
    const detailFilters = this.detailFilters();

    const filters = (d) => {
      return [this.dateFilter(d), this.ucrFilter(d)].concat(detailFilters(d));
    };

    return this.state.homicides
      .filter(d => all(filters(d)))
      .sort((a, b) => b.crimeDate.date - a.crimeDate.date);
  }

  handleMapSelect = (id) => {
    scroller.scrollTo(`Card--${id}`, {
      duration: 1000,
      smooth: true,
      offset: -80,
    });
    this.setState({showExpandedMap: false, expandedCard: id});
  };

  handleToggleMoreInfo = () => {
    const {showMoreInfo} = this.state;
    this.setState({showMoreInfo: !showMoreInfo});
  };

  handleToggleExpandedMap = () => {
    const {showExpandedMap} = this.state;
    this.setState({showExpandedMap: !showExpandedMap});
  };

  handleChangeUCR = (UCR) => {
    this.setState({UCR});
  }

  handleChangeYear = (year) => {
    this.setState({year});
  }

  handleClickDetail = ([filterId, choiceId]) => {
    const newDetails = clone(this.state.details);
    const choiceIds = newDetails[filterId];
    if (includes(choiceIds, choiceId)) {
      newDetails[filterId] = difference(choiceIds, [choiceId]);
    } else {
      newDetails[filterId] = union(choiceIds, [choiceId]);
    }
    this.setState({ details: newDetails });
  }

  handleClearDetail = (filterId) => {
    const newDetails = clone(this.state.details);
    newDetails[filterId] = [];
    this.setState({ details: newDetails });
  }

  handleOpenUCRInfo = () => {
    this.setState({showUCRMoreInfo: true});
  }

  handleCloseUCRInfo = () => {
    this.setState({showUCRMoreInfo: false});
  }

  handleMapHomicide = (id) => {
    const homicide = this.state.homicides.filter(d => d.id === id)[0];
    const viewport = {
        latitude: homicide.crimeLocationLatitude,
        longitude: homicide.crimeLocationLongitude,
        zoom: 16,
    };
    this.setState({viewport, showExpandedMap: true});
  }

  handleViewportChange = (viewport) => {
    this.setState({viewport});
  };

  handleExpandCard = (expandedCard) => {
    this.setState({expandedCard});
  };

  getLoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div className="loading--innards">
          <i className="loading--icon fas fa-circle-notch fa-spin"></i><span className="loading--label">Loading</span>
        </div>
      </div>
    )
  }

  render() {
    const {
      homicides: allHomicides,
      showUCRMoreInfo,
      showMoreInfo,
      showExpandedMap,
      UCR,
      year,
      details,
      viewport,
      expandedCard,
      dataLoaded,
    } = this.state;

    const homicides = this.getVisibleHomicides();

    let content = null;

    if (dataLoaded) {
      let map = null;
      if (!showExpandedMap) {
        map = (
          <Map
            homicides={homicides}
            onSelect={this.handleMapSelect}
            isExpanded={false}
            onExpand={this.handleToggleExpandedMap}
            viewport={viewport}
            onViewportChange={this.handleViewportChange}
          />
        );
      }
      content = (
        <div>
          <div className="Container--Intro">
            <Intro homicides={allHomicides} />
          </div>
          
          <div className="Container--Map">
            {map}
          </div>
          <div className="Container--Filters">
            <h2>Homicide victims</h2>
            <p>
              The Journal Sentinel is tracking homicides in Milwaukee to memorialize the victims and
              better understand deadly violence in the city. The tracker is updated as regularly as
              possible.
            </p>
            <p>
              Anyone with information about these homicide cases can call Milwaukee police at
              (414) 935-7360. Callers can remain anonymous.
            </p>
            <p>
              Help us remember homicide victims: Please email photos to <a href="mailto:jsmetro@jrn.com?subject=Homicide%20Tracker%20Submission">jsmetro@jrn.com</a> with the
              victim's name, as well as your name and contact information so a reporter or editor
              can follow up.
            </p>
            <p>
              The FBI's Uniform Crime Reporting (UCR) criteria for homicides is used by the Milwaukee
              Journal Sentinel and law enforcement agencies for consistent comparisons between years.
              <Button
                onClick={this.handleOpenUCRInfo}
                color="inherit"
                style={{fontSize: 10, padding: '0px 4px', margin: '0px 8px'}}
                variant="outlined">
                <i
                  className="fas fa-info-circle"
                  style={{paddingRight: 5}}
                  >
                </i>
                Learn more
              </Button>
            </p>
            <p><b>STORY:</b> <a href="https://projects.jsonline.com/news/2019/3/21/milwaukee-murders-many-unsolved-fewer-than-half-end-with-convictions.html">In Milwaukee, less than half of all homicides end in a suspect convicted of a crime. What that does to a family – and a city.</a></p>
            <div className="Resources">
              <b>RESOURCES:</b>
              <ul>
                <li><a href="https://www.jsonline.com/story/news/special-reports/milwaukee-violence/2019/03/21/how-find-support-during-grieving-process-after-homicide/3149817002/">Grieving after a death? Here’s a list of organizations you can turn to for support</a></li>
                <li><a href="https://www.jsonline.com/story/news/special-reports/milwaukee-violence/2019/03/21/how-help-families-homicide-victims-milwaukee/3148130002/">Lost someone to homicide or want to help someone who has? Here’s a list of organizations making a difference in Milwaukee</a></li>
              </ul>
            </div>
  
            <HomicideCount count={homicides.length} />
  
            <Filters
              homicides={homicides}
              onChangeUCR={this.handleChangeUCR}
              UCR={UCR}
              onChangeYear={this.handleChangeYear}
              year={year}
              detailFiltersSpec={detailFiltersSpec}
              details={details}
              onClickDetail={this.handleClickDetail}
              onClearDetail={this.handleClearDetail}
            />
          </div>
  
          <div className="Container--List">
            <List
              homicides={homicides}
              expandedCard={expandedCard}
              onExpand={this.handleExpandCard}
              onMap={this.handleMapHomicide}
            />
          </div>
        </div>
      );
    } else {
      content = this.getLoadingScreen();
    }

    let expandedMap = null;
    if (showExpandedMap) {
      expandedMap = (
        <ExpandedMap
          homicides={homicides}
          onSelect={this.handleMapSelect}
          isOpen={showExpandedMap}
          onClose={this.handleToggleExpandedMap}
          viewport={viewport}
          onViewportChange={this.handleViewportChange}
        />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App" id="App">
          <Nav
            showMoreInfo={showMoreInfo}
            onClickMoreInfo={this.handleToggleMoreInfo}
          />

          {content}

          <MoreInfo
            isOpen={showMoreInfo}
            onClose={this.handleToggleMoreInfo}
          />
          
          {expandedMap}

          <UCRMoreInfo
            isOpen={showUCRMoreInfo}
            onClose={this.handleCloseUCRInfo}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
