import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import './CodeChallengePage.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/themes/prism.css'; 
import 'prismjs/components/prism-javascript';


const initialCode = `function isSecurePassword(password) {
  // TODO: Return true if password has:
  // - at least 8 chars
  // - one uppercase letter
  // - one digit
  return false;
}
`;

const CodeChallengePage = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const handleSubmit = () => {
    try {
      const userFunc = new Function(code + '; return isSecurePassword;')();
      const test = userFunc('Test1234');
      setOutput(test ? '✅ Passed: Strong password detected.' : '❌ Failed: Did not pass.');
    } catch (err) {
      setOutput('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="code-container">
      <h1>Code Challenge</h1>
      <p className="challenge-desc">
        Your task: Implement the `isSecurePassword` function. It should return `true` if the password:
        <br />– Is at least 8 characters<br />– Has 1 uppercase letter<br />– Has 1 number
      </p>

      <Editor
        value={code}
        onValueChange={setCode}
        highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
        padding={20}
        className="code-editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#1e1e1e',
          color: 'white',
          borderRadius: '10px',
        }}
      />

      <button className="run-btn" onClick={handleSubmit}>Run Code</button>

      {output && <div className="code-output">{output}</div>}
    </div>
  );
};

export default CodeChallengePage;
