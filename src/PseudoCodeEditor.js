import React from 'react';
import './PseudoCodeEditor.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function getRandIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class PseudoCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextCharIndex: 0
    };
    this.fileReader = new FileReader();
  }

  showNextChar() {
    if (this.state.nextCharIndex >= this.props.content.length) {
      return;
    }

    this.setState((state) => {
      return {
        nextCharIndex: state.nextCharIndex + getRandIntInclusive(this.props.minStep, this.props.maxStep)
      }
    });
  }

  backspace() {
    if (this.state.nextCharIndex <= 0) {
      this.setState({ nextCharIndex: 0 });
      return;
    }

    this.setState((state) => {
      return {
        nextCharIndex: state.nextCharIndex - 1
      }
    });
  }

  keyDownHandler(event) {
    if (!this.props.shouldHandleKeyPress || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'F1':
      case 'F2':
      case 'F3':
      case 'F4':
      case 'F5':
      case 'F6':
      case 'F7':
      case 'F8':
      case 'F9':
      case 'F10':
      case 'F11':
      case 'F12':
        return;
      case 'Backspace':
        this.backspace();
        break;
      default:
        this.showNextChar();
    }
    const pre = document.querySelector('.PseudoCodeEditor > pre');
    const code = document.querySelector('.PseudoCodeEditor > pre > code');
    pre.scrollTo(0, code.clientHeight);
    event.preventDefault();
  }

  componentDidMount() {
    hljs.initHighlighting();
    document.addEventListener('keydown', (event) => { this.keyDownHandler(event); });
  }

  componentDidUpdate() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="PseudoCodeEditor">
        <pre><code className={this.props.language}>{this.props.content.slice(0, this.state.nextCharIndex)}</code></pre>
      </div>
    );
  }
}

export default PseudoCodeEditor;
