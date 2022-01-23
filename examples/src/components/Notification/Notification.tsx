import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoCloseOutline } from "react-icons/io5";
import style from "./Notification.module.scss";

interface Notification {
  id: number;
  type: "plain" | "success" | "danger" | "warning" | "info";
  text: string;
}

interface UseNotification {
  notifications: Array<Notification>;
  pushNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<any>({});

const useNotification: () => UseNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw Error("useNotification must be used within a NotificationProvider");
  return context;
};

const NotificationProvider = (props: { children: any }) => {
  const { children } = props;
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const generateId = () => {
    if (!notifications.length) return 0;
    else
      return (
        Math.max(
          ...notifications.map((notification: Notification) => notification.id)
        ) + 1
      );
  };
  const pushNotification = (notification: any) => {
    const updated = [
      ...notifications,
      {
        ...notification,
        id: generateId(),
      },
    ];
    setNotifications(updated);
  };
  const removeNotification = (id: number) => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id)
    );
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        pushNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

interface AlertProps {
  notification: Notification;
  timeout: number;
  heights: Array<{ id: number; value: number }>;
  addHeight: (id: number, value: number) => void;
  removeHeight: (id: number) => void;
}

const Alert = (props: AlertProps) => {
  const { notifications, removeNotification } = useNotification();
  const { notification, heights, timeout, addHeight, removeHeight } = props;
  const [show, setShow] = useState(true);

  // Check if is unmounted
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const initHeight = heights
    .map((height) => height.id)
    .includes(notification.id);

  const notifIndex = notifications
    .map((notif: Notification) => notif.id)
    .indexOf(notification.id);

  const destroy = () => {
    if (mounted.current) {
      setShow(false);
      setTimeout(() => {
        removeNotification(notification.id);
        removeHeight(notification.id);
      }, 500);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      destroy();
    }, timeout);
  }, []);

  return (
    <div
      className={`${style.alert} ${show ? style.appear : style.disappear} ${
        style[notification.type]
      }`}
      style={{
        top: heights
          .map((height) => height.value)
          .slice(0, notifIndex)
          .reduce((prev: number, curr: number) => prev + curr + 10, 0),
      }}
      ref={(ref) => {
        if (!initHeight && ref?.clientHeight)
          addHeight(notification.id, ref?.clientHeight);
      }}
    >
      <div className={style.content}>
        <p className={style.text}>{notification.text}</p>
      </div>
      <div className={style.close} onClick={() => destroy()}>
        <IoCloseOutline size={22} />
      </div>
    </div>
  );
};

interface NotificationsProps {
  timeout?: number;
}

const Notifications = (props: NotificationsProps) => {
  const { timeout = 3000 } = props;
  const { notifications } = useNotification();
  const [heights, setHeights] = useState<
    Array<{
      id: number;
      value: number;
    }>
  >([]);
  const addHeight = (id: number, value: number) => {
    setHeights([
      ...heights,
      {
        id,
        value,
      },
    ]);
  };
  const removeHeight = (id: number) => {
    setHeights((heights) => heights.filter((height) => height.id !== id));
  };
  return (
    <div className={style.notifications}>
      {notifications.map((notification: Notification) => (
        <Alert
          notification={notification}
          key={notification.id}
          heights={heights}
          addHeight={addHeight}
          removeHeight={removeHeight}
          timeout={timeout}
        />
      ))}
    </div>
  );
};

export { Notifications, useNotification, NotificationProvider };
