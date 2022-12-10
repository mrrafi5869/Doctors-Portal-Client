import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes/Routes';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast';
import { createContext, useContext } from 'react';
import { AuthContext } from './contexts/AuthProvider';

export const ThemeContext = createContext(null)

function App() {
  const {mode, setMode} = useContext(AuthContext)

  const toggleTheme = () => {
    setMode(curr => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{mode, toggleTheme}}>
      <div className='max-w-[1440px] mx-auto' id={mode}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
