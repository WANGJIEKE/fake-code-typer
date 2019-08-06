import React from 'react';
import './CodeDisplay.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

class CodeDisplay extends React.Component {
  componentDidMount() {
    hljs.initHighlighting();
  }

  componentDidUpdate() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="CodeDisplay">
        <pre><code className={this.props.language}>{this.props.content}</code></pre>
      </div>
    );
  }
}

export default CodeDisplay;
