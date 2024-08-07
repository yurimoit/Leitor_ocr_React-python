import { useEffect, useState } from 'react'
import ChartComponent from '../grafico'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import './styles.css'
import api from '../../services/api'
import ButtonsGrafico from './componenteButtons';
import ChartComponentValues from '../grafico/componenteGrafico';
import toast from 'react-hot-toast';
import ComponenteLPA from '../grafico/componenteLPA';
import ComponenteLPAData from '../grafico/componenteLPAData';


export default function DashBoard({ isPageDashBoard }) {

    const [listaResultadosDados, setListaResultadosDados] = useState({})
    const [listaDadosParanalisador, setListaDadosParanalisador] = useState({})
    const [listaRelatorio, setListaRelatorio] = useState({})
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
        }])

    const [listaTextoEritogrma,
        // eslint-disable-next-line
        setListaTextoEritogrma] = useState([{
            nome: 'hemacias',
            texto: `Se por um lado a falta de hemácias prejudica o transporte de oxigênio,
                                por outro, células vermelhas em excesso deixam o sangue muito espesso,
                                atrapalhando seu fluxo e favorecendo a formação de coágulos.`
        }, {
            nome: 'hematocrito',
            texto: `O hematócrito é o percentual do sangue ocupado pelas hemácias.
                                Um hematócrito de 45% significa que 45% do sangue é composto por hemácias.
                                Os outros 55% são basicamente água e todas as outras substâncias diluídas.
                                Pode-se notar, portanto, que praticamente metade do nosso sangue é composto por células vermelhas.`
        }, {
            nome: 'hemoglobina',
            texto: `A hemoglobina é uma molécula que fica dentro da hemácia.
                                É a responsável pelo transporte de oxigênio. Na prática,
                                a dosagem de hemoglobina acaba sendo a mais precisa na avaliação de uma anemia.`
        },
        {
            nome: 'plaquetas',
            texto: `As plaquetas são fragmentos de células responsáveis pelo 
                    início do processo de coagulação. Quando um tecido de qualquer 
                    vaso sanguíneo é lesado, o organismo rapidamente encaminha as 
                    plaquetas ao local da lesão. As plaquetas se agrupam e formam um 
                    trombo, uma espécie de rolha ou tampão, que imediatamente estanca 
                    o sangramento. Graças à ação das plaquetas, o organismo tem tempo 
                    de reparar os tecidos lesados sem haver muita perda de sangue.

                    O valor normal das plaquetas varia entre 150.000 a 450.000 por 
                    microlitro (uL). Porém, até valores próximos de 50.000, 
                    o organismo não apresenta dificuldades em iniciar a coagulação.`
        }
        ])

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

    const [corHemacia, setCorHemacia] = useState(true)
    const [corHemacocrito, setCorHemacocrito] = useState(false)
    const [corHemoglobina, setCorHemoglobina] = useState(false)
    const [corPlaqueta, setCorPlaqueta] = useState(false)

    const [textoIndicesEritograma, setTextoIndicesEritograma] = useState('')
    const [textoEritograma, setTextoEritograma] = useState('')

    const [nomeExameIndicesGraficos, setNomeExameIndicesGraficos] = useState('RDW')
    const [nomeExameEritogramaGraficos, setNomeExameEritogramaGraficos] = useState('Hemácias')
    const [nomeExameGrafico, setNomeExameGrafico] = useState('leucocitos - global')

    function trocaListaEritograma(newAlignment) {
        if (newAlignment === 'hemacias') {
            setCorHemacia(true)
            setCorHemacocrito(false)
            setCorHemoglobina(false)
            setCorPlaqueta(false)
            setNomeExameEritogramaGraficos(newAlignment)
            setTextoEritograma(listaTextoEritogrma[0].texto)

        }
        if (newAlignment === 'hematocrito') {
            setCorHemacia(false)
            setCorHemacocrito(true)
            setCorHemoglobina(false)
            setCorPlaqueta(false)
            setNomeExameEritogramaGraficos(newAlignment)
            setTextoEritograma(listaTextoEritogrma[1].texto)
        }
        if (newAlignment === 'hemoglobina') {
            setCorHemacia(false)
            setCorHemacocrito(false)
            setCorHemoglobina(true)
            setCorPlaqueta(false)
            setNomeExameEritogramaGraficos(newAlignment)
            setTextoEritograma(listaTextoEritogrma[2].texto)
        }
        if (newAlignment === 'plaquetas') {
            setCorHemacia(false)
            setCorHemacocrito(false)
            setCorHemoglobina(false)
            setCorPlaqueta(true)
            setNomeExameEritogramaGraficos(newAlignment)
            setTextoEritograma(listaTextoEritogrma[3].texto)
        }
    }

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

    const [corBarLine, setCorBarLine] = useState(false)


    function trocaCorLista(newAlignment) {
        if (newAlignment === 'leucocitos - global') {
            setCorLG(true)
            setCorBS(false)
            setCorES(false)
            setCorLI(false)
            setCorMN(false)
            setCorNB(false)
            setCorNS(false)
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
            setNomeExameGrafico(newAlignment)
            setTextoLeocograma(listaTextoLeocograma[6].text)
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
            } else if (localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')) {
                const response = await api.get(`/getBanco/exames?id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    setListaResultadosDados(response.data)
                }
            }
        } catch (error) {
            toast.error("Error no servido 500")
        }
    }

    async function buscarDadosParanalisador() {
        try {
            if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/gerar/dados_paranalisador?id_paciente=${null}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    console.log(response.data);
                    setListaDadosParanalisador(response.data)
                }
            } else if (localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')) {
                const response = await api.get(`/gerar/dados_paranalisador?id_paciente=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    setListaDadosParanalisador(response.data)
                }
            }
        } catch (error) {
            toast.error("Error no servido 500")
        }
    }

    async function buscarRelatorio() {
        try {
            if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/getBanco/relatorio?id=${null}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    console.log(response.data);
                    setListaRelatorio(response.data[9])
                }
            } else if (localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')) {
                const response = await api.get(`/getBanco/relatorio?id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                        }
                    }
                )

                if (response && response.data) {
                    console.log(response.data);
                    setListaRelatorio(response.data[9])
                }
            }
        } catch (error) {
            toast.error("Error no servido 500")
        }
    }

    useEffect(() => {
        buscarExames()
        buscarRelatorio()
        trocaListaEritograma('hemacias')
        trocaListaIndicesEritograma('rdw')
        
        if (currentPage===4){
            buscarDadosParanalisador()
        }

    },
        // eslint-disable-next-line 
        [isPageDashBoard, currentPage])


        console.log("DADOS PR: ", listaDadosParanalisador);

    return (
        <div className='grafico-dashboard'>
            <nav className='navegacao-graficos box-show'>
                <div className='titulo-navegacao-graficos'>
                    {currentPage === 1 && (<h1>Eritrograma</h1>)}
                    {currentPage === 2 && (<h1>Eritrograma indices</h1>)}
                    {currentPage === 3 && (<h1>Leucograma</h1>)}
                    {currentPage === 4 && (<h1>LPA-MPD</h1>)}
                </div>
                <Stack className='stack' spacing={2} >
                    <Pagination
                        count={4}
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
                    <div className='graficos-page-3'>
                        <nav className='lista-page-3'>
                            <ButtonsGrafico
                                corBarLine={corBarLine}
                                setCorBarLine={setCorBarLine}
                            />
                            <nav className='lista-page-3-buttons'>
                                <button onClick={() => trocaListaEritograma('hemacias')} style={{ color: `${corHemacia ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corHemacia ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '5px 0px 0px 5px' }} value="Hemacias">Hemacias</button>
                                <button onClick={() => trocaListaEritograma('hematocrito')} style={{ color: `${corHemacocrito ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corHemacocrito ? "rgb(25, 38, 52)" : "#fff"}` }} value="Hematocrito">Hematocrito</button>
                                <button onClick={() => trocaListaEritograma("hemoglobina")} style={{ color: `${corHemoglobina ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corHemoglobina ? "rgb(25, 38, 52)" : "#fff"}` }} value="Hemoglobina">Hemoglobina</button>
                                <button onClick={() => trocaListaEritograma('plaquetas')} style={{ color: `${corPlaqueta ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corPlaqueta ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '0px 5px 5px 0px', borderRight: '1px solid lightgray' }} value="Plaquetas">Plaquetas</button>
                            </nav>
                        </nav>
                        <div className='texto-grafico-eritograma'>
                            <section className='grafico-eritograma'>
                                <ChartComponent
                                    dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameEritogramaGraficos ? nomeExameEritogramaGraficos : "hemacias"}`] : [0, 0]}
                                    line={corBarLine}
                                    name={listaResultadosDados ? `${nomeExameEritogramaGraficos ? capitalize(nomeExameEritogramaGraficos) : "Hemácias"}` : 'indisponivel'}
                                />
                                <ChartComponentValues
                                    dataDados={listaRelatorio ? listaRelatorio[`${nomeExameEritogramaGraficos ? nomeExameEritogramaGraficos : "hemacias"}`] : [0, 0]}
                                    line={corBarLine}
                                    name={"Estatísticas"}
                                />
                            </section>

                            <article className='texto-indices-eritograma'>
                                <br></br>
                                {nomeExameEritogramaGraficos && nomeExameEritogramaGraficos !== 'hemacias' && (<h2>{listaResultadosDados ? `${nomeExameEritogramaGraficos !== 'hemacias' ? capitalize(nomeExameEritogramaGraficos) : "Hemacias"} ` : 'indisponivel'} :</h2>)}
                                {nomeExameEritogramaGraficos && nomeExameEritogramaGraficos === 'hemacias' && (<h2>{listaResultadosDados ? `${nomeExameEritogramaGraficos === 'hemacias' ? 'Hemácias' : "Hematocrito"} ` : 'indisponivel'} :</h2>)}
                                <br></br>
                                <p>
                                    {textoEritograma ? textoEritograma : `
                                Os três primeiros dados, contagem de hemácias, hemoglobina e hematócrito, são analisados em conjunto. Quando estão reduzidos,
                                indicam anemia, isto é, baixo número de glóbulos vermelhos no sangue. Quando estão elevados indicam policitemia,
                                que é o excesso de hemácias circulantes.
                                `}
                                </p>
                                <br></br>
                            </article>
                        </div>
                    </div>
                )}
                {currentPage === 2 && (listaResultadosDados) && (
                    <div className='graficos-page-3'>
                        <nav className='lista-page-3'>
                            <ButtonsGrafico
                                corBarLine={corBarLine}
                                setCorBarLine={setCorBarLine}
                            />
                            <nav className='lista-page-3-buttons'>
                                <button onClick={() => trocaListaIndicesEritograma('rdw')} style={{ color: `${corRDW ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corRDW ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '5px 0px 0px 5px' }} value="RDW">RDW</button>
                                <button onClick={() => trocaListaIndicesEritograma('vcm')} style={{ color: `${corVCM ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corVCM ? "rgb(25, 38, 52)" : "#fff"}` }} value="VCM">VCM</button>
                                <button onClick={() => trocaListaIndicesEritograma("hcm")} style={{ color: `${corHCMECHCM ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corHCMECHCM ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '0px 5px 5px 0px', borderRight: '1px solid lightgray' }} value="HCM & CHCM">HCM & CHCM</button>
                            </nav>
                        </nav>
                        <div className='page-3-grafico'>
                            <section className='grafico-eritograma'>
                                <ChartComponent
                                    dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameIndicesGraficos ? nomeExameIndicesGraficos : "rdw"}`] : [0, 0]}
                                    line={corBarLine}
                                    optionsValuesCHCM={nomeExameIndicesGraficos === 'hcm' ? listaResultadosDados["chcm"] : null}
                                    name={listaResultadosDados ? `${nomeExameIndicesGraficos ? capitalize(nomeExameIndicesGraficos) : "RDW"}` : 'indisponivel'}
                                />

                                <ChartComponentValues
                                    dataDados={listaRelatorio ? listaRelatorio[`${nomeExameIndicesGraficos ? nomeExameIndicesGraficos : "rdw"}`] : [0, 0]}
                                    optionsValuesCHCM={nomeExameIndicesGraficos === 'hcm' ? listaRelatorio["chcm"] : null}
                                    line={corBarLine}
                                    name={"Estatísticas"}
                                />
                            </section>

                            <article className='texto-indices-eritograma'>
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
                            </article>
                        </div>
                    </div>

                )}
                {currentPage === 3 && (listaResultadosDados) && (
                    <div className='graficos-page-3'>
                        <nav className='lista-page-3'>
                            <ButtonsGrafico
                                corBarLine={corBarLine}
                                setCorBarLine={setCorBarLine}
                            />
                            <nav className='lista-page-3-buttons'>
                                <button onClick={() => trocaCorLista('leucocitos - global')} style={{ color: `${corLG ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corLG ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '5px 0px 0px 5px' }} value="Leucocitos">Leucocitos</button>
                                <button onClick={() => trocaCorLista('neutrofilos bastonetes')} style={{ color: `${corNB ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corNB ? "rgb(25, 38, 52)" : "#fff"}` }} value="Bastonetes">N. Bastonetes</button>
                                <button onClick={() => trocaCorLista("neutrofilos segmentados")} style={{ color: `${corNS ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corNS ? "rgb(25, 38, 52)" : "#fff"}` }} value="Segmentados">N. Segmentados</button>
                                <button onClick={() => trocaCorLista('linfocitos')} style={{ color: `${corLI ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corLI ? "rgb(25, 38, 52)" : "#fff"}` }} value="Linfocitos">Linfocitos</button>
                                <button onClick={() => trocaCorLista('monocitos')} style={{ color: `${corMN ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corMN ? "rgb(25, 38, 52)" : "#fff"}` }} value="Monocitos">Monocitos</button>
                                <button onClick={() => trocaCorLista("eosinofilos")} style={{ color: `${corES ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corES ? "rgb(25, 38, 52)" : "#fff"}` }} value="Eosinofilos">Eosinofilos</button>
                                <button onClick={() => trocaCorLista('basafilos')} style={{ color: `${corBS ? "#fff" : "rgb(25, 38, 52)"}`, backgroundColor: `${corBS ? "rgb(25, 38, 52)" : "#fff"}`, borderRadius: '0px 5px 5px 0px', borderRight: '1px solid lightgray' }} value="Basafilos">Basofilos</button>
                            </nav>
                        </nav>
                        <div className='page-3-grafico'>

                            <section className='grafico-eritograma'>
                                <ChartComponent
                                    dataDados={listaResultadosDados ? listaResultadosDados[`${nomeExameGrafico ? nomeExameGrafico : "Leucocitos - global"}`] : [0, 0]}
                                    line={corBarLine}
                                    name={listaResultadosDados ? `${nomeExameGrafico ? capitalize(nomeExameGrafico) : "Leucocitos - global"}` : 'indisponivel'}
                                />
                                <ChartComponentValues
                                    dataDados={listaRelatorio ? listaRelatorio[`${nomeExameGrafico ? nomeExameGrafico : "Leucocitos - global"}`] : [0, 0]}
                                    line={corBarLine}
                                    name={"Estatísticas"}
                                />
                            </section>
                            <article className='texto-leucograma'>
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
                            </article>

                        </div>
                    </div>
                )}
                {currentPage === 4 && (listaResultadosDados) && (
                    <div className='graficos-page-3'>
                        <div className='page-3-grafico'>
                            <section className='grafico-eritograma'>
                                <ComponenteLPA
                                  dadosParanalisador={listaDadosParanalisador}
                                /> 
                                <ComponenteLPAData 
                                  dadosParanalisador={listaDadosParanalisador}
                                 line={true}
                                />
                            </section>
                            <article className='texto-leucograma'>
                            <br></br>
                                <h2>{'Lógica paraconsistente anotada - MPD'}</h2>
                                <br></br>
                                <p style={{fontSize:"1.4rem"}}>
                                    
                                         V = 0.6 {"<="}H {"<="} 1 {"---->"} VERDADEIRO <br/>
                                         IN = 0.6 {"<="}G {"<="} 1 {"---->"} INCONSISTENTE <br/>
                                         PR = -1 {"<="}G {"<="}-0.6 {"---->"} PARACOMPLETO  <br/>
                                         F = -1 {"<="}H {"<="} -0.6 {"---->"} FALSO
                                       
                                </p>
                                <br></br>
                            </article>
                        </div>   
                    </div> 
                )
                }        

            </div>
        </div>
    )
}