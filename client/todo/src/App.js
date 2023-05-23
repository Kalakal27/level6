import { useContext } from 'react';
import './css/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import TodoWrapper from './components/TodoWrapper';
import Auth from './components/Auth'
// import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './context/UserProvider';

export default function App() {
  const {token, logout} = useContext(UserContext)
  return (
    <div className="App">
      
     
      <Routes>
      <Route
        path="/TodoWrapper"
        element={token && <TodoWrapper logout={logout} />}
        />
        <Route
        path="/"
        element={token ? <Navigate to="/TodoWrapper" />: <Auth />}
        />
      </Routes>
      
    </div>
  );
}


