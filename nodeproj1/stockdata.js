const axios = require('axios');
// const apiKey = 'ALPHA_VANTAGE_API_KEY';
const apiKey = 'SFCOAT63RR7F196J';

const getRealTimeData = async (symbol) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: '1min',
                apikey: apiKey
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getRealTimeData('AAPL');  // Example for Apple Inc.
