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


function ChartComponentValues({ dataDados, line, name, optionsValuesCHCM }) {

    const [dados, setDados] = useState(
        {
            maior_valor: 0,
            menor_valor: 0,
            media: 0,
            data_maior_valor: "0000-00-00",
            data_menor_valor: "0000-00-00",
            periodo_analisado: ["0000-00-00", "0000-00-00"],

        }
    )

    const [dadosCHCM, setDadosCHCM] = useState(
        {
            maior_valor: 0,
            menor_valor: 0,
            media: 0,
            data_maior_valor: "0000-00-00",
            data_menor_valor: "0000-00-00",
            periodo_analisado: ["0000-00-00", "0000-00-00"],

        }
    )

    function formataStringData(data) {
        data = String(data)

        let listaValores = data.split("-")
        let dataFormatada = listaValores[2] + "/" + listaValores[1] + "/" + listaValores[0]

        return dataFormatada
    }

    const [nameDado, setNameDado] = useState('');
    const dadosLimitados = [dados.maior_valor, dados.media, dados.menor_valor];
    const dadosLimitadosCHCM = [dadosCHCM.maior_valor, dadosCHCM.media, dadosCHCM.menor_valor];
    const media = `${"(" + formataStringData(dados.periodo_analisado[0]) + ") a (" + formataStringData(dados.periodo_analisado[1]) + ")"} `
    const datasLimitados = ["Maior", `${media}`, "Menor"];

    useEffect(() => {
        if (dataDados) {
            setDados(dataDados["dados_referencia"])
            setNameDado(name)
        }

        if (optionsValuesCHCM) {
            setDadosCHCM(optionsValuesCHCM["dados_referencia"])
        }
    }, [dataDados, name, optionsValuesCHCM])




    const data = {
        labels: datasLimitados ? datasLimitados : ['1', '2', '3'],
        datasets: [
            {
                label: "Maior",
                data: [dadosLimitados[0], 0, 0],
                fill: true,
                backgroundColor: `${true ? 'rgba(10, 38, 217, 0.6)' : 'rgba(70, 35, 199,0.7)'} `,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 2,

            },
            {
                label: "Média",
                data: [0, dadosLimitados[1], 0],
                fill: true,
                backgroundColor: `${true ? 'rgba(227, 31, 31, 0.6)' : 'rgba(70, 35, 199,0.7)'} `,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 2,

            },
            {
                label: "Menor",
                data: [0, 0, dadosLimitados[2]],
                fill: true,
                backgroundColor: `${true ? 'rgba(29, 198, 29, 0.6)' : 'rgba(70, 35, 199,0.7)'} `,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 2,

            },

        ],
    }

    const dataCHCM = {
        labels: datasLimitados ? datasLimitados : ['1', '2', '3'],
        datasets: [
            {
                label: "HCM",
                data: [dadosLimitados[0], dadosLimitados[1], dadosLimitados[2]],
                fill: true,
                backgroundColor: `${true ? 'rgba(190, 58, 25, 0.7)' : 'rgba(70, 35, 199,0.7)'} `,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 2,

            },
            {
                label: "CHCM",
                data: [dadosLimitadosCHCM[0], dadosLimitadosCHCM[1], dadosLimitadosCHCM[2]],
                fill: true,
                backgroundColor: `${true ? "rgba(240, 244, 34, 0.6)" : 'rgba(70, 35, 199,0.7)'} `,
                borderColor: 'rgba(0, 1, 0,0.5)',
                borderWidth: 2,

            },


        ],
    };

    return (
        <div className="chart-container">
            <h2>{nameDado}</h2>
            {line ? (<Line data={optionsValuesCHCM ? dataCHCM : data} options={options} c />) : (<Bar data={optionsValuesCHCM ? dataCHCM : data} options={options} />)}
        </div>
    );
};

export default ChartComponentValues;
