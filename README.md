# react-easy-notification
Notification component and hooks provided for react development

### Documentation

This package provides three exports:
`NotificationProvider`, `Notifications`, `useNotification`
<br/><br/>
####NotificationProvider
`NotificationProvider` is required to wrap the whole application.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NotificationProvider } from "./components/Notification/Notification";

ReactDOM.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
  document.getElementById("app")
);
ReactDOM.render(<NotificationProvider></NotificationProvider>)
```
<br/>

####Notifications
`Notifications` is the component to render notifications

```javascript
import React from "react";
import { Notifications } from "./components/Notification/Notification";

const App = () => {
  return (
    <div>
      <Notifications timeout={5000} />
    </div>
  );
};

export default App;
```
<br/>

####useNotification

`useNotification` provides three utility tools

* `pushNotification` accepts an object of notification to be rendered
```javascript
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
```
* `removeNotification` accepts an id of the notification to be removed
* `notifications` contains all visible notifications

### Directory Structure

- `/src`

    - contains code for release

- `/examples`

    - contains examples in typescript (run by `npm run start`)
    - contains a copy of notification component for local development

### Development Procedures

1. Develop (new features, bug fix ......) under examples
2. Copy the code under `/examples/src/components/Notification` to `/src`