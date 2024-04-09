import './styles.css';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importa todas as escalas
import 'chartjs-plugin-datalabels';
import api from '../../services/api';
import Tune from '@mui/icons-material/Tune';


const options = {
    scales: {
        y: {
            type: 'linear',
            beginAtZero: true,
            stepSize: 1,
        },
    },

}


function ChartComponent({ dataDados, line, name }) {
    const [dados, setDados] = useState(
        {
            lista_dados: [41.4, 40.2],
            lista_dados_inferior: [46.0, 46.0],
            lista_dados_superior: [36.0, 35.0],
            lista_datas: ['1', '2']
        }
    );
    const [nameDado, setNameDado] = useState('');
    const [valoresSD, setValoresSD] = useState([]);
    const [saldo, setSaldo] = useState([]);

    console.log("Dados aqui-----:", dataDados);

    useEffect(() => {
        if (dataDados) {
            setDados(dataDados)
            setNameDado(name)
        }
    }, [dataDados, name])



    async function gerarGrafico() {
        try {
            const response = await api.get("/gerarGrafico");



        } catch (error) {
            console.log(error);
        }
    }



    const data = {
        labels: dados.lista_datas ? dados.lista_datas : ['1', '2'],
        datasets: [
            {
                label: nameDado,
                data: dados.lista_dados,
                fill: true,
                backgroundColor: `${false ? 'rgba(218, 41, 29, 0.73)' : 'rgba(70, 35, 199,0.7)'}`,
                borderColor: '#1b9a0a',
                borderWidth: 4,
            },

        ],
    };

    return (
        <div className="chart-container">
            <h2>{nameDado}</h2>
            {line ? (<Line data={data} options={options} c />) : (<Bar data={data} options={options} />)}
        </div>
    );
};

export default ChartComponent;
