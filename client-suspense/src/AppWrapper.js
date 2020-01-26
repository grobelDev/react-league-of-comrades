import React, { useState } from 'react';
import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom';

import App from './App';
import { fetchUserDataV2 } from './locApi';

let resourceCache = {};

export default function AppWrapper() {
  let UserMatch = useRouteMatch('/:region/:name');
  let resource;
  if (UserMatch) {
    const params = UserMatch.params;
    const name = params.name;
    const region = params.region;

    if (resourceCache[name]) {
      resource = resourceCache[name];
    } else {
      resource = fetchUserDataV2(name, region);
      resourceCache[name] = resource;
    }
  } else {
    resource = fetchUserDataV2('Doublelift', 'na1');
    resourceCache['Doublelift'] = resource;
  }

  return <App resource={resource}></App>;
}
