import { UserContextProvider } from './UserContext';
import './App.css';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <MainRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;
