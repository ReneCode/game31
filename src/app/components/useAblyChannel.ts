import { useAbly, useChannel } from "ably/react";

const useAblyChannel = (channelName: string, callback: (data: any) => void) => {
  const ablyClient = useAbly();

  const { channel } = useChannel(channelName, (msg: any) => {
    callback(msg.data);
    // console.log(msg);
  });

  return {
    publish: (data: any) => {
      ablyClient.channels.get(channelName).publish("", data);
    },
  };
};

export { useAblyChannel };
