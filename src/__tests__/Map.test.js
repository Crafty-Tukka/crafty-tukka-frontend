import React from 'react';
import {render} from '@testing-library/react';
import Map from '../components/map/Map';

describe('Landing page renders google maps', () => {
  it('1. MapView isLoaded renders', () => {
    const isLoaded = render(<Map />);
    expect(isLoaded).toBeTruthy();
  });

  it('2. MapView displays Markers', () => {
    expect(Map()).toContain('Royal Park');
  });
});

describe('Landing page centers on Melbourne longitude and Latitude', () => {
  it('1. displays Melbourne longitude', () => {
    expect(center.lng).toEqual(144.946457);
  });

  it('2. displays Melbourne latitude', () => {
    expect(center.lat).toEqual(-37.840935);
  });
});
