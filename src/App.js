import React, { Component } from "react";
import logo from "./assets/logo.svg";
import nearlogo from "./assets/gray_near_logo.svg";
import near from "./assets/near.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null
    };
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.joinNear = this.joinNear.bind(this);
  }

  componentDidMount() {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  async signedInFlow() {
    console.log("come in sign in flow");
    this.setState({
      login: true
    });
    const accountId = await this.props.wallet.getAccountId();
    if (window.location.search.includes("account_id")) {
      window.location.replace(
        window.location.origin + window.location.pathname
      );
    }
    this.props.contract
      .welcome({ name: accountId })
      .then(response => this.setState({ speech: response.text }));
  }

  async requestSignIn() {
    const appTitle = "NEAR Jankcity";
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    );
  }

  requestSignOut() {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn());
  }

  signedOutFlow() {
    if (window.location.search.includes("account_id")) {
      window.location.replace(
        window.location.origin + window.location.pathname
      );
    }
    this.setState({
      login: false,
      speech: null
    });
  }

  async joinNear() {
    const q = await this.props.contract.incrementParticipation();
    console.log("QQ", q);
  }

  render() {
    let style = {
      fontSize: "1.5rem",
      color: "#0072CE",
      textShadow: "1px 1px #D1CCBD"
    };
    return (
      <div className="App-header">
        <div className="image-wrapper">
          <img className="logo" src={nearlogo} alt="NEAR logo" />
          <p>
            NEAR protocol is a new blockchain focused on developer productivity
            and useability!
          </p>
          {this.state.login ? (
            <p>
              <button onClick={this.joinNear}>Join NEAR!</button>
            </p>
          ) : null}
        </div>
        <div>
          {this.state.login ? (
            <button onClick={this.requestSignOut}>Log out</button>
          ) : (
            <button onClick={this.requestSignIn}>Log in with NEAR</button>
          )}
        </div>
        <div>
          <p>
            <span role="img" aria-label="net">
              🕸
            </span>{" "}
            <a className="App-link" href="https://nearprotocol.com">
              NEAR Website
            </a>{" "}
            <span role="img" aria-label="net">
              🕸
            </span>
          </p>
          <p>
            <span role="img" aria-label="book">
              📚
            </span>
            <a className="App-link" href="https://docs.nearprotocol.com">
              {" "}
              Learn from NEAR Documentation
            </a>{" "}
            <span role="img" aria-label="book">
              📚
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
