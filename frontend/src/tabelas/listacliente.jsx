import { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClienteServico from "../serviços/clientes"; 

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [searchByNome, setSearchByNome] = useState("");
    const [filteredClientes, setFilteredClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            const servico = new ClienteServico();
            try {
                const response = await servico.buscarClientes();
                if (response && response.data) {
                    setClientes(response.data);
                    setFilteredClientes(response.data);
                } else {
                    console.error("Estrutura inesperada na resposta de clientes:", response);
                }
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };
        fetchClientes();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Deseja excluir este cliente?");
        if (confirmDelete) {
            const servico = new ClienteServico();
            try {
                await servico.deletarCliente(id);
                setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
                setFilteredClientes((prev) => prev.filter((cliente) => cliente.id !== id));
            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
            }
        }
    };

    const handleEditar = (id) => {
        localStorage.setItem("clienteId", id);
        navigate("/cadastrar-cliente");
    };

    const handleSearch = () => {
        if (searchByNome.trim() === "") {
            setFilteredClientes(clientes);
        } else {
            const results = clientes.filter((cliente) =>
                cliente.nome.toLowerCase().includes(searchByNome.toLowerCase())
            );
            setFilteredClientes(results);
        }
    };

    return (
        <>
            <h2>Lista de Clientes</h2>

            <Form.Group className="mb-3">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar por nome"
                        value={searchByNome}
                        onChange={(e) => setSearchByNome(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearch}>
                        Pesquisar
                    </Button>
                </InputGroup>
            </Form.Group>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.length > 0 ? (
                        filteredClientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cpf}</td>
                                <td>
                                    <Button variant="primary" className="me-1" onClick={() => handleEditar(cliente.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(cliente.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Não há clientes cadastrados ou nenhum resultado para sua pesquisa.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ListaClientes;
