import axios from 'axios';

export const getCallEntries =
  ({ campaignId, startDate, endDate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'getCallEntryRequest' });
      const { data } = await axios.get(
        `https://dashboardbackend-dq4m.onrender.com/callentries?campaignId=${
          campaignId || ''
        }&startDate=${startDate || ''}&endDate=${endDate || ''}`
      );
      dispatch({ type: 'getCallEntrySuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'getCallEntryFail',
        payload: error.response.data.message,
      });
    }
  };
