import { NOTIFY_USER } from "../Actions/type";
const initailState = {
  message: null,
  messageType: null,
};
export default function (state = initailState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
      };
    default:
      return state;
  }
}
