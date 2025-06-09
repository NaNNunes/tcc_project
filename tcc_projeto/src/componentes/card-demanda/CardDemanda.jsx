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
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const CardDemanda = (props) => {

  return (
    <div style={{minWidth: '100%', maxWidth: '100%', margin: '0', padding: '0'}}>
        <Container className={styles.caixaCard}>
            <Card style={{width: "100%", height: "25rem", display: "flex", flexDirection: "column"}}>
                <Card.Body>
                        <div style={{display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: '16px'}}>
                            <MdOutlineSmartphone size={50}/>
                            <div>
                                <Card.Text className={styles.textoCard}>
                                    {props.categoria}
                                </Card.Text>

                                <Card.Text className={styles.textoCard}>
                                    {props.marca} - {props.modelo}
                                </Card.Text>
                            </div>
                        </div>

                    <Card.Text className={styles.textoCard}>
                        <IoLocationOutline color='black' size={30}/> {props.cidade} - {props.estado}
                    </Card.Text>

                    <Card.Text className={styles.textoCard}>
                        <MdOutlineCalendarMonth color='black' size={30}/> {props.dataDeEmissao}
                    </Card.Text>

                    <Card.Text className={styles.textoCard}>
                        {props.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default CardDemanda