import './styles.css';
import React, { useEffect, useState } from 'react';
import { Radar  } from 'react-chartjs-2';
import 'chart.js/auto'; // Importa todas as escalas
import 'chartjs-plugin-datalabels';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


const options = {
    scales: {
        r: {
            min: 0,  // Valor mínimo fixo para a escala radial
            max: 0.6,
            angleLines: {
                display: true
            },
            ticks: {
                stepSize: 0.1  // Define o intervalo entre os valores
            }
        },
    },
    plugins: {
        legend: {
            display: true
        }
    }
};


function ComponenteLPA({dadosParanalisador }) {

    const  listaReferencia=["Inconsistente","QT -> V | QV-> T", "T. verdadeiro", "QV -> ID | QID -> V" ,"Indeterminado", "ID->F | QF->ID" ,"T. Falso", "QF-> T | QT -> F"]

    const [dados, setDados] = useState(
      {
        lista_resultados:["0.1","0.1","0.6","0.1","0.1","0.1","0.6","0.1",],
        lista_datas:["Inconsistente","IN-> V | QV->IN", "T. verdadeiro", "QV-> IN | ID-> V" ,"Indeterminado", "ID->F | QF->ID" ,"T. Falso", "QF->IN | IN->F"]
      }
    );

    useEffect(() => {
        if (dadosParanalisador) {
            console.log(dadosParanalisador.lista_resultados)
            setDados(dadosParanalisador)
        }
        
    }, [dadosParanalisador])



    const data = {
        labels: listaReferencia,
        datasets: [
            {
                label: 'Linhas-limite',
                data: dados.lista_resultados,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ]
    };

    return (
        <div className="chart-container">
            <h2>Para-Analisador</h2>
            <Radar data={data} options={options} />
        </div>
    );
};

export default ComponenteLPA;
