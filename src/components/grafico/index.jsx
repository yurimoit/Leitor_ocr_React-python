import './styles.css';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importa todas as escalas
import 'chartjs-plugin-datalabels';


const options = {
    scales: {
        y: {
            type: 'linear',
            beginAtZero: true,
            stepSize: 1,
        },
    },

}


function ChartComponent({ dataDados, line, name, optionsValuesCHCM }) {

    const [dados, setDados] = useState(
        {
            lista_dados: [0, 0],
            lista_dados_inferior: [46.0, 46.0],
            lista_dados_superior: [36.0, 35.0],
            lista_datas: ['0000-00-00', '1111-11-11']
        }
    );

    const [dadosCHCM, setDadosCHCM] = useState(
        {
            lista_dados: [0, 0],
            lista_dados_inferior: [46.0, 46.0],
            lista_dados_superior: [36.0, 35.0],
            lista_datas: ['0000-00-00', '0000-00-00']
        }
    );
    const [nameDado, setNameDado] = useState('');
    const dadosLimitados = limiteDadosGrafico(dados.lista_dados)
    const dadosLimitadosCHCM = limiteDadosGrafico(dadosCHCM.lista_dados)
    const datasLimitados = limiteDadosGrafico(dados.lista_datas)


    function limiteDadosGrafico(lista) {
        const tamanhoListaDados = lista.length
        const limiteDados = 6
        let primeiroParametroIndice = tamanhoListaDados - limiteDados

        if (tamanhoListaDados < 6) {
            primeiroParametroIndice = 0
        }

        const listaTamanhoReduzido = lista.slice(primeiroParametroIndice, tamanhoListaDados);

        return listaTamanhoReduzido
    }

    function formataStringListaData(listaDatas) {

        let listaNovaDatasFormatadas = []

        for (let data of listaDatas) {
            let listaValores = data.split("-")
            data = listaValores[2] + "/" + listaValores[1] + "/" + listaValores[0]
            listaNovaDatasFormatadas.push(data)
        }
        return listaNovaDatasFormatadas
    }

    useEffect(() => {
        if (dataDados) {
            setDados(dataDados)
            setNameDado(name)
        }

        if (optionsValuesCHCM) {
            setDadosCHCM(optionsValuesCHCM)
        }
    }, [dataDados, name, optionsValuesCHCM])



    const data = {
        labels: dados.lista_datas ? formataStringListaData(datasLimitados) : ['1', '2'],
        datasets: [
            {
                label: nameDado,
                data: dadosLimitados,
                fill: true,
                backgroundColor: `${false ? 'rgba(218, 41, 29, 0.73)' : 'rgba(70, 35, 199,0.7)'}`,
                borderColor: '#1b9a0a',
                borderWidth: 4,
            },

        ],
    };

    const dataHcmChcm = {
        labels: dados.lista_datas ? formataStringListaData(datasLimitados) : ['1', '2'],
        datasets: [
            {
                label: nameDado,
                data: dadosLimitados,
                fill: true,
                backgroundColor: `${false ? 'rgba(218, 41, 29, 0.73)' : 'rgba(70, 35, 199,0.7)'}`,
                borderColor: '#1b9a0a',
                borderWidth: 4,
            },
            {
                label: "CHCM",
                data: dadosLimitadosCHCM,
                fill: true,
                backgroundColor: `${true ? 'rgba(14, 176, 122, 0.7)' : 'rgba(70, 35, 199,0.7)'}`,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 3,
            },

        ],
    };

    return (
        <div className="chart-container">
            <h2>{nameDado === 'Hcm' ? "HCM (pg) & CHCM (g/dl)" : nameDado}</h2>
            {line ? (<Line data={nameDado === 'Hcm' ? dataHcmChcm : data} options={options} c />) : (<Bar data={nameDado === 'Hcm' ? dataHcmChcm : data} options={options} />)}
        </div>
    );
};

export default ChartComponent;
