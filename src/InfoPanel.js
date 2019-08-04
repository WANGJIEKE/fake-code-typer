import React from 'react';
import './InfoPanel.scss';

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'python',
      minStep: 3,
      maxStep: 5
    }
  }

  componentDidMount() {
    document.getElementById('min-step').value = this.state.minStep;
    document.getElementById('max-step').value = this.state.maxStep;
    document.getElementById('programming-language').value='python';
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

  handleLanguage(event) {
    this.handleChange({language: event.target.value});
  }

  handleMinStep(event) {
    this.handleChange({minStep: event.target.value});
  }

  handleMaxStep(event) {
    this.handleChange({maxStep: event.target.value});
  }

  handleChange(newAppState) {
    this.props.onUpdate(newAppState);
  }

  render() {
    return (
      <div className="InfoPanel">
        <h1>Pseudo Code Editor</h1>
        <div className="description">
          <p>Settings will be automatically saved</p>
          <p>The editor will be reset when changes saved</p>
          <p>Click the info icon to close/open this panel</p>
        </div>
        <h2>Source Code File</h2>
        <button onClick={(event) => { document.getElementById('file').click(); event.preventDefault(); }}>
          Browse...
          </button>
        <input type="file" id="file" name="file" accept="text/*" multiple={false} onChange={(event) => { this.handleFile(event.target.files[0]); }} />
        <h2>Programming Language</h2>
        <select id="programming-language" name="programming-language" onChange={(event) => {this.handleLanguage(event);}}>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="cs">C#</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
          <option value="objc">Objective-C</option>
          <option value="python">Python</option>
          <option value="x86asm">x86 Assembly</option>
        </select>
        <h2>Min step</h2>
        <input type="number" id="min-step" min="1" step="1" onChange={(event) => {this.handleMinStep(event); }}></input>
        <h2>Max step</h2>
        <input type="number" id="max-step" min="1" step="1" onChange={(event) => {this.handleMaxStep(event); }}></input>
        <div className="footer">
          <p>Created by <a href="https://github.com/WANGJIEKE" target="_blank" rel="noreferrer noopener">WANGJIEKE</a> with <span role="img" aria-label="love">❤️</span><br />
            Please check the <a href="https://github.com/WANGJIEKE" target="_blank" rel="noreferrer noopener">GitHub repo</a> for source code<br />
            <span>
              Syntax highlighting by <a href="https://highlightjs.org" target="_blank" rel="noreferrer noopener">highlight.js</a>; icons from <a href="https://www.iconfont.cn/collections/detail?cid=9402" target="_blank" rel="noreferrer noopener">Ant Design icon library</a>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

// TODO: props validation

export default InfoPanel;
