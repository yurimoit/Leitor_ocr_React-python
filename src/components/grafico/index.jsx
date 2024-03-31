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
            max: 8,
            stepSize: 1,
        },
    },

}


function ChartComponent({ }) {
    const [datas, setDatas] = useState([]);
    const [valoresET, setValoresET] = useState([]);
    const [valoresSD, setValoresSD] = useState([]);
    const [saldo, setSaldo] = useState([]);



    async function gerarGrafico() {
        try {
            const response = await api.get("/gerarGrafico");



        } catch (error) {
            console.log(error);
        }
    }



    const data = {
        labels: ['12/02/2024', '13/02/2024', '14/02/2024'],
        datasets: [
            {
                label: 'Limite superior',
                data: [6.0, 6.0, 6.0],
                fill: false,
                backgroundColor: `${true ? 'rgba(70, 35, 199,0.4)' : 'rgba(185, 111, 13,0.9)'}`,
                borderColor: '#FA8C10',
                borderWidth: 4,
            },
            {
                label: 'Hemacias',
                data: [4.7, 4.9, 4.5],
                fill: true,
                backgroundColor: `${true ? 'rgba(218, 41, 29, 0.4)' : 'rgba(70, 35, 199,0.7)'}`,
                borderColor: '#6460FB',
                borderWidth: 4,
            },
            {
                label: 'Limite inferior',
                data: [3.8, 3.8, 3.8],
                fill: false,
                backgroundColor: `${true ? 'rgba(38, 212, 15, 0.484)' : 'rgba(75, 192, 192, 0.9)'}`,
                borderColor: '#05EDE3',
                borderWidth: 4,

            },
        ],
    };

    return (
        <div className="chart-container">
            <h2>Gráfico de Vendas Mensais</h2>
            {true ? (<Line data={data} options={options} c />) : (<Bar data={data} options={options} />)}
        </div>
    );
};

export default ChartComponent;
