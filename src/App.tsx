import React from "react"
import Header from "./components/layouts/Header/Header"
import Main from "./components/layouts/Main/Main"
import Modal from "./components/common/Modal/Modal"
const App:React.FC = () => {
  
  return (
    <div>
      <Modal/>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
