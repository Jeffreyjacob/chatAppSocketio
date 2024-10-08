import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './context/SocketContent.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster visibleToasts={1} position='top-right' richColors />
    </QueryClientProvider>
  </SocketProvider>,
)
