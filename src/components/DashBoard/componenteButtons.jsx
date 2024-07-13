import './styles.css'

export default function ButtonsGrafico({ corBarLine, setCorBarLine }) {

    function trocarGrafico(status) {
        setCorBarLine(!status)
    }

    return (
        <nav className="button-referencia-grafico">
            <button onClick={() => trocarGrafico(corBarLine)} className='button-bar-line' style={{ borderRadius: '5px 0px 0px 5px', backgroundColor: `${corBarLine ? "rgb(8, 165, 8)" : "white"}`, color: `${corBarLine ? "white" : "black"}`, borderRight: "none" }}>
                Line
            </button>
            <button onClick={() => trocarGrafico(corBarLine)} className='button-bar-line' style={{ borderRadius: '0px 5px 5px 0px', backgroundColor: `${!corBarLine ? "rgb(8, 165, 8)" : "white"}`, color: `${corBarLine ? "black" : "white"}`, borderLeft: "none" }}>
                Bar
            </button>
        </nav>
    )

}