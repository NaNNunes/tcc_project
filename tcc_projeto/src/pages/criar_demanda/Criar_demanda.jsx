import CategoriaDispositivo from '../../componentes/cadastro-demanda/CategoriaDispositivo/CategoriaDispositivo.jsx';
import InformacoesDispositivo from '../../componentes/cadastro-demanda/InformacoesDispositivo/InformacoesDispositivo.jsx';
import Contexto from '../../componentes/cadastro-demanda/Contexto/Contexto.jsx'

const Criar_demanda = () => {
  return (
    <>
        <CategoriaDispositivo />
        <InformacoesDispositivo />
        <Contexto />
    </>
  )
}

export default Criar_demanda