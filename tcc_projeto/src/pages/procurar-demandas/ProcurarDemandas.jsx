// Importação do card de demanda.
import CardDemanda from '../../componentes/card-demanda/CardDemanda';

// Importação do react-bootstrap.
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from './ProcurarDemandas.module.css'

import React, { useState } from 'react';

const ProcurarDemandas = () => {
  const todasAsDemandas = [
    {
      id: "f363",
    },
    {
      id: "a222",
    },
    {
      id: "b333",
    },
    {
      id: "c444",
    },
    {
      id: "d555",
    },
    {
      id: "e666",
    },
    {
      id: "f777",
    },
    {
      id: "g888",
    },
    {
      id: "h999",
    },
    {
      id: "i000",
    }
  ];

  const [numLinhas, setNumLinhas] = useState(2);
  const cardsPorLinha = 3;
  const cardsVisiveis = numLinhas * cardsPorLinha;

  const demandasParaMostrar = todasAsDemandas.slice(0, cardsVisiveis);

  const handleCarregarMais = () => {
    setNumLinhas(prev => prev + 2);
  };

  return (
    <div style={{paddingTop: '80px', paddingBottom: '80px'}}>
      <Container className={styles.caixa}>
        {demandasParaMostrar.map(demanda => (
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
        ))}
      </Container>

      {cardsVisiveis < todasAsDemandas.length && (
        <div>
          <Button onClick={handleCarregarMais}>Carregar mais</Button>
        </div>
      )}

      {/* PRECISA? */}
      {/* {cardsVisiveis > todasAsDemandas.length && (
        <div className="text-center mt-4">
          <Button onClick={handleCarregarMenos}>Carregar menos</Button>
        </div>
      )} */}
    </div>
  )
}

export default ProcurarDemandas