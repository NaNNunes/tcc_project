import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Container from 'react-bootstrap/Container';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Container>
        <Outlet/>
      </Container>
    </>
  )
}

export default App
