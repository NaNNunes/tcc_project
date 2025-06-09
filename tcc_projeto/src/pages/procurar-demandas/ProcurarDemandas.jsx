// Importação do card de demanda.
import CardDemanda from '../../componentes/card-demanda/CardDemanda';

// Importação do react-bootstrap.
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from './ProcurarDemandas.module.css'

import { useEffect, useState } from 'react';

const ProcurarDemandas = () => {
  
  //todas as demandas
  const [demandas, setDemandas] = useState([]);

  // buscar todas as demandas 
  const url = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    async function fetchData() {
      try {
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();
        console.log("demandas", response);
        setDemandas(response);

      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[]);

  const [numLinhas, setNumLinhas] = useState(2);
  const cardsPorLinha = 3;
  const cardsVisiveis = numLinhas * cardsPorLinha;

  const demandasParaMostrar = demandas.slice(0, cardsVisiveis);

  const handleCarregarMais = () => {
    setNumLinhas(prev => prev + 2);
  };

  return (
    <div style={{paddingTop: '80px', paddingBottom: '80px'}}>
      <Container className={styles.caixa}>
        {
          demandasParaMostrar.map(demanda => (
            (demanda.asssitencia === "Público") &&
              <CardDemanda 
                key={demanda.id}
                id={demanda.id}
                categoria={'Celular'}
                marca={'Samsung'}
                modelo={'S24+'}
                cidade={'Xique-Xique'}
                estado={'Bahia'}
                dataDeEmissao={'03/06/2025'}
                status={'Pendente'}
              />
          ))
        }
      </Container>

      {cardsVisiveis < demandas.length && (
        <div>
          <Button onClick={handleCarregarMais}>Carregar mais</Button>
        </div>
      )}

      {/* PRECISA? */}
      {/* {cardsVisiveis > demandas.length && (
        <div className="text-center mt-4">
          <Button onClick={handleCarregarMenos}>Carregar menos</Button>
        </div>
      )} */}
    </div>
  )
}

export default ProcurarDemandas