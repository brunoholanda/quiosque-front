import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateCampaign from './pages/CreateCampaign'
import EditCampaign from './pages/EditCampaign'
import CampaignView from './pages/CampaignView'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns/new"
            element={
              <ProtectedRoute>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns/:id/edit"
            element={
              <ProtectedRoute>
                <EditCampaign />
              </ProtectedRoute>
            }
          />
          <Route path="/campaign/:id" element={<CampaignView />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

