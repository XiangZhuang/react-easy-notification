import React from "react";
import {
  Notifications,
  useNotification,
} from "./components/Notification/Notification";

const App = () => {
  const { pushNotification } = useNotification();
  const onPushPlainNotification = () => {
    pushNotification({
      type: "plain",
      text: "This is a plain notification",
    });
  };
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
  const onPushDangerNotification = () => {
    pushNotification({
      type: "danger",
      text: "This is a notification of danger",
    });
  };
  return (
    <div>
      <Notifications timeout={5000} />
      <div onClick={onPushPlainNotification}>
        <p>Push Plain Notification</p>
      </div>
      <div onClick={onPushSuccessNotification}>
        <p>Push Success Notification</p>
      </div>
      <div onClick={onPushInfoNotification}>
        <p>Push Info Notification</p>
      </div>
      <div onClick={onPushWarningNotification}>
        <p>Push Warning Notification</p>
      </div>
      <div onClick={onPushDangerNotification}>
        <p>Push Danger Notification</p>
      </div>
    </div>
  );
};

export default App;
