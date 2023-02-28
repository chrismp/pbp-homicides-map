import {fromJS} from 'immutable';
import MAP_STYLE from './base-map-style.json';

export const homicidesLayer = fromJS({
  id: 'homicides',
  source: 'homicides',
  type: 'symbol',
  interactive: true,
  layout: {
    'icon-image': 'marker-11',
    'icon-anchor': 'bottom',
    'icon-allow-overlap': true,
    'icon-pitch-alignment': 'viewport'
  }
});

export const baseMapStyle = fromJS(MAP_STYLE);
