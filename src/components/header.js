import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" className='flex justify-center'>
                <Navbar.Brand>Note Keeper Application</Navbar.Brand>
        </Navbar>
    )
}

export default Header;