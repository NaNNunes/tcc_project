// Importação do react-boostrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

// Importação dos icones.
import { MdOutlineSmartphone } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   

// Importação de estilo.
import stylesCad from './CadastroDemanda.module.css'

// Importação de useState e useEffect para utilizar em marcaSelecionada
import { useState } from 'react';
import { useEffect } from "react";

// Importação do useForm para mexer com o formulário.
import { set, useForm } from "react-hook-form";

// hooks json-server
import { useDemada, useCadastroAssistencia} from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

// Importação do verificador de CPF.
import { useVerificadorDeCpf } from "../../../hooks/useApi.js";

const categoriaDispositivo = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if(userType != "administrador" && userType != "solicitante") return navigate("/login");
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm();

    // lista de matchs de assistencias favoritas
    const {buscaAssistenciaById} = useCadastroAssistencia();
    const [assistencias, setAssistencias] = useState([]);

    // lista para receber assistencias vinculadas ao user, pelo match caso solicitante ou que possuam o id do adm, caso adm
    const listaAssistencias = [];

    const url = import.meta.env.VITE_API_URL;
    const buscaMatchs = async() =>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
        const response = await request.json();
        // console.log("Matchs:",response);

        // mapeia todas os matchs e retorna nome da assistencia pelo id encontrado no match
        // pegar assitencias apenas com que seja favoritadas pelo user, verificando o id do solicitante no match
        response.map(async (res)=>{
            if(res.id_solicitante === localStorage.getItem("userId")){
                const assistencia = await buscaAssistenciaById(res.id_assistencia);
                listaAssistencias.push(assistencia);
            }
        })
        setAssistencias(listaAssistencias);
        
    }

    // busca todas assistencias
    const buscaAssistenciasDoAdministrador = async()=>{
        const request = await fetch(`${url}/assistencia`);
        const response = await request.json();

        // verifica quais assistencias pertencem ao administrador
        response.map((assistencia)=>{
            if(assistencia.administradorId === userId){
                listaAssistencias.push(assistencia);
            }
        })

        setAssistencias(listaAssistencias);
    }

    const [openDropdown, setOpenDropdown] = useState(null); // useState para verificar se o dropdown esta aberto ou não.

    const {cadastrarDispositivo, cadastrarDemanda} = useDemada();
    // Categoria e marca selecionada no ListGroup.
    const categoriaSelecionada = watch("categoria");
    const [marcaSelecionada, setMarcaSelecionada] = useState("");

    // Estados do modal.
    const [mostrarModal, setMostrarModal] = useState(false);

    // Dados do Form temporários.
    const [dadosTemporarios, setDadosTemporarios] = useState(null);

    // Assistência pre-selecionada como público.
    const [atSelecionada, setAtSelecionada] = useState({});

    // Formato do CPF.
    const formatarCPF = (cpf) => {
        const numeros = cpf.replace(/\D/g, "").slice(0, 11);
        return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    // Verificar de CPF.
    const {verificador} = useVerificadorDeCpf();

    // Marcas e modelos para cada categoria.
    const dadosDispositivos = {
        "Celular": {
            "LG": ["LG K62+", "LG K62", "LG K41S", "LG K22+"],
            "Motorola": ["Edge 60 Fusion", "Moto G05", "Moto G35", "Moto G75"],
            "Nokia": ["Nokia 110", "Nokia 6300", "Nokia 106", "Nokia 150"],
            "Samsung": ["Galaxy A06", "Galaxy S24 FE", "Galaxy A16", "Galaxy S24 Ultra"],
            "Apple": ["iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13"]
        },
        "Tablet": {
            "Samsung": ["Tab S10 FE+", "Galaxy Tab S6 Lite", "Galaxy Tab S9 FE", "Tab A9 Plus"],
            "Xiaomi": ["Redmi Pad SE 8.7", "POCO PAD", "X95 Pro", "Redmi Pad Pro"],
            "Apple": ["iPad Air", "iPad Mini", "iPad Pro"]
        },
        "Notebook": {
            "Asus": ["ASUS Zenbook 14", "ASUS E510", "ASUS X515", "ASUS Vivobook 15"],
            "Acer": ["15-51M-57RT", "Aspire 3 A315-510P-35D2", "A515-45-R0XR", "Acer Nitro 5"],
            "Lenovo": ["IdeaPad 1 15IAU7", "82X5S00500", "IdeaPad 1 15IAU7", "LOQ 15IAX9E"]
        },
        "Desktop": {
            "Nvidia": ["RTX 1060", "RTX 2060", "RTX 3060", "RTX 4060", "RTX 5060", "GT 710"],
            "AMD Placa de Vídeo": ["RX 6600", "RX 9060 XT", "RX 7600", "RX 580"],
            "AMD Processador": ["Ryzen 7 3800X", "Ryzen 7 5700X3D", "Ryzen 5 5600X", "Ryzen 5 7600X"],
            "Intel Placa de Vídeo": ["Arc A750", "Arc B570", "Arc B580"],
            "Intel Processador": ["I7 14700K", "I9 14900K", "I5 14600K", "Ultra 5 245KF"]
        },
        "Periférico": {
            "Logitech Mouse": ["G Pro X Superlight 2", "G Pro", "G203", "G403"],
            "Logitech Teclado": ["G213 Prodigy", "G413", "G512 Carbon"],
            "Logitech Fone": ["Astro A50 X", "Astro A40", "Zone Vibe 100"],
            "Razer Mouse": ["Viper", "Deathadder V3", "Viper V3 Pro"],
            "Razer Teclado": ["Huntsman V3 Pro", "BlackWidow V3 Tenkeyless", "Huntsman Mini", "Deathstalker V2"]
        }
    };

    // Lista com as categorias do dispositivo.
    const categorias = [
        {label: "Celular", value: "Celular", icon: <MdOutlineSmartphone className="me-2" />},
        {label: "Tablet", value: "Tablet", icon: <FaTabletAlt className="me-2" />},
        {label: "Notebook", value: "Notebook", icon: <FaLaptop className="me-2" />},
        {label: "Desktop", value: "Desktop", icon: <FaDesktop className="me-2" />},
        {label: "Periférico", value: "Periférico", icon: <FaHeadphones className="me-2" />},
        {label: "Outros", value: "Outros", icon: null},   
    ];

    // Se a categoria selecionada for igual a outros troca o campo para o usuário digitar.
    const campoMarca = (categoriaSelecionada === "Outros" 
        ?   (
            <Form.Control 
                type='text'
                placeholder=''
                {...register("marca", {
                    required: "A marca é obrigatória",
                    minLength: {
                        value: 2,
                        message: "A marca deve conter pelo menos 2 caracteres."
                    },
                    maxLength: {
                        value: 45,
                        message: "A marca não pode conter mais do que 45 caracteres"
                    },
                    pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 &+\-\.]+$/,
                    message:
                        "Use somente letras, números, espaços e símbolos",
                    },
                })}
            />
            ) 
        : (
            <Form.Select
                type='select'
                placeholder=''
                {...register("marca", {
                    required: "A marca é obrigatória",
                    minLength: {
                        value: 2,
                        message: "A marca deve conter pelo menos 2 caractere."
                    },
                    maxLength: {
                        value: 45,
                        message: "A marca não pode conter mais do que 45 caracteres"
                    },
                    pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 &+\-\.]+$/,
                    message:
                        "Use somente letras, números, espaços e símbolos",
                    },
                })}
                onChange={(e) => {
                    setMarcaSelecionada(e.target.value); // Atualiza a marca selecionada.
                    setValue("marca", e.target.value, { shouldValidate: true }); // Pegando o valor selecionado
                    setValue("modelo", ""); // Limpa o modelo ao trocar de marca.
                }}
            >   
                <option value="">Selecione uma opção</option>
                {/* Mostra as opções de acordo com a categoria. */}
                {categoriaSelecionada && 
                    Object.keys(dadosDispositivos[categoriaSelecionada] || {}).map((marca) => (
                    <option key={marca} value={marca}>
                        {marca}
                    </option>
                ))}
            </Form.Select>
            )
    );

    // Se a categoria selecionada for igual a outros troca o campo para o usuário digitar.
    const campoModelo = (categoriaSelecionada === "Outros" ? (
        <Form.Control 
            type='text'
            placeholder=''
            {...register("modelo", {
                required: "O modelo é obrigatório",
                minLength: {
                    value: 2,
                    message: "A modelo deve conter pelo menos 2 caracteres."
                },
                maxLength: {
                    value: 30,
                    message: "A modelo não pode conter mais do que 30 caracteres"
                },
                pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 &+\-\.]+$/,
                message:
                    "Use somente letras, números, espaços e símbolos",
                },
            })}
        />
    ) : (
        <Form.Select 
            type='text'
            placeholder=''
            {...register("modelo", {
                required: 'O modelo é obrigatório',
                minLength: {
                    value: 2,
                    message: "A modelo deve conter pelo menos 2 caracteres."
                },
                maxLength: {
                    value: 30,
                    message: "A modelo não pode conter mais do que 30 caracteres"
                },
                pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 &+\-\.]+$/,
                message:
                    "Use somente letras, números, espaços e símbolos",
                },
            })}
        >
            <option value="">Selecione uma opção</option>
            {/* Só carrega os modelos se houver uma categoria e marca selecionada. */}
            {categoriaSelecionada && marcaSelecionada && dadosDispositivos[categoriaSelecionada]?.[marcaSelecionada]?.map((modelo) => (
                <option key={modelo} value={modelo}>
                    {modelo}
                </option>
            ))}
        </Form.Select>
    ));

    // Menu de dropdown que aparecera no modal para o solicitante
    const menuDropModalSolicitante = (
        <Dropdown.Menu className={stylesCad.dropdownMenu}>

            <Dropdown.Item className={stylesCad.dropdownItem} onClick={() => setAtSelecionada("Público")}>
                Enviar como público
            </Dropdown.Item>

            <Dropdown.Divider className={stylesCad.divisor}/>
            {/* map de lista de assistencias favoritadas de acordo com matchs com id do solicitante */}
            {
                assistencias.map((assistencia) => (
                    <Dropdown.Item 
                        key={assistencia.id} 
                        className={stylesCad.dropdownItem} 
                        onClick={() => setAtSelecionada(assistencia)}
                    >
                        {assistencia.nomeFantasia}
                    </Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
    );

    const menuDropDownModalAdministrador = (
        <Dropdown.Menu className={stylesCad.dropdownMenu}>

            {/* map de lista de assistencias favoritadas de acordo com matchs com id do solicitante */}
            {
                assistencias.map((assistencia) => (
                    <Dropdown.Item 
                        key={assistencia.id} 
                        className={stylesCad.dropdownItem} 
                        onClick={() => setAtSelecionada(assistencia)}
                    >
                        {assistencia.nomeFantasia}
                    </Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
    );

    // Quando o usuário mudar a categoria, reseta os campos de marca de modelo.
    useEffect(() => {
        setMarcaSelecionada("");
        setValue("marca", "");
        setValue("modelo", "");
    }, [categoriaSelecionada]);

    const onSubmit = async (dados) => {
        setDadosTemporarios(dados);

        if(userType === "solicitante") {
            buscaMatchs();
        }
        else if(userType === "administrador"){
            buscaAssistenciasDoAdministrador();
        }
        
        // Mostrando o Modal para ser selecionada a assistência
        setMostrarModal(true);
    }

    const enviarDemandaCompleta = async (assistenciaId) => {
        setMostrarModal(false);
        // defineDataEmissao();

        const dados = dadosTemporarios;
        // nao consegui fazer a tempo de forma eficiente e mais segura
        // separando dados de dispositivo
        const dispositivo = {
            "categoria": dados.categoria,
            "marca": dados.marca,
            "fabricante": dados.fabricante,
            "modelo": dados.modelo,
            "numSerie": dados.numSerie,
            "tensao": dados.tensao,
            "amperagem": dados.amperagem,
            "cor": dados.cor
        };

        // cadastrar dispositivo
        const idDispostivo = await cadastrarDispositivo(dispositivo);

        const statusPadrao = (userType === "solicitante") ? "aberto" : "Em atendimento"

        // separando dados de demanda
        const infosDemanda = {
            "idDispostivo" : idDispostivo,
            "descProblema" : dados.descProblema,
            "observacoes": dados.observacoes,
            "status": statusPadrao,
            "assistencia": assistenciaId || "Público"
        };

        // cadastrar demanda
        cadastrarDemanda(infosDemanda);
    }

    const onError = (errors) => {
        console.log("Erros: ", errors)
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Div para controlar o tamanho do Form. */}
        <div className={stylesCad.formulario}>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                {/* Categoria do dispositivo */}
                <Container fluid className={stylesCad.parteFormulario} style={{paddingBottom: '1.7rem', marginBottom: '20px'}}>
                     {/* Campo oculto para fazer o registro da categoria e caso tenha algum erro mostrar na tela. */}
                    <input
                        type="hidden"
                        {...register("categoria", {
                            required: "A categoria é obrigatória"
                        })}
                    />
                    {/* Título do container */}
                    <Row style={{paddingBottom: '1%'}}> 
                        <Col>
                            <h3 className={stylesCad.titleh3}>Categoria do dispositivo</h3>
                        </Col>
                    </Row>
                    {/* Seleção de categoria */}
                    <Row>
                        <Col style={{maxHeight: 'fit-content'}}>
                            <ListGroup 
                                horizontal 
                                className={stylesCad.lista}
                            >
                                {/* Map para carregar as categorias de 'const categorias' */}
                                {categorias.map((cat) => (
                                    <ListGroup.Item
                                        key={cat.value}
                                        value={cat.value}
                                        className={
                                            `${stylesCad.listaBotao} ${categoriaSelecionada === cat.value 
                                            ? stylesCad.listaBotaoSelecionado 
                                            : ""}`
                                        }

                                        onClick={() => setValue("categoria", cat.value, { shouldValidate: true })} 
                                        // shouldValidate serve para caso o erro já estiver presente na tela do usuário, quando for selecionado um campo o erro some imediatamente.
                                    >
                                        {cat.icon}
                                        {cat.label}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {errors.categoria && (
                                <span className='error'>{errors.categoria.message}</span>
                            )}
                        </Col>
                    </Row>
                </Container>

                {/* Informações do solicitante */}
                <Container fluid className={stylesCad.parteFormulario} style={{marginBottom: '20px'}}>
                    {/* Título do container */}
                    <Row style={{paddingBottom: '1%'}}>
                        <Col md={12} xs={12}>
                            <h3>Informações do solicitante</h3>
                        </Col>
                    </Row>
                    
                    {/* Informações do solicitante */}
                    <Row>
                        {/* Coluna do nome */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel 
                                id="userNomeInput" 
                                label="Nome"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    {...register("nome", {
                                        required: "O nome é obrigatório",
                                        minLength: {
                                        value: 2,
                                        message: "O nome deve ter pelo menos 2 caracteres",
                                        },
                                        maxLength: {
                                        value: 20,
                                        message: "O nome deve ter ate 20 caracteres",
                                        },
                                        pattern: {
                                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                                        message: "O nome só pode conter letras e espaços",
                                        },
                                    })}
                                />
                                {errors.nome && (
                                    <span className='error'>{errors.nome.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>
                        
                        {/* Coluna do sobrenome */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                id="userSobrenomeInput"
                                label="Sobrenome"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    {...register("sobrenome", {
                                        required: "O sobrenome é obrigatório",
                                        minLength: {
                                        value: 2,
                                        message: "O sobrenome deve ter pelo menos 2 caracteres",
                                        },
                                        maxLength: {
                                        value: 20,
                                        message: "O sobrenome deve ter ate 20 caracteres",
                                        },
                                        pattern: {
                                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                                        message: "O sobrenome só pode conter letras e espaços",
                                        },
                                    })}
                                />
                                {errors.sobrenome && (
                                    <span className='error'>{errors.sobrenome.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>

                        {/* Coluna de CPF */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel id="userCpfInput" className="mb-3" label="CPF">
                                <Form.Control
                                type="text"
                                placeholder="000.000.000-00"
                                value={formatarCPF(watch("cpf") || "")}
                                isInvalid={!!errors.userCpf}
                                onChange={(e) => {
                                    const apenasNumeros = e.target.value.replace(/\D/g, "");
                                    if (apenasNumeros.length <= 11) {
                                    setValue("userCpf", apenasNumeros);
                                    }
                                }}
                                {...register("cpf", {
                                    required: "CPF é obrigatório",
                                    validate: (value) => {
                                    const somenteNumeros = value.replace(/\D/g, ""); // remove tudo que não é número
                                    if (somenteNumeros.length !== 11) {
                                        return "Necessário 11 dígitos";
                                    }
                                    if (!verificador(somenteNumeros)) {
                                        return "CPF inválido";
                                    }
                                    return true;
                                    },
                                })}
                                />
                                {errors.cpf && (
                                    <span className='error'>{errors.cpf.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row>
                        {/* Coluna de e-mail */}
                        <Col md={8} xs={12} className={stylesCad.campo}>
                            <FloatingLabel 
                                controlId='EmailInput'
                                label='E-mail'
                            >
                                <Form.Control
                                name="email"
                                size="sm"
                                type="email"
                                placeholder=""
                                {...register("email", {
                                    required: "O email é obrigatório",
                                    pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Email inválido",
                                    },
                                    validate: (value) => value.includes("@") || "Email inválido",
                                })}
                                />
                                {errors.email && (
                                    <span className='error'>{errors.email.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>

                        {/* Coluna de telefone */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                id="userTelInput"
                                className="mb-3"
                                label="Telefone"
                            >
                                <Form.Control
                                type="text"
                                placeholder="(00) 00000-0000"
                                {...register("userTelefone", {
                                    required: "Telefone é obrigatório",
                                    pattern: {
                                    value: /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4})[-.\s]?(\d{4})$/,
                                    message: "Telefone inválido",
                                    },
                                })}
                                />
                                {errors.userTelefone && (
                                    <span className='error'>{errors.userTelefone.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>

                {/* Informações do dispositivo */}
                <Container fluid className={stylesCad.parteFormulario} style={{marginBottom: '20px'}}>
                    {/* Título do container */}
                    <Row style={{paddingBottom: '1%'}}> 
                        <Col md={12} xs={12}>
                            <h3 className={stylesCad.titleh3}>Informações do dispositivo</h3>
                        </Col>
                    </Row>

                    {/* Informações do dispositivo */}
                    <Row>
                        {/* Coluna de marca */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId='MarcaInput'
                                label='Marca'
                            >
                                {campoMarca}
                            </FloatingLabel>
                            {errors.marca && (
                                <span className='error'>{errors.marca.message}</span>
                            )}
                        </Col>
                        
                        {/* Coluna de fabricante */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId='FabricanteInput'
                                label='Fabricante'
                            >
                                <Form.Control 
                                    type='text'
                                    placeholder=''
                                    {...register("fabricante", {
                                        maxLength: {
                                            value: 45,
                                            message: "A fabricante não pode conter mais do que 45 caracteres"
                                        },
                                        pattern: {
                                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 &+\-\.]+$/,
                                        message:
                                            "Use somente letras, números, espaços e símbolos",
                                        },
                                    })}
                                />
                            </FloatingLabel>
                            {errors.fabricante && (
                                <span className='error'>{errors.fabricante.message}</span>
                            )}
                        </Col>

                        {/* Coluna de modelo */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId='ModeloInput'
                                label='Modelo'
                            >
                                {campoModelo} 
                            </FloatingLabel>
                            {errors.modelo && (
                                <span className='error'>{errors.modelo.message}</span>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        {/* Coluna de numero de serie */}
                        <Col md={4} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId="NumSerieInput"
                                label="N° de série"
                            >
                                <Form.Control 
                                    type='text'
                                    placeholder=''
                                    {...register("numSerie", {
                                        maxLength: {
                                            value: 30,
                                            message: "O número de série não pode ter mais de 30 caracteres",
                                        }, 
                                        pattern: {
                                            value: /^[A-Za-z0-9\-\/]+$/,
                                            message:
                                            "Use somente letras, números e hífen (-)",
                                        },
                                    })}
                                />
                            </FloatingLabel>
                            {errors.numSerie && (
                                <span className='error'>{errors.numSerie.message}</span>
                            )}
                        </Col>

                        {/* Coluna de tensao */}
                        <Col md={3} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId="TensaoInput"
                                label="Tensão(V)"
                            >
                                <Form.Control 
                                    type='text'
                                    placeholder=''
                                    {...register("tensao")}
                                />
                            </FloatingLabel>
                            {errors.tensao && (
                                <span className='error'>{errors.tensao.message}</span>
                            )}
                        </Col>

                        {/* Coluna de amperagem */}
                        <Col md={3} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId="AmperagemInput"
                                label="Amperagem(A)"
                            >
                                <Form.Control 
                                    type='text'
                                    placeholder=''
                                    {...register("amperagem")}
                                />
                            </FloatingLabel>
                            {errors.amperagem && (
                                <span className='error'>{errors.amperagem.message}</span>
                            )}
                        </Col>

                        {/* Coluna de cor */}
                        <Col md={2} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId="CorInput"
                                label="Cor"
                            >
                                <Form.Control 
                                    type='text'
                                    placeholder=''
                                    {...register("cor", {
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\s]+$/,
                                            message: "Use apenas letras"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "A cor não pode ter mais de 20 caracteres",
                                        },
                                    })}
                                />
                            </FloatingLabel>
                            {errors.cor && (
                                <span className='error'>{errors.cor.message}</span>
                            )}
                        </Col>
                    </Row>
                </Container>

                {/* Contextualize-nos */}
                <Container fluid className={stylesCad.parteFormulario}  style={{paddingBottom: '1.7rem'}}>
                    {/* Título do container */}
                    <Row style={{paddingBottom: '1%'}}>
                        <Col md={12} xs={12}>
                            <h3 className={stylesCad.titleh3}>Contextualize-nos</h3>
                        </Col>
                    </Row>

                    <Row>
                        {/* Coluna de descriçao do problema */}
                        <Col md={6} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId='DescProblemInput'
                                label='Descrição do problema'
                            >
                                <Form.Control 
                                    as='textarea'
                                    style={{height: "100px", resize: "none"}}
                                    {...register("descProblema", {
                                        required: "A descrição do problema é obrigatório",
                                        minLength: {
                                            value: 15,
                                            message: "A descrição deve conter pelo menos 15 caracteres"
                                        },
                                        maxLength: {
                                            value: 500,
                                            message: "A descrição não pode ter mais de 500 caracteres",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9À-ÿ\s.,!?@&#()/%-:]*$/,
                                            message: "Use apenas letras, números e símbolos."
                                        },
                                        validate: (value) => {
                                            if (/https?:\/\//i.test(value)) {
                                            return "Não inclua links na descrição.";
                                            }
                                            return true;
                                        }
                                    })}
                                />
                            </FloatingLabel>
                            {errors.descProblema && (
                                <span className='error'>{errors.descProblema.message}</span>
                            )}
                        </Col>
                            
                        {/* Coluna de observações */}
                        <Col md={6} xs={12} className={stylesCad.campo}>
                            <FloatingLabel
                                controlId='ObservacoesInput'
                                label='Observações'
                            >
                                <Form.Control 
                                    as='textarea'
                                    style={{height: "100px", resize: "none"}}
                                    {...register("observacoes", {
                                        maxLength: {
                                            value: 200,
                                            message: "As observações não pode ter mais de 200 caracteres",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9À-ÿ\s.,!?@&#()/%-:]*$/,
                                            message: "Use apenas letras, números e símbolos."
                                        },
                                        validate: (value) => {
                                            if (/https?:\/\//i.test(value)) {
                                            return "Não inclua links na observação.";
                                            }
                                            return true;
                                        }
                                    })}
                                />
                            </FloatingLabel>
                            {errors.observacoes && (
                                <span className='error'>{errors.observacoes.message}</span>
                            )}
                        </Col>
                    </Row>

                    {/* Botão para prosseguir ou enviar demanda*/}
                    <Row>
                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Button
                                as='input'
                                value='Avançar'
                                type='submit'
                                className={stylesCad.botaoSubmit}
                            />
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>

        {/* Modal para escolher a assistência e fazer o envio da demanda. */}
        <Modal 
            show={mostrarModal} 
            onHide={() => setMostrarModal(false)} 
            centered
            contentClassName={stylesCad.modalContent} 
            dialogClassName={stylesCad.modalInfo}
        >
            {/* Título */}
            <Modal.Header closeButton style={{padding: "0", paddingBottom: "5px", border: "0"}}>
            </Modal.Header> 
            
            {/* Corpo com a seleção de assistência técnica. */}
            <Modal.Body style={{padding: "0", border: "0"}}>
                <Modal.Title className={stylesCad.tituloModal}>Direcionar demanda</Modal.Title>
                <Container>
                    <span className={stylesCad.textSpan}>
                        Se tiver uma assistência técnica de preferência, escolha uma. Caso contrário, deixe como público.
                    </span>
                </Container>
                
                <Row style={{paddingTop: '20px', margin: '0px'}}>
                    <FloatingLabel
                        controlId='AssistenciaInput'
                        label='Enviar'
                        style={{padding: '0px'}}
                    >
                        <Form.Select
                            value={atSelecionada === "Público" ? "Público" : atSelecionada?.id}
                        >
                            <option value="Público">Enviar como público</option>
                            {assistencias.map((assistencia) => (
                                <option 
                                    key={assistencia.id} 
                                    value={assistencia.id}
                                    onClick={() => setAtSelecionada(assistencia)}
                                >
                                    {assistencia.nomeFantasia}
                                </option> 
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Row>   
            </Modal.Body>

            <Modal.Footer className={stylesCad.footerModal}>
                <Button
                    as='input'
                    type='submit'
                    value="Enviar"
                    onClick={() => enviarDemandaCompleta(atSelecionada.id || null)}
                    className={stylesCad.botaoModal}
                />
            </Modal.Footer>
        </Modal>
    </div> 
  )
}

export default categoriaDispositivo