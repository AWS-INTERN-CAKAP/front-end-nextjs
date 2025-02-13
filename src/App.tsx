// Dashboard dengan PrivateRoute
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './contexts/AuthContext';
// import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
      <><Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Tambahkan Register */}
        <Route
          path="/dashboard"
          element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router><Toaster position="top-right" /></>
   
  );
}

export default App;

// Dashboard tanpa PrivateRoute
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './contexts/AuthContext';
// import { Login } from './pages/Login';
// import { Dashboard } from './pages/Dashboard';
// import { Register } from './pages/Register'; 

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} /> {/* Tambahkan rute register */}
//           <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard tanpa PrivateRoute */}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Router>
//       <Toaster position="top-right" />
//     </AuthProvider>
//   );
// }

// export default App;
