import React from 'react';
import hljs from 'highlight.js';
import './App.css';
import 'highlight.js/styles/atom-one-dark.css';

function getRandIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextCharIndex: 0
    };
  }

  showNextChar(isBackSpace) {
    if (isBackSpace) {
      if (this.state.nextCharIndex <= 0) {
        this.setState({nextCharIndex: 0});
        return;
      }

      this.setState((state) => {
        return {
          nextCharIndex: state.nextCharIndex - 1
        }
      });

    } else {
      if (this.state.nextCharIndex >= this.props.content.length) {
        document.removeEventListener('keydown', this.showNextChar);
        return;
      }
  
      this.setState((state) => {
        return {
          nextCharIndex: state.nextCharIndex + getRandIntInclusive(1, 5)
        }
      });
    }
  }

  componentDidMount() {
    hljs.initHighlighting();
    document.addEventListener('keydown', (event) =>{
      switch (event.key) {
        case 'Escape':
        case 'F11':
        case 'F12':
          break;
        case 'Backspace':
          this.showNextChar(true);
          window.scrollTo(0, document.body.clientHeight);
          event.preventDefault();
          break;
        default:
          this.showNextChar();
          window.scrollTo(0, document.body.clientHeight);
          event.preventDefault();
      }
    });
  }

  componentDidUpdate() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="App">
        <pre>
          <code className="python">{this.props.content.slice(0, this.state.nextCharIndex)}</code>
        </pre>
      </div>
    );
  }
}

export default App;
