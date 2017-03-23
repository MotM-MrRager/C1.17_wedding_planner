'use strict';

import user from './api/user/index';
import planner from './api/wedding_planner/index';
//import pref from './api/preferences/index';

export default function(app) {
  app.use('/api/user', user);
  app.use('/api/wedding_planner', planner);
  //app.use('/api/preferences', pref);
}
