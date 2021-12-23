import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

//Import Thirdweb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

//Include what chains you wanna support.Here 4 = Rinkeby
const supportedChainIds = [4];

//Including the type of wallet I want to support
//In this case, we are using Metamask which is a type of "injected wallet"
const connectors = {
  injected: {},
}


// The ThirdWebProvider holds the user's authenticated wallet data (if they've connected to the website before) and passes it to the App
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
