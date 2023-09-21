export type User = {
  id: string;
  name: string;
};

const addOrChangeUser = (user: User, userList: User[]): User[] => {
  let found = false;
  const newList = userList.map((u) => {
    if (u.id === user.id) {
      found = true;
      return user;
    } else {
      return u;
    }
  });
  if (!found) {
    newList.push(user);
  }
  return newList;
};

interface IGameState {
  userList: User[];
}

type GameAction = {
  type: "userEnter";
  clientId: string;
};

const initialGameState: IGameState = {
  userList: [],
};

const gameAction = (state: IGameState, action: GameAction): IGameState => {
  const newState = { ...state };

  switch (action.type) {
    case "userEnter":
      {
      }
      break;

    default:
      throw new Error("bad action type:", action.type);
  }
  return newState;
};

const gameState = initialGameState;

export { addOrChangeUser, gameAction };
