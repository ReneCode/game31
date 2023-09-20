import { useAbly, useChannel, useConnectionStateListener } from "ably/react";
import { useState } from "react";

interface IChannelMessage {
  ClientId: string;
  data: string;
  name: string;
  connectionId: string;
}

const Message = () => {
  const ablyClient = useAbly();
  const [message, setMessage] = useState("");

  const { channel } = useChannel("ch-A", ({ data }: IChannelMessage) => {
    setMessage(data);
    console.log(data);
  });

  // useConnectionStateListener((change) => {
  //   console.log(">>>", change);
  // });

  const onClick = async () => {
    const data = "hello message";
    const data_ = {
      name: "bla",
      age: 42,
      cards: [3, 6, 3, 4, 6, 78, 12, 234, 5],
    };

    ablyClient.channels.get("ch-A").publish("", data);
  };

  return (
    <div>
      <button onClick={onClick}>Send</button>
      <div>{message}</div>
    </div>
  );
};

export default Message;
