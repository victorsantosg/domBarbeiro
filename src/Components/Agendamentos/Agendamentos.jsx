import './Agendamentos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Carregando from './Carregando';
import { json } from 'react-router-dom';


function Agendamentos() {

    var [id, setId] = useState('');
    const [data, setData] = useState([{}]);
    var [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    function settarData(event) {
        setDate(event.target.value);
    }

    function settarID(event) {
        setId(event.target.value);
    }

    function limpar() {
        setId("")
        setDate("")
        setData([])
    }
    //https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?all_docs
    async function pesquisar() {
        var url = "https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?"
        
        if (id != '') {
            url = url + "_id=" + id
        } else if (date != '') {
            url = url + "user_date=" + date
        } else if (id == '' && date == '') {
            url = url + "all_docs"
        }

        setLoading(true);

       await fetch(url)
        .then((res) => res.json())
        .then((dadosApi) => {
            if (dadosApi.filtro_data) {
                setData(Object.values(dadosApi.filtro_data))
            } 
            else if (dadosApi.all_docs) {
                setData(Object.values(dadosApi.all_docs))
            }
            else {
                setData(Object.values(dadosApi))
            }
            })
            .catch((erro) => console.log(erro));
            console.log("Pesquisa realizada com sucesso " + date)
            console.log("esse é o usado na tabela" + Object.values(data));
        
            setLoading(false);
        
        }
        
        return (
            <>
            <Form className='filtroAg'>
                <Row>
                    <Col>
                        <Form.Label>CÓDIGO DO AGENDAMENTO</Form.Label>
                        <Form.Control placeholder="Código do agendamento" value={id} onChange={settarID} />
                    </Col>
                    <Col>
                        <Form.Label>DATA DE AGENDAMENTO</Form.Label>
                        <Form.Control value={date} type="date" onChange={settarData} />
                    </Col>
                    <Col>
                        <Button className='btnAg' variant="primary" onClick={pesquisar}>Pesquisar</Button>
                        {loading && <Carregando />}
                        <Button className='btnAg' variant="secondary" onClick={limpar}>Limpar</Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data do agendamento</th>
                        <th>Categoria</th>
                        <th>Serviço</th>
                        <th>Hora</th>
                        <th>Origem</th>
                        <th>Canal de prospecção</th>
                        <th>Confirmado</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item?._id}</td>
                            <td>{item?.user_name}</td>
                            <td>{item?.user_date}</td>
                            <td>{item?.user_selecao_categoria}</td>
                            <td>{item?.user_selecao_servico2}</td>
                            <td>{item?.user_time}</td>
                            <td>{item?.origem}</td>
                            <td>{item?.channel}</td>
                            <td>{item?.user_confirma_agendamento}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>

)
}

export default Agendamentos;




/* const axios = require('axios');

// configura a URL da API e a chave da API
const apiUrl = 'https://exemplo.com/api';
const apiKey = 'sua_chave_de_api';

// configura as opções da requisição
const options = {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    data: {
        chave1: 'valor1',
        chave2: 'valor2'
    }
};

// faz a requisição HTTP POST para a API
axios.post(apiUrl, options)
.then(response => {
    console.log(response.data);
  })
  .catch(error => {
      console.error(error);
    }); */
    
        //https://8f28faa5-e080-4c10-aefd-ccff50aa3382-bluemix.cloudantnosqldb.appdomain.cloud/agendamento_barber_assist/_all_docs
    
        //https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?_id=1
    
        //https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?user_date=2023-03-03
    
        //https://us-south.functions.appdomain.cloud/api/v1/web/75a6c58b-8400-4fff-aac1-11d1bc743b16/default/crud_prjbarber.json?rows=total_rows