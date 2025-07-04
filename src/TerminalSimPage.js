import React, { useState, useRef, useEffect } from 'react';
import './TerminalSimPage.css';

const TerminalSimPage = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to HackShield Terminal Simulator' },
    { type: 'output', text: 'Type "help" to get started.' }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  const commands = {
    help: [
      'Available commands:',
      '  help       Show available commands',
      '  clear      Clear the screen',
      '  whoami     Display your hacker alias',
      '  ls         List current mock files',
      '  cd         Change directory (mock)',
      '  exit       Close the simulator (reloads page)'
    ],
    whoami: ['guest_h4x0r'],
    ls: ['missions.txt  credentials.db  readme.md'],
    cd: ['Access denied. This is a simulated file system.'],
    exit: ['Exiting simulator... (refresh the page)']
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === '') return;
    const output = commands[trimmed] || [`Unknown command: ${trimmed}`];
    if (trimmed === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { type: 'input', text: cmd }, ...output.map(line => ({ type: 'output', text: line }))]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal-container">
      <div className="terminal-window" ref={terminalRef}>
        {history.map((entry, idx) => (
          <div key={idx} className={`terminal-line ${entry.type}`}>
            {entry.type === 'input' ? `> ${entry.text}` : entry.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="prompt">&gt;</span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default TerminalSimPage;
