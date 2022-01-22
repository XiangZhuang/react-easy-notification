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
  return (
    <div>
      <Notifications />
      <div onClick={onPushSuccessNotification}>
        <p>Push Success Notification</p>
      </div>
    </div>
  );
};

export default App;
