import React from "react";
import {
  Notifications,
  useNotification,
} from "./components/Notification/Notification";

const App = () => {
  const { pushNotification } = useNotification();
  const onPushSuccessNotification = () => {
    pushNotification({
      type: "success",
      text: "This is a notification for success",
    });
  };
  const onPushInfoNotification = () => {
    pushNotification({
      type: "info",
      text: "This is a notification of info",
    });
  };
  const onPushWarningNotification = () => {
    pushNotification({
      type: "warning",
      text: "This is a notification of warning",
    });
  };
  return (
    <div>
      <Notifications />
      <div onClick={onPushSuccessNotification}>
        <p>Push Success Notification</p>
      </div>
      <div onClick={onPushInfoNotification}>
        <p>Push Info Notification</p>
      </div>
      <div onClick={onPushWarningNotification}>
        <p>Push Warning Notification</p>
      </div>
    </div>
  );
};

export default App;
