import { Link } from 'react-router-dom';
import './styles.css'

function Home() {
  return (
    <div className='home-app'>
      <h1 className='h1'>Bem vindo, ao leito OCR.</h1>
      <Link className='link' to='/'>Voltar</Link>
    </div>
  );
}

export default Home;