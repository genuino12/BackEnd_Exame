import { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PedidoServico from "../serviços/pedidos";

function ListaPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [searchById, setSearchById] = useState("");
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const navigate = useNavigate();

  
    useEffect(() => {
        const fetchPedidos = async () => {
            const servico = new PedidoServico();
            try {
                const response = await servico.buscarPedidos();
                if (response && response.data) {
                    setPedidos(response.data);
                    setFilteredPedidos(response.data);
                } else {
                    console.error("Estrutura inesperada na resposta de pedidos:", response);
                }
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            }
        };
        fetchPedidos();
    }, []);

    // Função para excluir um pedido
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Deseja excluir este pedido?");
        if (confirmDelete) {
            const servico = new PedidoServico();
            try {
                await servico.deletarPedido(id);
                setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
                setFilteredPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
            } catch (error) {
                console.error("Erro ao excluir pedido:", error);
            }
        }
    };

    // Função para editar um pedido
    const handleEditar = (id) => {
        localStorage.setItem("pedidoId", id);
        navigate("/editar-pedido"); 
    };

    // Função para buscar pedidos por ID
    const handleSearch = () => {
        if (searchById.trim() === "") {
            setFilteredPedidos(pedidos);
        } else {
            const results = pedidos.filter((pedido) =>
                pedido.id.toString().includes(searchById)
            );
            setFilteredPedidos(results);
        }
    };

    return (
        <>
            <h2>Lista de Pedidos</h2>

            <Form.Group className="mb-3">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar por ID do pedido"
                        value={searchById}
                        onChange={(e) => setSearchById(e.target.value)}
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
                        <th>ID do Cliente</th>
                        <th>Produtos</th>
                        <th>Data do Pedido</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPedidos.length > 0 ? (
                        filteredPedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.cliente_id}</td>
                                <td>{pedido.produtos.join(", ")}</td> 
                                <td>{new Date(pedido.data_pedido).toLocaleDateString()}</td> 
                                <td>
                                    <Button variant="primary" className="me-1" onClick={() => handleEditar(pedido.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(pedido.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Não há pedidos cadastrados ou nenhum resultado para sua pesquisa.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ListaPedidos;
