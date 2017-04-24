import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import SoundsReducer from './sounds_reducer';
import CollectionsReducer from './collections_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  sounds: SoundsReducer,
  collections: CollectionsReducer
});

export default RootReducer;
