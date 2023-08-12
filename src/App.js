import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Card from './Components/Pages/Card/Card';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/card' element={ <Card/>} />
      </Routes>
    </Router>
  );
}

export default App;
