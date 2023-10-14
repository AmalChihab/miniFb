import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
      hasError: false, // Add a state variable to track errors
    };
  }

  loadKommunicateScript() {
    const kommunicateSettings = {
      appId: '2fab23136c4ab8c3a15499d7e8f3a463c',
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
    const h = document.getElementsByTagName('head')[0];
    h.appendChild(s);
    window.kommunicate = this;
    this._globals = kommunicateSettings;
    this.setState({ scriptLoaded: true });
  }

  componentDidMount() {
    // Check if the script is already loaded
    if (!window.kommunicate) {
      // Load the script only if it hasn't been loaded yet
      this.loadKommunicateScript();
    } else {
      this.setState({ scriptLoaded: true });
    }
  }

  // Catch and handle errors
  componentDidCatch(error, info) {
    console.error('Error in Chat component:', error, info);
    this.setState({ hasError: true });
  }

  render() {
    // Check if there's an error; if so, do not render the component
    if (this.state.hasError) {
      return null; // Do not render the component
    }

    // Check if the script is still loading
    if (!this.state.scriptLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {/* Your chat component content */}
      </div>
    );
  }
}

export default Chat;
