import React from 'react';
import './App.scss';

import PseudoCodeEditor from './PseudoCodeEditor';
import InfoPanel from './InfoPanel';
import infoIcon from './assets/info.png';
import DEFAULT_CODE from './default_code';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: DEFAULT_CODE,
      language: 'python',
      minStep: 10,
      maxStep: 20,
      isUsingPanel: true,
      fileName: null
    }
  }

  handleFile(file) {  // not sure why can't directly pass event here
    this.setState({fileName: file.name});
  }

  onFileAndLanguageChanged() {
    
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
        <InfoPanel />
      </div>
    );
  }
}

export default App;
