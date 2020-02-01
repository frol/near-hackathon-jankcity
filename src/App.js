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
    alert("You have joined! Stay tuned!");
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
          {/*<img className="logo" src={nearlogo} alt="NEAR logo" />*/}
          {/*<h2>hmm</h2>*/}
          <div className={"hackathon-text"}>
            <p>
              NEAR protocol is a new blockchain focused on developer
              productivity and useability! In this demonstration we're going to
              interact with the blockchain and see a live change on the
              projector.
            </p>
            <p>
              <b>So what's going to happen?</b>
            </p>
            <p>
              You will login to your new, handy-dandy NEAR account. We keep
              track of the number of participants who log in and update a simple
              value on the blockchain.
            </p>
            <p>
              <strong>How do you store this info?</strong>
            </p>
            <p>
              I'm glad you asked, for this demonstration we used AssemblyScript,
              but you can also use Rust.
            </p>
            <p>
              <strong>Tell me more!</strong>
            </p>
            <p>Sure, grab one of us at the booth, we'd love to chat!</p>
          </div>
          <div>
            {this.state.login ? (
              <button onClick={this.joinNear}>Join NEAR!</button>
            ) : null}{" "}
            {this.state.login ? (
              <button onClick={this.requestSignOut}>Log out</button>
            ) : (
              <button onClick={this.requestSignIn}>Sure I'll try it!</button>
            )}
          </div>
          {/*<div>*/}
          {/*<p>*/}
          {/*<span role="img" aria-label="net">*/}
          {/*🕸*/}
          {/*</span>{" "}*/}
          {/*<a className="App-link" href="https://nearprotocol.com">*/}
          {/*NEAR Website*/}
          {/*</a>{" "}*/}
          {/*<span role="img" aria-label="net">*/}
          {/*🕸*/}
          {/*</span>*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*<span role="img" aria-label="book">*/}
          {/*📚*/}
          {/*</span>*/}
          {/*<a className="App-link" href="https://docs.nearprotocol.com">*/}
          {/*{" "}*/}
          {/*Learn from NEAR Documentation*/}
          {/*</a>{" "}*/}
          {/*<span role="img" aria-label="book">*/}
          {/*📚*/}
          {/*</span>*/}
          {/*</p>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default App;
