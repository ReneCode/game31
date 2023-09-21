import { useMemo, useState } from "react";

import debounce from "lodash/debounce";

import styles from "./CollectUser.module.css";
import { useAblyChannel } from "./useAblyChannel";
import { useAbly, useConnectionStateListener, usePresence } from "ably/react";
import { User, addOrChangeUser } from "../actions/gameState";

const CHANNEL = "ch-a";
// const myClientId = nanoid();

let debounceFunction = debounce(() => {}, 10);

const CollectUser = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const ablyClient = useAbly();
  const clientId = ablyClient.auth.clientId;
  const { presenceData, updateStatus } = usePresence(
    CHANNEL,
    "initialPresence",
    (data: any) => {
      changePresence(data);
    }
  );

  const onUserNameChange = (ev: any) => {
    const userName = ev.target.value;
    const user = { id: clientId, name: userName };
    debounceFunction.cancel();
    debounceFunction = debounce(() => {
      publish(user);
    }, 500);
    debounceFunction();
  };

  const { publish } = useAblyChannel(CHANNEL, (user: User) => {
    // console.log("got from channel", user);
    const newUserList = addOrChangeUser(user, userList);
    setUserList(newUserList);
  });

  const changePresence = (data: any) => {
    switch (data.action) {
      case "leave":
        {
          const leaveClientId = data.clientId;

          // const list = userList.filter((u) => u.id !== leaveClientId);
          setUserList((list) => {
            return list.filter((u) => u.id !== leaveClientId);
          });
        }
        break;

      case "enter": {
        const enterClientId = data.clientId;
        setUserList((list) => {
          return list.concat({
            id: enterClientId,
            name: enterClientId,
          });
        });
      }
    }

    // console.log("change presence>", data);
  };

  useConnectionStateListener((data) => {
    console.log("connection-state >>>", data);
  });

  const onStart = () => {};

  return (
    <div className={styles.container}>
      collecting user
      <div className="user-list">
        {userList.map((user) => {
          if (user.id === clientId) {
            return (
              <input
                className={styles.input}
                key={user.id}
                placeholder="enter your name"
                onChange={onUserNameChange}
              ></input>
            );
          } else {
            return <div key={user.id}>{user.name}</div>;
          }
        })}
      </div>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default CollectUser;
