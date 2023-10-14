import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
    };
  }

  loadKommunicateScript() {
    const kommunicateSettings = {
      appId: "2fab23136c4ab8c3a15499d7e8f3a463c",
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    const h = document.getElementsByTagName("head")[0];
    h.appendChild(s);
    window.kommunicate = this;
    this._globals = kommunicateSettings;
    this.setState({ scriptLoaded: true });
  }

  componentDidMount() {
    console.log("componentDidMount: Script loading attempt");
    this.loadKommunicateScript();
  }

  componentDidUpdate() {
    if (!this.state.scriptLoaded) {    
        console.log("componentDidUpdate: Script loading attempt");
      this.loadKommunicateScript();
    }
  }

  componentWillUnmount() {
    // Remove or unload the Kommunicate script or related objects
    // This can include resetting any global variables or removing event listeners.
    
    // Example:
    
    // Remove the Kommunicate script tag
    const script = document.querySelector("script[src='https://widget.kommunicate.io/v2/kommunicate.app']");
    if (script) {
      script.remove();
    }
    
    // Reset the global variables
    window.kommunicate = undefined;
    
    // Clear any other references or resources related to Kommunicate
  }
  

  render() {
    return (
      <div>
        {/* Your chat component content */}
      </div>
    );
  }
}

export default Chat;
