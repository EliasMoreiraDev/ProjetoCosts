import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Project from './components/pages/Project';

import Container from './components/layouts/Container';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';

import Projeto from './components/pages/Projeto';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass='min-heigth'>
          <Routes>
        
              <Route exact path='/' element={<Home/>}>
              </Route>
              <Route path='/newProject'  element={<NewProject/>}/>

              <Route path='/projects'  element={<Project/>}>
              
              </Route>
              <Route path='/contact'  element={<Contact/>}>
              
              </Route>
              <Route exact path='/company' element={<Company/>}></Route>

              <Route path='/project/:id' element={<Projeto/>}></Route>

          </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App;
