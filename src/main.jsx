import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={
        <img src="/images/logo.png" alt="loading" className="h-20 w-20" />
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);
