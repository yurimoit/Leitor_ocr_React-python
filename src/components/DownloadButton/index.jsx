// src/components/DownloadButton.js
import React from 'react';
import api from '../../services/api';

export default function DownloadButton(){

  const handleDownload = async () => {
    try {
      const response = await api.get('/gerar_relatorio', {
        responseType: 'blob', 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio.pdf'; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };

  return (
    <button onClick={handleDownload}>
      Baixar Relatório
    </button>
  );
};


