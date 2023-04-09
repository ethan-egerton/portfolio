import './assets/styles/style.css';
import Terminal from './assets/components/Terminal';

function App() {
  return (
    <div className="App">
      <section className="screen scanlines">
        <div id='content' className="content">
          <Terminal />
        </div>
    </section>
    </div>);
}

export default App;
