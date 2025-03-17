const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  socketioURL: import.meta.env.VITE_SOCKETIO_URL,
  maxCandlesOnPage: import.meta.env.VITE_MAX_CANDLES_ON_PAGE,
  toolTipWidth: 80,
  toolTipHeight: 80,
};

export default config;
