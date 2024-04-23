import "./styles.css";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import toast from "react-hot-toast";
import avisoDeletarExame from "../../assets/aviso-deletar-cobranca.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModalDeletarPaciente({ closeModalDeletarPaciente, setCloseModalDeletarPaciente, idPaciente, setFinalizarExcluirPaciente }) {
    const [id, setId] = useState(null)

    async function mandarDeletar() {

        try {
            const response = await api.delete(`/deletar/paciente/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("E%H6%2&6GB8UU!UZ3XncHd")}`,
                    },
                });
            if (response) {
                console.log('');
            }
            setFinalizarExcluirPaciente("success")
            setCloseModalDeletarPaciente(false)
        } catch (error) {
            // console.log(error);
            setFinalizarExcluirPaciente("warning")
            setCloseModalDeletarPaciente(false)
            if (error && error.response.data.mensagem) {
                toast.error(error.response.data.mensagem)
            }
        }

    }

    useEffect(() => {
        setId(idPaciente)
    }, [idPaciente])

    return (
        <div>
            <Modal
                open={closeModalDeletarPaciente}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-deletaCobranca-j">
                <Box className="Box-deletarCobranca-j">
                    <div className="container-deletar-cobranca-j">
                        <div className="deletar-buttonSair-img">
                            <div className="deletarCobranca-img">
                                <img src={avisoDeletarExame} alt="" />
                                <strong>Tem certeza que deseja excluir este paciente?</strong>
                            </div>
                            <button
                                className="container-deletar-cobranca-j-button"
                                type="button"
                                onClick={() => setCloseModalDeletarPaciente(false)}>
                                <CloseIcon sx={{ width: "100%", height: "100%" }} />
                            </button>
                        </div>
                        <div className="linha-botao-deletar-j">
                            <button
                                id="botao-nao-j"
                                onClick={() => setCloseModalDeletarPaciente(false)}>
                                Não
                            </button>
                            <button onClick={() => mandarDeletar()}>Sim</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}