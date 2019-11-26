import {
  ADD_MESSAGE, LOG_IN, LOG_OUT, ON_CONNECT, ON_DISCONNECT, REMOVE_MESSAGE,
} from './actionTypes';
import store from './store';

function sendNotification(title, options) {
  function clickFunc() { window.console.log('Перейти на сайт RS-CHAT'); }
  if (!('Notification' in window)) {
    window.console.log('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);
    notification.onclick = clickFunc;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(title, options);
        notification.onclick = clickFunc;
      } else {
        window.console.log('Вы запретили показывать уведомления');
      }
    });
  }
}

export const addMessage = (message) => {
  const lastMess = message.sort((a, b) => a.time - b.time)[message.length - 1];

  if (lastMess && document.hidden) {
    sendNotification(`RS-CHAT      -       ${lastMess.from}`, {
      body: lastMess.message,
      dir: 'auto',
    });
  }
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
    },
  };
};

export const removMessage = () => ({
  type: REMOVE_MESSAGE,
});

export const logIn = (name) => ({
  type: LOG_IN,
  payload: {
    name,
  },
});

export const logOut = () => {
  localStorage.removeItem('userName');
  return {
    type: LOG_OUT,
  };
};

export const onDisconnect = () => ({
  type: ON_DISCONNECT,
});

export const onConnect = () => {
  const socket = new WebSocket('wss://wssproxy.herokuapp.com/');
  store.dispatch(removMessage());
  socket.onclose = () => {
    store.dispatch(onDisconnect());
    setTimeout(() => { store.dispatch(onConnect()); }, 5000);
  };
  return {
    type: ON_CONNECT,
    payload: {
      socket,
    },
  };
};
