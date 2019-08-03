import React from 'react';
import './App.scss';

import PseudoCodeEditor from './PseudoCodeEditor';
import InfoPanel from './InfoPanel';
import infoIcon from './assets/info.png';
import DEFAULT_CODE from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: DEFAULT_CODE,
      language: 'python',
      minStep: 10,
      maxStep: 20,
      isUsingPanel: true
    }
  }

  onInfoIconClicked(event) {
    const infoPanel = document.querySelector('.InfoPanel');
    if (this.state.isUsingPanel) {
      infoPanel.style.display = 'none';
    } else {
      infoPanel.style.display = 'flex';
    }
    this.setState((state) => {
      return { isUsingPanel: !state.isUsingPanel };
    });
    event.preventDefault();
  }

  onInfoPanelUpdate(newState) {
    this.setState(newState);
    console.log('asdfg');
  }

  render() {
    return (
      <div className="App">
        <div className="InfoIcon" onClick={(event) => { this.onInfoIconClicked(event); }}>
          <img src={infoIcon} alt=""></img>
        </div>
        <PseudoCodeEditor
          content={this.state.content}
          language={this.state.language}
          minStep={this.state.minStep}
          maxStep={this.state.maxStep}
          shouldHandleKeyPress={!this.state.isUsingPanel}
        />
        <InfoPanel onUpdate={(newState) => { this.onInfoPanelUpdate(newState); }} />
      </div>
    );
  }
}

export default App;
