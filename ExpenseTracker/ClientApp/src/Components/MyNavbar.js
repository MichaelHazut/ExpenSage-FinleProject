import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './MyNavbar.css'


export function MyNavbar({ navOptions }) {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand className='.navbar-brand' href='Home'>Michael</Navbar.Brand>
            <Container id='container'>
                <Nav className=''>
                    {navOptions.map((nav, index) => (
                        <Nav.Link key={index} href={nav.name.replace(/\s+/g, '').toLowerCase()}>{nav.name}</Nav.Link>)
                    )}
                </Nav>
            </Container>
        </Navbar>
    )

}