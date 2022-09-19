let wsURL = process.env.REACT_APP_SERVER_URL;

if (wsURL) {
  const url = new URL(wsURL);
  wsURL = wsURL.replace(url.protocol + "//", "ws://");
}

const ws = new WebSocket(wsURL || "");

export default ws;
