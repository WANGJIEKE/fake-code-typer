import React from 'react';
import './InfoPanel.scss';

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      language: 'python',
      minStep: 10,
      maxStep: 20
    }
  }

  async handleFile(file) {
    try {
      const fileContent = await this.readFile(file);
      this.handleChange({content: fileContent});
    } catch (e) {
      console.error(e.message);
    }
  }

  readFile(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('An error occured when reading the file'));
      };

      reader.onloadend = () => {
        resolve(reader.result);
      }

      reader.readAsText(file);
    });
  }

  handleChange(newAppState) {
    this.props.onUpdate(newAppState);
  }

  render() {
    return (
      <div className="InfoPanel">
        <h1>Pseudo Code Editor</h1>
        <p>{this.state.fileName ? `File "${this.state.fileName}" is selected` : "Please select a file..."}</p>
        <button onClick={(event) => { document.getElementById('file').click(); event.preventDefault(); }}>
          Choose a source file...
          </button>
        <input type="file" id="file" name="file" accept="text/*" multiple={false} onChange={(event) => { this.handleFile(event.target.files[0]); }} />
        <p>Programming Language</p>
        <select id="programming-language" name="programming-language">
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Objective-C">Objective-C</option>
          <option value="Python">Python</option>
        </select>
        <label>Min step<input type="number" id="min-step" min="1" step="1" placeholder="3"></input></label>
        <label>Max step<input type="number" id="max-step" min="1" step="1" placeholder="5"></input></label>

        <div className="credit">
          <p>Created by Tongjie Wang with <span role="img" aria-label="love">❤️</span><br />
            Please check the <a href="https://github.com/WANGJIEKE" target="_blank" rel="noreferrer noopener">GitHub repo</a> for source code<br />
            <span>
              Syntax highlighting by <a href="https://highlightjs.org" target="_blank" rel="noreferrer noopener">highlight.js</a>; icons by foo and bar
              </span>
          </p>
        </div>
      </div>
    );
  }
}

// TODO: props validation

export default InfoPanel;
