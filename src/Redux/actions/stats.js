import axios from 'axios';

export const getStats = () => async (dispatch) => {
  try {
    dispatch({ type: 'getStatsRequest' });
    const { data } = await axios.get('http://localhost:5000/api/stats');
    dispatch({ type: 'getStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getStatsFail',
      payload: error.response.data.message,
    });
  }
};

export const getCallEntries =
  ({ campaignId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'getCallEntryRequest' });
      const { data } = await axios.get(
        'http://localhost:5000/api/callentries?campaignId=' + campaignId
      );
      dispatch({ type: 'getCallEntrySuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'getCallEntryFail',
        payload: error.response.data.message,
      });
    }
  };
