import "./styles.css";
import naoEncontrado from "../../assets/usuario-nao-encontrado.svg";

export default function ResultadoNaoEncontrado({ resultadoNaoEncontradoCobranca }) {
    return (
        <>
            <div className={resultadoNaoEncontradoCobranca ? "nenhum-encontrado-j-cobranca" : "nenhum-encontrado-j"}>
                <img src={naoEncontrado} alt="" />
                <div className="nao-encontrado-texto-j">
                    <strong>Nenhum resultado foi encontrado!</strong>
                    <span>Verifique se a esctrita está correta</span>
                </div>
            </div>
        </>
    );
}