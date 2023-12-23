
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainSwipeView from './views/MainSwipeView'
import Logo from './components/Logo';
function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Logo/>
      <MainSwipeView />
    </QueryClientProvider>
  )
}

export default App
