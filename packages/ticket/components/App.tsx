import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  ADAPTER_EVENTS
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../lib/ethersRPC";

const clientId =
  "BG81YR2uJ5IbAL6raEM4k3Tca07ToXQBjPVhFQEUWl6a9fJDq8u0sGAFu0aA4ztrh6l9VZxi7CZc3S4IFgHFnq0";

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [accounts, setAccounts] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com" // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["facebook", "google"],
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg" // Your App Logo Here
          }
        });
        web3auth.on(ADAPTER_EVENTS.CONNECTED, async data => {
          setProvider(web3auth.provider);
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "none" // Pass on the mfa level of your choice: default, optional, mandatory, none
          },
          adapterSettings: {
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true // whether to enable dark mode. defaultValue: false
            }
          }
        });
        web3auth.configureAdapter(openloginAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                google: {
                  name: "google login",
                  logoDark:
                    "url to your custom logo which will shown in dark mode"
                },
                facebook: {
                  // it will hide the facebook option from the Web3Auth modal.
                  name: "facebook login",
                  showOnModal: false
                }
              },
              // setting it to false will hide all social login methods from modal.
              showOnModal: true
            }
          }
        });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (provider) {
      getAccounts();
    }
  }, [provider]);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setMessage(JSON.stringify(user));
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAccounts(address);
    console.log(address);
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <h1>Ticket</h1>
        <h2>{accounts}</h2>
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
      </div>

      <div style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <div className="grid">
        {web3auth?.status === "connected" ? loggedInView : unloggedInView}
      </div>
    </div>
  );
}

export default App;
