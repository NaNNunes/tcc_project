import MinhasInfos from "../../componentes/conta_perfil/MinhasInfos"
import Endereco from "../../componentes/Endereco"
import Seguranca from "../../componentes/conta_perfil/Seguranca"
import Encerrar from "../../componentes/conta_perfil/Encerrar"
import EditarPag from "../../componentes/conta_perfil/EditarPag"

const Conta = () => {
  let tipoUser = 2;

  return (
    <>
      <MinhasInfos/>
      {
        tipoUser == 1 
          ? <EditarPag/>
          : <Endereco/>
      }
      <Seguranca/>
      <Encerrar/>
    </>
  )
}

export default Conta