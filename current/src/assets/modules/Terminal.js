import React, { useState } from 'react';

function Terminal() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [history, setHistory] = useState([]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            executeCommand();
        }
    };

    const executeCommand = () => {
        const [command, ...args] = input.split(' ');

        switch (command) {
            case 'echo':
                setOutput(args.join(' '));
                break;
            case 'date':
                setOutput(new Date().toLocaleString());
                break;
            case 'history':
                setOutput(history.join('\n'));
                break;
            case 'cls':
                setOutput(' ')
                setHistory([]);
                setInput('');
                return;
            case '':
                break;
            default:
                setOutput(`Command not found: ${command}`);
                break;
        }

        const lineBreak = `\n\n`
        const savedResponse = 'C:\\usr\\ethan-egerton> ' + input + lineBreak + output + lineBreak;

        setHistory([...history, savedResponse]);
        setInput('');

        console.log(history);
    };

    return (
        <div className="terminal">
            <pre className="terminal-output">
                {history.map((command, index) => (
                <span key={index}>{command}</span>
                ))}
            </pre>
            <p>C:\usr\ethan-egerton{'>'}&nbsp;
                <input
                    className="terminal-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    autoFocus={true}
                    onKeyDown={handleKeyPress}
                />
            </p>
        </div>
    );
}

export default Terminal;
