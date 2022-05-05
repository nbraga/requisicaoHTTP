import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import "./app.css";
import { useFetch } from "./hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const url = "http://localhost:3000/products";

  //Custom Hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  //Adicionado Produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    //Refatorando POST
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  console.log(products);
  return (
    <div>
      <div className="container">
        <h1>Lista de Produtos</h1>

        {loading && <p>Carregando Dados...</p>}
        {error && <p>{error}</p>}
        {!loading && (
          <ul>
            {items &&
              items.map((item) => (
                <li key={item.id}>
                  {item.name} - R$: {item.price} -{" "}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="button_delete"
                  >
                    <DeleteIcon small />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="container">
        <h1>Adicionando Produtos</h1>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Preço"
              variant="standard"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {loading && (
              <Button disabled type="submit" fullWidth variant="contained">
                Aguarde
              </Button>
            )}
            {!loading && (
              <Button type="submit" fullWidth variant="contained">
                Criar
              </Button>
            )}
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default App;

/*
 //Adicionado Produtos
 const handleSubmit = async (e) => {
  e.preventDefault();

  const product = {
    name,
    price,
  };

   const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  //Carregamento dinâmico

  //Transformar o RES em objeto javaScript
  const addedProduct = await res.json();
  setProducts((prevProducts) => [...prevProducts, addedProduct]); 
  //Refatorando POST
  httpConfig(product, "POST");
  setName("");
  setPrice("");
};

*/

/*   //Resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []); */
