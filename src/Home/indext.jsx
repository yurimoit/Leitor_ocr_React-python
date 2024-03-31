import { useState } from 'react';
import './styles.css';
import api from '../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function HomePaciente() {
  const [file, setFile] = useState('');
  const [imageNome, setImageNome] = useState('');
  const [texto, setTexto] = useState('');
  const [textoGerado, setTextoGerado] = useState('');
  const [imagem, setImagem] = useState('');
  const [letras, setLetras] = useState(null);
  const [palavras, setPalavras] = useState(null);
  const [listaDePalavras, setListaDePalavras] = useState({})

  async function handleUploadFormData() {
    if (!file) {
      return;
    }

    setImagem(file);
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      });

      console.log(response);

      const { filename } = response.data;
      setImageNome(filename);

      toast.success(`Enviado com sucesso!`)

    } catch (error) {
      toast.error("Error ao enviar a imagem!")
      console.log(error);
    }
  }

  async function getTexto() {
    try {
      const response = await api.get('/getLeitura');

      console.log(response);

      const { nomeImagem, texto: ocrTexto, total_letras, total_palavras } = response.data;
      setTexto(nomeImagem);
      setTextoGerado(ocrTexto);
      setLetras(total_letras);
      setPalavras(total_palavras);
      console.log(response.data.lista_de_palavras);
      setListaDePalavras({ ...response.data.lista_de_palavras });
      toast.success(`Gerador texto com sucesso!!`)
    } catch (error) {
      toast.error("Error no servidor!")
      console.log(error);
    }
  }



  return (
    <div className='container-main'>

      <div id='input-ocr'>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className='button-ocr'>
          <button
            type='button'
            className='btn-purple'
            onClick={() => handleUploadFormData()}
          >
            Upload form-data
          </button>

          <button type='button' onClick={() => getTexto()} className='btn-verde'>
            Gera texto
          </button>
        </div>
        <h1>{`Nome do arquivo: ${imageNome}`}</h1>
      </div>


      <div className='container-image'>
        {imageNome && (<img src={imagem} alt={imageNome} />)}
      </div>

      <div className='texto'>
        <h1>Texto gerado a parti do leitor OCR</h1>
        <div className='nome-arquivo'>
          <h2>Nome do arquivo: </h2>
          <p>
            {texto}
          </p>
        </div>

        <h2>Texto gerado: </h2>
        <div className='texto-gerado'>
          <p>{textoGerado}</p>
        </div>
      </div>

      <h2>Informações texto gerado: </h2>

      <table border="1">
        <thead>
          <tr>
            <th>Palavras</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(listaDePalavras).map(([palavra, total]) => (
            <tr key={palavra.indexOf()}>
              <td>{palavra}</td>
              <td>{total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='total'>
        <h2>Total de letras: {letras} </h2>
        <h2>Total de palavras: {palavras} </h2>
      </div>

      <Link to='/'>Volta para pagina login</Link>
    </div>
  );
}

export default HomePaciente;