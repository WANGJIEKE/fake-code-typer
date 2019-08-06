import React from 'react';
import './FakeCodeTyper.scss';

import CodeDisplay from './CodeDisplay';
import InfoPanel from './InfoPanel';
import infoIcon from './assets/info-circle.svg';
import DEFAULT_CODE from './constants';

function getRandIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class FakeCodeTyper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: DEFAULT_CODE,
      nextCharIndex: 0,
      language: 'python',
      minStep: 10,
      maxStep: 20,
      isUsingPanel: true
    };
  }

  showNextChar() {
    if (this.state.nextCharIndex >= this.state.content.length) {
      return;
    }

    this.setState((state) => {
      return {
        nextCharIndex: state.nextCharIndex + getRandIntInclusive(this.state.minStep, this.state.maxStep)
      }
    });
  }

  keyDownHandler(event) {
    if (this.state.isUsingPanel) {
      return;
    }
    this.showNextChar();
    const pre = document.querySelector('.CodeDisplay > pre');
    const code = document.querySelector('.CodeDisplay > pre > code');
    pre.scrollTo(0, code.clientHeight);
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => { this.keyDownHandler(event); })
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
    this.setState({nextCharIndex: 0});
  }

  render() {
    return (
      <div className="FakeCodeTyper">
        <div className="InfoIcon" onClick={(event) => { this.onInfoIconClicked(event); }}>
          <img src={infoIcon} alt=""></img>
        </div>
        <CodeDisplay
          content={this.state.content.slice(0, this.state.nextCharIndex)}
          language={this.state.language} 
        />
        <InfoPanel onUpdate={(newState) => { this.onInfoPanelUpdate(newState); }} />
      </div>
    );
  }
}

export default FakeCodeTyper;
