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


function ComponenteLPAData({ dadosParanalisador, line}) {

    const [dados, setDados] = useState(

        {   lista_datas: ["000-00-00", "0000-00-00"],
            lista_resultados: ["F", "V"],
            lista_valores_grau_certeza: [0.2, 0.4],
            lista_valores_grau_incerteza: [0.4, 0.6],
        }
    );

    const dadosLimitadosGrauCerteza = limiteDadosGrafico(dados.lista_valores_grau_certeza)
    const dadosLimitadosGrauIncerteza = limiteDadosGrafico(dados.lista_valores_grau_incerteza)

    const datasLimitados = limiteDadosGrafico(dados.lista_datas)


    function limiteDadosGrafico(lista) {

        if (!lista){
            lista=[]
        }

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

        if(!listaDatas){
            listaDatas=["000-00-00", "0000-00-01"]
        }

        let listaNovaDatasFormatadas = []

        for (let data of listaDatas) {
            let listaValores = data.split("-")
            data = listaValores[2] + "/" + listaValores[1] + "/" + listaValores[0]
            listaNovaDatasFormatadas.push(data)
        }
        return listaNovaDatasFormatadas
    }


    useEffect(() => {
        if (dadosParanalisador) {
            console.log(dadosParanalisador.lista_datas)
            setDados(dadosParanalisador)
        }
        
    }, [dadosParanalisador])



    const data = {
        labels: dados.lista_datas?formataStringListaData(datasLimitados):["00-00-0000","00-00-0000"],
        datasets: [
           
            {
                label: "Grau certeza - H",
                data: dadosLimitadosGrauCerteza,
                fill: false,
                backgroundColor: `${true ? 'rgba(29, 183, 29, 0.931)' : 'rgba(70, 35, 199,0.6)'}`,
                borderColor: 'rgba(29, 183, 29, 0.931)',
                borderWidth: 4,
            },
            {
                label: "Grau incerteza - G",
                data: dadosLimitadosGrauIncerteza,
                fill: false,
                backgroundColor: `${true ? 'rgba(218, 41, 29, 0.5)' : 'rgba(70, 35, 199,0.6)'}`,
                borderColor: 'rgba(218, 41, 29, 0.5)',
                borderWidth: 4,
            },
            
        ],
    };

    return (
        <div className="chart-container">
            <h2>Estatística</h2>
            {line ? (<Line data={data} options={options} c />) : (<Bar data={data} options={options} />)}
        </div>
    );
};

export default ComponenteLPAData;
