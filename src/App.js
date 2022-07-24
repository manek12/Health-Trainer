import './App.css';
import { Routes,Route } from 'react-router';
import Workout from './Workout';
import Nutrition from './Nutrition';
import Dashboard from './Dashboard';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path='/:id/workout' element={<Workout/>}></Route>
        <Route path='/:id/nutrition' element={<Nutrition/>}></Route>
      </Routes>
  );
}

export default App;
