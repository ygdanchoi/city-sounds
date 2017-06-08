import * as APIUtil from '../util/tag_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

export const receiveTags = (tags) => {
  return {
    type: RECEIVE_TAGS,
    tags: tags
  };
};

export const fetchAllTags = () => (dispatch) => {
  return APIUtil.fetchAllTags().then(
    response => dispatch(receiveTags(response))
  );
};