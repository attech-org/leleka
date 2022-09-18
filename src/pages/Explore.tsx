import { useState } from "react";
import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const wsURI = process.env.REACT_APP_WEBSOCKET_URL;
const ws = new WebSocket(wsURI || "");

const ExplorePage: React.FunctionComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  ws.onopen = () => setMessages(["connected", ...messages]);
  ws.onmessage = (currentMessage) =>
    setMessages([currentMessage.data, ...messages]);
  const { t } = useTranslation();
  return (
    <Layout title={t("pageTitles:explorePage")}>
      Explore
      <li>
        {messages.map((currentMessage, index) => (
          <ul key={index}>{currentMessage}</ul>
        ))}
      </li>
    </Layout>
  );
};

export default ExplorePage;
