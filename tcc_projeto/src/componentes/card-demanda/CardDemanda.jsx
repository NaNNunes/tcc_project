// Importação do react-bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

// Importação de styles.
import styles from './CardDemanda.module.css';

// Importação dos icones.
import { MdOutlineSmartphone } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   


const CardDemanda = (props) => {

    console.log(props)
  return (
    <div style={{minWidth: '100%', maxWidth: '100%', margin: '0', padding: '0'}}>
        <Container className={styles.caixaCard}>
            <Card style={{ width: "100%", height: "25rem", display: "flex", flexDirection: "column"}}>
                <Card.Body>
                    <MdOutlineSmartphone />
                    <Card.Text>
                        {props.categoria}
                    </Card.Text>

                    <Card.Text>
                        {props.marca} - {props.modelo}
                    </Card.Text>

                    <Card.Text>
                        {props.cidade} - {props.estado}
                    </Card.Text>

                    <Card.Text>
                        {props.dataDeEmissao}
                    </Card.Text>

                    <Card.Text>
                        {props.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default CardDemanda