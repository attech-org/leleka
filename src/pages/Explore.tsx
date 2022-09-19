import { useState } from "react";
import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";
import ws from "../services/getWebSocket";
import localDateTime from "../services/localDateTime";

interface InfoMessage {
  message: string;
  dateTime: Date;
}

const ExplorePage: React.FunctionComponent = () => {
  const [messages, setMessages] = useState<InfoMessage[]>([]);

  ws.onopen = () =>
    setMessages([{ dateTime: new Date(), message: "connected" }, ...messages]);
  ws.onmessage = (currentMessage) => {
    setMessages([
      { dateTime: new Date(), message: currentMessage.data },
      ...messages,
    ]);
    if (messages.length > 10) {
      messages.length = 10;
      setMessages(messages);
    }
  };

  const { t } = useTranslation();
  return (
    <Layout title={t("pageTitles:explorePage")}>
      Explore
      <ul>
        {messages.map((currentMessage, index) => (
          <li key={index}>
            <strong>{localDateTime(currentMessage.dateTime)}</strong>
            {currentMessage.message}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ExplorePage;
