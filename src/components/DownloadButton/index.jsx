// src/components/DownloadButton.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.css'

export default function DownloadButton({modalIsOpenRelatorio, setModalIsOpenRelatorio, idPaciente}){

  const[verificaRelatorioGerado, setVerificaRelatorioGerado ]=useState(false)
  const [mensagemRelatrorio,setMensagemRelatrorio]=useState("Gerar relatório?")
  const [link,setLink]=useState("")
  const [id,setId]=useState(null)

  useEffect(()=>{
    if(idPaciente){
      setId(idPaciente)
    }
  },[idPaciente])

  const handleDownload = async () => {
    setVerificaRelatorioGerado(true)
    try {

        const response = await api.get(`/gerar_relatorio?id=${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
          }
        })

        setTimeout(()=>{
          setVerificaRelatorioGerado(false)
          console.log("link",response.data);
          if(response.data && response.data.link){
            const link=(response.data.link).replace("C:\\Users\\yurim\\AppData\\Local\\Temp\\","").replace("\\Temp\\","")
            setLink(link)
          }
          toast.success("Efetuado com sucesso")
        },1500)

    } catch (error) {
      toast.error("Falhou")
      setVerificaRelatorioGerado(false)
      setMensagemRelatrorio("Não foi possivél gera relatório no momento '/n' tente novamente")
      console.error('Erro ao baixar o arquivo:', error);
    }
  }

  function closeModal(){
    setModalIsOpenRelatorio(false)
    setMensagemRelatrorio("Gerar relatório?")
    setVerificaRelatorioGerado(false)
    setLink("")
  }



  return (
    <div  className="container-modal" >
      <Modal
        isOpen={modalIsOpenRelatorio}
        contentLabel="Exemple Modal"
        overlayClassName="modal-overlay"
        className="modal-content-relatorio"
      >
        <main className='container-modal-main-relatorio'>
          <div className='head-download-relatorio'>
            <h1>Relatório</h1>
             <button onClick={()=>closeModal()} className="exit">
                <CloseIcon sx={{
                  width: '100%', height: '90%', color: 'white',background:'none', transition: 'transform 0.2s', '&:hover': {
                    transform: 'scale(1.08)',
                    color: 'red'
                  }
                }} />
              </button>
          </div>
          <section className='section-relatorio'>
            {verificaRelatorioGerado ? (
              <>
                <Box sx={{ display: 'flex',alignItems:'center',justifyContent:"center",flexDirection:"column",gap:"1rem" }}>
                <CircularProgress />
                <h1>Carregando...</h1>
                </Box>
              </>
            ):(
              <div>
                {!verificaRelatorioGerado  && (!link?
                  (<h2 className='h2-mensagem-relatorio'>{mensagemRelatrorio}</h2>):(
                  <aside className='aside-finalizar-relatorio'>
                    <h2 className='h2-mensagem-relatorio'>Relatório Pronto!</h2>
                    <h2 className='h2-mensagem-relatorio finalizar'>Desejar Vizualizar?</h2>
                  </aside>
                )
                )
                }
              </div>
            )}
          </section>
          <div className='buttons-download-relatorio'>
            <button onClick={()=>closeModal()} className='button-cancelar'>Cancelar</button>
            {! link?(
              <button  onClick={()=>handleDownload()}  className='button-confirmar'>SIM</button>
            ):(
              <a onClick={()=>closeModal()} className='a-link-relatorio' target='_blank' rel="noreferrer" href={link}>SIM</a>
            )}
          </div>
        </main>
      </Modal>
    </div>
  );
};


