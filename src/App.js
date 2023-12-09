import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <div className='header'>
        Redis chat demo
      </div>
      <div className='container'>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
