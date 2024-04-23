import { useEffect, useState } from 'react'
import ChartComponent from '../grafico'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import './styles.css'
import api from '../../services/api'


export default function DashBoard({ idPaciente }) {

    const [listaResultadosDados, setListaResultadosDados] = useState({})
    const [currentPage, setCurrentPage] = useState(1);

    const [listaTextoLeocograma,
        // eslint-disable-next-line
        setListaTextoLeocograma] = useState([{
            name: 'leucocitos - global',
            text: `Os leucócitos são as células de defesa responsáveis por combater agentes invasores. Na verdade, 
        os leucócitos não são um tipo único de célula, mas sim um grupo de diferentes células,
        com diferentes funções no sistema imune. 
        Alguns leucócitos atacam diretamente o invasor, 
        outros produzem anticorpos e alguns apenas fazem a identificação do microrganismo invasor.`
        }, {
            name: 'neutrofilos bastonetes',
            text: `O neutrófilo é o tipo de leucócito mais comum. Representa,
        em média, de 45% a 75% dos leucócitos circulantes.
        Os neutrófilos são especializados no combate a bactérias.
        Quando há uma infecção bacteriana, a medula óssea aumenta a sua produção, 
        fazendo com que sua concentração sanguínea se eleve. Portanto,
        quando temos um aumento do número de leucócitos totais, 
        causado basicamente pela elevação dos neutrófilos,
        estamos diante de um provável quadro infeccioso bacteriano.
        
        Os bastões são os neutrófilos jovens.
        Quando estamos infectados, a medula óssea aumenta rapidamente
        a produção de leucócitos e acaba por lançar na corrente sanguínea
        neutrófilos jovens recém-produzidos. A infecção deve ser controlada 
        rapidamente, por isso, não há tempo para esperar que essas células 
        fiquem maduras antes de lançá-las ao combate. Em uma guerra o
        exército não manda só os seus soldados mais experientes,
        ele manda aqueles que estão disponíveis.
        `
        }, {
            name: 'neutrofilos segmentados',
            text: `O neutrófilo é o tipo de leucócito mais comum. Representa,
        em média, de 45% a 75% dos leucócitos circulantes.
        Os neutrófilos são especializados no combate a bactérias.
        Quando há uma infecção bacteriana, a medula óssea aumenta a sua produção, 
        fazendo com que sua concentração sanguínea se eleve. Portanto,
        quando temos um aumento do número de leucócitos totais, 
        causado basicamente pela elevação dos neutrófilos,
        estamos diante de um provável quadro infeccioso bacteriano.
        
        Os segmentados são os neutrófilos maduros. Quando o paciente
        não está doente ou já está em fase final de doença, praticamente
        todos os neutrófilos são segmentados, ou seja, células maduras.
        Em muitas situações temos simultaneamente aumento dos bastões e
        dos segmentados.
        `
        },
        {
            name: 'linfocitos',
            text: `Os linfócitos são o segundo tipo mais comum de glóbulos
        brancos. Representam de 15 a 45% dos leucócitos no sangue.

        Os linfócitos são as principais linhas de defesa contra infecções
        por vírus e contra o surgimento de tumores. São eles também os
        responsáveis pela produção dos anticorpos.
        
        Quando temos um processo viral em curso, é comum que o número
        de linfócitos aumente, às vezes, ultrapassando o número
        de neutrófilos e tornando-se o tipo de leucócito mais presente
        na circulação.`
        }, {
            name: 'monocitos',
            text: `
        Os monócitos representam normalmente de 3 a 10% dos leucócitos
        circulantes. São ativados tanto em processos virais quanto 
        bacterianos. Quando um tecido está sendo invadido por algum germe, 
        o sistema imune encaminha os monócitos para o local infectado. 
        Este se ativa, transformando-se em macrófago, uma célula capaz 
        de “comer” micro-organismos invasores.

        Monocitose: termo usado quando há aumento do número de monócitos.

        Monocitopenia: termo usado quando há redução do número de monócitos.

        Os monócitos tipicamente se elevam nos casos de infecções, 
        principalmente naquelas mais crônicas, como a tuberculose.
        `
        }, {
            name: 'eosinofilos',
            text: `Os eosinófilos são os leucócitos responsáveis pelo combate 
        de parasitos e pelo mecanismo da alergia. Apenas de 1 a 5% dos 
        leucócitos circulantes são eosinófilos.

        O aumento de eosinófilos ocorre em pessoas alérgicas, 
        asmáticas ou em casos de infecção intestinal por parasitas.
        
        Eosinofilia: é o termo usado quando há aumento do número de eosinófilos.

        Eosinopenia: é o termo usado quando há redução do número de eosinófilos.`
        }, {
            name: 'basafilos',
            text: `Os basófilos são o tipo menos comum de leucócitos no sangue. 
        Representam de 0 a 2% dos glóbulos brancos.

        Elevação dos basófilos ocorre habitualmente em reações alérgicas, 
        hipotiroidismo, estados de inflamação crônica ou leucemia.
        
        Já a presença de basófilos baixos pode ser um sinal de reação alérgica, 
        infecção, uso prolongado de corticoides ou hipertiroidismo.
        
        Basocitose: refere-se ao aumento do número de basófilos no sangue 
        (também chamado de basofilia).

        Basopenia: refere-se à redução do número de basófilos no sangue.`
        }, {
            name: 'plaquetas',
            text: `As plaquetas são fragmentos de células responsáveis pelo 
        início do processo de coagulação. Quando um tecido de qualquer 
        vaso sanguíneo é lesado, o organismo rapidamente encaminha as 
        plaquetas ao local da lesão. As plaquetas se agrupam e formam um 
        trombo, uma espécie de rolha ou tampão, que imediatamente estanca 
        o sangramento. Graças à ação das plaquetas, o organismo tem tempo 
        de reparar os tecidos lesados sem haver muita perda de sangue.

        O valor normal das plaquetas varia entre 150.000 a 450.000 por 
        microlitro (uL). Porém, até valores próximos de 50.000, 
        o organismo não apresenta dificuldades em iniciar a coagulação.`
        }])

    const [listaTextoIndicesEritogrma,
        // eslint-disable-next-line
        setListaTextoIndicesEritogrma] = useState([{
            nome: 'rdw',
            texto: `O RDW é um índice que avalia a diferença de tamanho entre 
        as hemácias.
        Quando este está elevado significa que existem muitas hemácias 
        de tamanhos diferentes circulando.
        Isso pode indicar hemácias com problemas na sua morfologia. 
        É muito comum RDW elevado, por exemplo,
        na carência de ferro, onde a falta deste elemento 
        impede a formação da hemoglobina normal,
        levando à formação de uma hemácia de tamanho reduzido.`
        }, {
            nome: 'vcm',
            texto: `O volume globular médio (VGM) ou volume corpuscular médio (VCM),
        mede o tamanho das hemácias.
        <br></br>
        Um VCM elevado indica hemácias macrocíticas, ou seja, hemácias grandes.
        VCM reduzidos indicam hemácias microcíticas, isto é, de tamanho diminuído.
        Esse dado ajuda a diferenciar os vários tipos de anemia.`
        }, {
            nome: 'hcm e chcm',
            texto: `
        Os dois valores indicam basicamente o mesmo, a quantidade de hemoglobina nas hemácias.
        Quando as hemácias têm poucas hemoglobinas, elas são ditas hipocrômicas.
        Quando têm muitas, são hipercrômicas.

        O HCM (hemoglobina corpuscular média) ou HGM 
        (hemoglobina globular média)
        é o peso da hemoglobina dentro das hemácias.
        
        O CHCM (concentração de hemoglobina corpuscular média)
        ou CHGM (concentração de hemoglobina globular média)
        avalia a concentração de hemoglobina dentro da hemácia.`
        }])

    const [textoLeocograma, setTextoLeocograma] = useState('')

    function capitalize(palavra) {
        if (palavra) {
            return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()
        }

        return palavra
    }


    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const [corRDW, setCorRDW] = useState(true)
    const [corVCM, setCorVCM] = useState(false)
    const [corHCMECHCM, setCorHCMECHCM] = useState(false)

    const [textoIndicesEritograma, setTextoIndicesEritograma] = useState('')

    const [nomeExameIndicesGraficos, setNomeExameIndicesGraficos] = useState('RDW')

    function trocaListaIndicesEritograma(newAlignment) {
        if (newAlignment === 'rdw') {
            setCorRDW(true)
            setCorVCM(false)
            setCorHCMECHCM(false)
            setNomeExameIndicesGraficos("rdw")
            setTextoIndicesEritograma(listaTextoIndicesEritogrma[0].texto)

        }
        if (newAlignment === 'vcm') {
            setCorRDW(false)
            setCorVCM(true)
            setCorHCMECHCM(false)
            setNomeExameIndicesGraficos("vcm")
            setTextoIndicesEritograma(listaTextoIndicesEritogrma[1].texto)
        }
        if (newAlignment === 'hcm') {
            setCorRDW(false)
            setCorVCM(false)
            setCorHCMECHCM(true)
            setNomeExameIndicesGraficos("hcm")
            setTextoIndicesEritograma(listaTextoIndicesEritogrma[2].texto)
        }
    }

    const [corLG, setCorLG] = useState(true)
    const [corNB, setCorNB] = useState(false)
    const [corNS, setCorNS] = useState(false)
    const [corLI, setCorLI] = useState(false)
    const [corMN, setCorMN] = useState(false)
    const [corES, setCorES] = useState(false)
    const [corBS, setCorBS] = useState(false)
    const [corPT, setCorPT] = useState(false)


    const [nomeExameGrafico, setNomeExameGrafico] = useState('leucocitos - global')

    function trocaCorLista(newAlignment) {
        if (newAlignment === 'leucocitos - global') {
            setCorLG(true)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[0].text)
        }
        if (newAlignment === 'neutrofilos bastonetes') {
            setCorLG(false)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(true)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[1].text)
        }
        if (newAlignment === 'neutrofilos segmentados') {
            setCorLG(false)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(true)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[2].text)
        }
        if (newAlignment === 'linfocitos') {
            setCorLG(false)
            setCorBS(false)
            setCorES(false)
            setCorLI(true)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[3].text)
        }
        if (newAlignment === 'monocitos') {
            setCorLG(false)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(true)
            setCorNB(false)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[4].text)
        }
        if (newAlignment === 'eosinofilos') {
            setCorLG(false)
            setCorBS(false)
            setCorES(true)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[5].text)
        }
        if (newAlignment === 'basafilos') {
            setCorLG(false)
            setCorBS(true)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
            setCorPT(false)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[6].text)
        }
        if (newAlignment === 'plaquetas') {
            setCorLG(false)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
            setCorPT(true)
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[7].text)
        }
    }



    async function buscarExames() {
        try {
            if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/getBanco/exames?id=${null}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    // console.log(response.data);
                    setListaResultadosDados(response.data)
                }
            } else if (localStorage.getItem('id_paciente')) {
                const response = await api.get(`/getBanco/exames?id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    // console.log(response.data);
                    setListaResultadosDados(response.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarExames()
    },
        // eslint-disable-next-line 
        [])




    return (
        <div className='grafico-dashboard'>
            <nav className='navegacao-graficos box-show'>
                <div className='titulo-navegacao-graficos'>
                    {currentPage === 1 && (<h1>Eritrograma</h1>)}
                    {currentPage === 2 && (<h1>Eritrograma indices</h1>)}
                    {currentPage === 3 && (<h1>Leucograma</h1>)}
                </div>
                <Stack className='stack' spacing={2} >
                    <Pagination
                        count={3}
                        variant="outlined"
                        shape="rounded"
                        className="pagination"
                        page={currentPage}
                        onChange={handleChange}
                        color={currentPage === 1 ? "primary" : currentPage === 2 ? "primary" : "info"}
                    />
                </Stack>
                <div className='navegacao-buscar'>
                    <button className='button-add-filter-dashboard' >
                        <TuneIcon sx={{ width: '90%', height: '97%', color: '#fff' }} />
                    </button>
                    <div className='nav-paciente-input-lista-exames-usuario'>
                        <input
                            className='buscar-exames'
                            type="text"
                            maxlength="33"
                            placeholder='Pesquisa exame'
                        // onChange={(e) => filtraExames(e.target.value)}
                        />
                        <button className='button-search'>
                            <SearchIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                        </button>
                    </div>
                </div>
            </nav>
            <div className='graficos'>
                {currentPage === 1 && (listaResultadosDados) && (
                    <>
                        <ChartComponent
                            dataDados={listaResultadosDados ? listaResultadosDados.hemacias : [0, 0]}
                            line={false}
                            name={listaResultadosDados ? 'Hemacias' : 'indisponivel'}
                        />
                        <ChartComponent
                            dataDados={listaResultadosDados ? listaResultadosDados.hematocrito : [0, 0]}
                            line={true}
                            name={listaResultadosDados ? 'Hematocrito' : 'indisponivel'}
                        />
                        <ChartComponent
                            dataDados={listaResultadosDados ? listaResultadosDados.hemoglobina : [0, 0]}
                            line={true}
                            name={listaResultadosDados ? 'Hemoglobina' : 'indisponivel'}
                        />
                        <div className='texto-eritrograma'>
                            <br />
                            <h2>Eritrograma: </h2>
                            <hr></hr>
                            <br />
                            <p>
                                O eritrograma é a primeira parte do hemograma. É o estudo dos eritrócitos, que também podem ser chamados hemácias,
                                glóbulos vermelhos ou células vermelhas.
                                É através da avaliação do eritrograma que podemos saber se um paciente tem anemia.
                            </p>
                            <br />
                            <h2>Hematócrito e hemoglobina :</h2>
                            <hr></hr>
                            <br />
                            <p>
                                Os três primeiros dados, contagem de hemácias, hemoglobina e hematócrito, são analisados em conjunto. Quando estão reduzidos,
                                indicam anemia, isto é, baixo número de glóbulos vermelhos no sangue. Quando estão elevados indicam policitemia,
                                que é o excesso de hemácias circulantes.
                                <br />
                                O hematócrito é o percentual do sangue ocupado pelas hemácias.
                                Um hematócrito de 45% significa que 45% do sangue é composto por hemácias.
                                Os outros 55% são basicamente água e todas as outras substâncias diluídas.
                                Pode-se notar, portanto, que praticamente metade do nosso sangue é composto por células vermelhas.
                                <br />
                                Se por um lado a falta de hemácias prejudica o transporte de oxigênio,
                                por outro, células vermelhas em excesso deixam o sangue muito espesso,
                                atrapalhando seu fluxo e favorecendo a formação de coágulos.
                                <br />
                                A hemoglobina é uma molécula que fica dentro da hemácia.
                                É a responsável pelo transporte de oxigênio. Na prática,
                                a dosagem de hemoglobina acaba sendo a mais precisa na avaliação de uma anemia.
                            </p>
                            <br />
                        </div>
                    </>
                )}
                {currentPage === 2 && (listaResultadosDados) && (
                    <div className='graficos-page-3'>
                        <nav className='lista-page-3'>
                            <button onClick={() => trocaListaIndicesEritograma('rdw')} style={{ color: `${corRDW ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corRDW ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '5px 0px 0px 5px' }} value="Leucocitos">RDW</button>
                            <button onClick={() => trocaListaIndicesEritograma('vcm')} style={{ color: `${corVCM ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corVCM ? "rgb(25, 38, 52)" : "#fff"}` }} value="Bastonetes">VCM</button>
                            <button onClick={() => trocaListaIndicesEritograma("hcm")} style={{ color: `${corHCMECHCM ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corHCMECHCM ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '0px 5px 5px 0px', borderRight: '1px solid lightgray' }} value="Segmentados">HCM & CHCM</button>
                        </nav>
                        <div className='page-3-grafico'>

                            <div className='page-3-indice-eritograma'>
                                <ChartComponent
                                    dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameIndicesGraficos ? nomeExameIndicesGraficos : "rdw"}`] : [0, 0]}
                                    line={true}
                                    name={listaResultadosDados ? `${nomeExameIndicesGraficos ? capitalize(nomeExameIndicesGraficos) : "RDW"}` : 'indisponivel'}
                                />
                                {nomeExameIndicesGraficos === 'hcm' ? (
                                    <ChartComponent
                                        dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameIndicesGraficos ? 'chcm' : "rdw"}`] : [0, 0]}
                                        line={true}
                                        name={listaResultadosDados ? `${nomeExameIndicesGraficos ? "Chcm" : "RDW"}` : 'indisponivel'}
                                    />
                                ) : ""}
                            </div>

                            <div className='texto-indices-eritograma'>
                                <br></br>
                                {nomeExameIndicesGraficos && nomeExameIndicesGraficos !== 'hcm' && (<h2>{listaResultadosDados ? `${nomeExameIndicesGraficos !== 'hcm' ? capitalize(nomeExameIndicesGraficos) : "RDW"} ` : 'indisponivel'} :</h2>)}
                                {nomeExameIndicesGraficos && nomeExameIndicesGraficos === 'hcm' && (<h2>{listaResultadosDados ? `${nomeExameIndicesGraficos === 'hcm' ? 'Hcm & Chcm' : "RDW"} ` : 'indisponivel'} :</h2>)}
                                <br></br>
                                <p>
                                    {textoIndicesEritograma ? textoIndicesEritograma : `
                                 O RDW é um índice que avalia a diferença de tamanho entre as hemácias.
                                 Quando este está elevado significa que existem muitas hemácias de tamanhos diferentes circulando.
                                 Isso pode indicar hemácias com problemas na sua morfologia. É muito comum RDW elevado, por exemplo,
                                 na carência de ferro, onde a falta deste elemento impede a formação da hemoglobina normal,
                                 levando à formação de uma hemácia de tamanho reduzido.
                                `}
                                </p>
                                <br></br>
                            </div>
                        </div>
                    </div>

                )}
                {currentPage === 3 && (listaResultadosDados) && (
                    <div className='graficos-page-3'>
                        <nav className='lista-page-3'>
                            <button onClick={() => trocaCorLista('leucocitos - global')} style={{ color: `${corLG ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corLG ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '5px 0px 0px 5px' }} value="Leucocitos">Leucocitos</button>
                            <button onClick={() => trocaCorLista('neutrofilos bastonetes')} style={{ color: `${corNB ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corNB ? "rgb(25, 38, 52)" : "#fff"}` }} value="Bastonetes">N. Bastonetes</button>
                            <button onClick={() => trocaCorLista("neutrofilos segmentados")} style={{ color: `${corNS ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corNS ? "rgb(25, 38, 52)" : "#fff"}` }} value="Segmentados">N. Segmentados</button>
                            <button onClick={() => trocaCorLista('linfocitos')} style={{ color: `${corLI ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corLI ? "rgb(25, 38, 52)" : "#fff"}` }} value="Linfocitos">Linfocitos</button>
                            <button onClick={() => trocaCorLista('monocitos')} style={{ color: `${corMN ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corMN ? "rgb(25, 38, 52)" : "#fff"}` }} value="Monocitos">Monocitos</button>
                            <button onClick={() => trocaCorLista("eosinofilos")} style={{ color: `${corES ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corES ? "rgb(25, 38, 52)" : "#fff"}` }} value="Eosinofilos">Eosinofilos</button>
                            <button onClick={() => trocaCorLista('basafilos')} style={{ color: `${corBS ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corBS ? "rgb(25, 38, 52)" : "#fff"}` }} value="Basafilos">Basofilos</button>
                            <button onClick={() => trocaCorLista('plaquetas')} style={{ color: `${corPT ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corPT ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '0px 5px 5px 0px', borderRight: '1px solid lightgray' }} value="Plaquetas">Plaquetas</button>
                        </nav>
                        <div className='page-3-grafico'>

                            <ChartComponent
                                dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameGrafico ? nomeExameGrafico : "Leucocitos - global"}`] : [0, 0]}
                                line={true}
                                name={listaResultadosDados ? `${nomeExameGrafico ? capitalize(nomeExameGrafico) : "Leucocitos - global"}` : 'indisponivel'}
                            />
                            <div className='texto-leucograma'>
                                <br></br>
                                <h2>{listaResultadosDados ? `${nomeExameGrafico ? capitalize(nomeExameGrafico) : "Leucocitos - global"}` : 'indisponivel'}</h2>
                                <br></br>
                                <p>
                                    {textoLeocograma ? textoLeocograma : `
                                         Os leucócitos são as células de defesa responsáveis por
                                        combater agentes invasores. Na verdade, os leucócitos não 
                                        são um tipo único de célula, mas sim um grupo de diferentes 
                                        células, com diferentes funções no sistema imune. 
                                        Alguns leucócitos atacam diretamente o invasor, 
                                        outros produzem anticorpos e alguns apenas fazem a 
                                        identificação do microrganismo invasor.
                                       `}
                                </p>
                                <br></br>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}