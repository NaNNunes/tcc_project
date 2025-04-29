import MinhasInfos from "../../../componentes/conta-e-perfil/MinhasInfos.jsx"
import Endereco from "../../../componentes/conta-e-perfil/Endereco.jsx"
import Seguranca from "../../../componentes/conta-e-perfil/Seguranca.jsx"
import Encerrar from "../../../componentes/conta-e-perfil/Encerrar.jsx"

const Config_conta_adm = () => {
  return (
    <>
        <MinhasInfos/>
        <Seguranca/>
        <Endereco/>
        <Encerrar/>
    </>
  )
}

export default Config_conta_adm