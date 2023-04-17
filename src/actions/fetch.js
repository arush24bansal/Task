import Global from '../../Global';
import axios from 'axios';

export default () => {
  return async (dispatch, getState) => {
    axios
      .get(Global.API_URL)
      .then(response => {
        dispatch({
          type: 'FETCH',
          payload: response.data.results,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
