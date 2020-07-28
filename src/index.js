import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {inject, observer, Provider} from 'mobx-react';
import {observable, action, configure, runInAction} from 'mobx';
import * as serviceWorker from './serviceWorker';

configure({enforceActions: true}); // don't allow state modifications outside actions

const alertStore = observable.object({
  isShowError: false,
  errorMessage: null,

  setError(isError = false, errorMessage = null) {
    this.isShowError = isError;
    this.errorMessage = errorMessage;
  },
}, {
  setError: action.bound,
});

const userStore = observable.object({
  user: null,

  get userName() {
    return this.user && `${this.user.firstName} ${this.user.lastName}`;
  },

  successful() {
    setTimeout(() => {
      runInAction(() => {
        this.user = {
          firstName: 'Dimasta',
          lastName: 'Sosyasta',
        };
      });
      alertStore.setError(false, null);
    }, 1000);
  },

  failure() {
    setTimeout(() => {
      alertStore.setError(true, 'ZALOOPA');
    }, 1000);
  },
}, {
  successful: action.bound,
  failure: action.bound,
});

const stores = {
  userStore,
  alertStore,
};

const App = inject(
    'userStore',
)(observer(({
  userStore,
}) => {
  return (
      <div>
        <h3>
          {userStore.userName || 'Данных об юзере нет'}
        </h3>
        <button onClick={userStore.successful}>
          Загрузить данные с серва
        </button>
        <button onClick={userStore.failure}>
          Загрузить данные с серва с ошибкой
        </button>
      </div>
  );
}));

const ErrorAlert = ({message}) => (
    <div>
      <h1>ALERT</h1>
      <h6>{message}</h6>
    </div>
);

const AppMiddleware = inject('alertStore')(observer(({
  alertStore, children,
}) => {

  if (alertStore.isShowError) {
    return (<ErrorAlert message={alertStore.errorMessage}/>);
  }

  return (
      <div>
        {children}
      </div>
  );
}));

ReactDOM.render(
    <React.StrictMode>
      <Provider {...stores} >
        <AppMiddleware>
          <App/>
        </AppMiddleware>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
