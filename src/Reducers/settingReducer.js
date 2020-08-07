import { ALLOW_REGISTRATION } from "../Actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload,
      };
    default:
      return state;
  }
}
