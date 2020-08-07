import { ALLOW_REGISTRATION } from "./type";

export const allowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  settings.allowRegistration = !settings.allowRegistration;
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration,
  };
};
