import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Manager from "./components/Manager"
function App() {
  return (
    <>
     
    <div className="h-screen flex flex-col bg-gradient-to-r from-lime-300 to-cyan-300 overflow-hidden">
  <div className="shrink-0">
    <Navbar />
  </div>

  <div className="flex-grow overflow-y-auto">
    <Manager />
  </div>

  <div className="shrink-0">
    <Footer />
  </div>
</div>

    </>
  )
}

export default App
