import axios from 'axios';

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
