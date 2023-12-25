
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainSwipeView from './views/MainSwipeView'
import Logo from './components/Logo';
import { useViewportSizeObserver } from './lib/api/hooks';
function App() {
  const queryClient = new QueryClient()
  useViewportSizeObserver();

  return (
    <QueryClientProvider client={queryClient}>
      <Logo/>
      <MainSwipeView />
    </QueryClientProvider>
  )
}

export default App
