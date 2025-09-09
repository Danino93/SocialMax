import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import InstagramServices from './pages/Services/InstagramServices';
import FacebookServices from './pages/Services/FacebookServices';
import TelegramServices from './pages/Services/TelegramServices';
import WhatsAppServices from './pages/Services/WhatsAppServices';
import TikTokServices from './pages/Services/TikTokServices';
import YouTubeServices from './pages/Services/YouTubeServices';
import GoogleBusinessServices from './pages/Services/GoogleBusinessServices';
import GoogleBusinessManagement from './pages/Admin/GoogleBusinessManagement';
import TwitterServices from './pages/Services/TwitterServices';
import DiscordServices from './pages/Services/DiscordServices';
import Cart from './pages/Cart/Cart';
import ServicesPage from './pages/Services/ServicesPage';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Pricing from './pages/Pricing/Pricing';
import Admin from './pages/Admin/Admin';
import ServiceManagement from './pages/Admin/ServiceManagement';
import FeatureExecution from './pages/Admin/FeatureExecution';
import TelegramManagement from './pages/Admin/TelegramManagement';
import FacebookManagement from './pages/Admin/FacebookManagement';
import TikTokManagement from './pages/Admin/TikTokManagement';
import InstagramManagement from './pages/Admin/InstagramManagement';
import YouTubeManagement from './pages/Admin/YouTubeManagement';
import WhatsAppManagement from './pages/Admin/WhatsAppManagement';
import TwitterManagement from './pages/Admin/TwitterManagement';
import DiscordManagement from './pages/Admin/DiscordManagement';
import SpotifyManagement from './pages/Admin/SpotifyManagement';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App" dir="rtl">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services/instagram" element={<InstagramServices />} />
              <Route path="/services/facebook" element={<FacebookServices />} />
                  <Route path="/services/telegram" element={<TelegramServices />} />
                  <Route path="/services/whatsapp" element={<WhatsAppServices />} />
                  <Route path="/services/tiktok" element={<TikTokServices />} />
                  <Route path="/services/youtube" element={<YouTubeServices />} />
                  <Route path="/services/google-business" element={<GoogleBusinessServices />} />
            <Route path="/services/twitter" element={<TwitterServices />} />
            <Route path="/services/discord" element={<DiscordServices />} />
            <Route path="/cart" element={<Cart />} />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/contact" 
                element={<Contact />} 
              />
              <Route 
                path="/about" 
                element={<About />} 
              />
              <Route 
                path="/pricing" 
                element={<Pricing />} 
              />
              <Route 
                path="/services" 
                element={<ServicesPage />} 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <Layout>
                      <Admin />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute adminOnly>
                    <ServiceManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services/:platform" 
                element={
                  <ProtectedRoute adminOnly>
                    <ServiceManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/execute" 
                element={
                  <ProtectedRoute adminOnly>
                    <FeatureExecution />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/telegram" 
                element={
                  <ProtectedRoute adminOnly>
                    <TelegramManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/facebook" 
                element={
                  <ProtectedRoute adminOnly>
                    <FacebookManagement />
                  </ProtectedRoute>
                } 
              />
            <Route
              path="/admin/tiktok"
              element={
                <ProtectedRoute adminOnly>
                  <TikTokManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/instagram"
              element={
                <ProtectedRoute adminOnly>
                  <InstagramManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/youtube"
              element={
                <ProtectedRoute adminOnly>
                  <YouTubeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/whatsapp"
              element={
                <ProtectedRoute adminOnly>
                  <WhatsAppManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/twitter"
              element={
                <ProtectedRoute adminOnly>
                  <TwitterManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/discord"
              element={
                <ProtectedRoute adminOnly>
                  <DiscordManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/spotify"
              element={
                <ProtectedRoute adminOnly>
                  <SpotifyManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/google-business"
              element={
                <ProtectedRoute adminOnly>
                  <GoogleBusinessManagement />
                </ProtectedRoute>
              }
            />
              
              {/* Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
    </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
