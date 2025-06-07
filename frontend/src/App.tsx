import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Index from './pages/Index';
import Auth from './pages/Auth';
import AllRecipes from './pages/AllRecipes';
import CuisinesPage from './pages/CuisinesPage';
import DevicesPage from './pages/DevicesPage';
import RecipeDetail from './pages/RecipeDetail';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CreateRecipe from './pages/CreateRecipe';
import { AuthProvider } from './contexts/AuthContext';
import { ReactQueryProvider } from './providers/query-client-provider';
import AdminRecipeDetail from './components/admin/recipes/RecipeDetail';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App min-h-screen flex flex-col">
        <StrictMode>
          <ReactQueryProvider>
            <Router basename="/">
              <AuthProvider>
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/all-recipes" element={<AllRecipes />} />
                    <Route path="/cuisines" element={<CuisinesPage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/create-recipe" element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>} />
                    <Route path="/create-recipe/:id" element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>} />
                    
                    {/* Admin Routes */}
                    {/* <Route path="/admin" element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } /> */}
                    {/* <Route path="/admin/recipes/:id" element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminRecipeDetail />
                      </ProtectedRoute>
                    } /> */}
                    {/* <Route path="/admin/*" element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } /> */}
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Toaster />
              </AuthProvider>
            </Router>
          </ReactQueryProvider>
        </StrictMode>
      </div>
    </ErrorBoundary>
  );
}

export default App;
