import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import SoundsReducer from './sounds_reducer';
import CollectionsReducer from './collections_reducer';
import ErrorsReducer from './errors_reducer';
import NavBarStateReducer from './nav_bar_state_reducer';
import TagsReducer from './tags_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  sounds: SoundsReducer,
  collections: CollectionsReducer,
  errors: ErrorsReducer,
  navBarState: NavBarStateReducer,
  tags: TagsReducer,
});

export default RootReducer;
