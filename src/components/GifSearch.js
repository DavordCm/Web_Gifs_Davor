import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Button,
  ButtonGroup,
} from "@mui/material";

function GifSearch() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeSection, setActiveSection] = useState("Comunidad");

  const API_KEY = "NZcfw6dvtCf8bjqi5BVtVfKVITPCbTy3";

  const categories = [
    "Fantasía",
    "Cartoons & Comics",
    "Gaming",
    "Terror",
    "Programación",
    "Anime",
    "Deportes",
    "Música",
  ];

  useEffect(() => {
    if (activeSection === "Novedades") {
      fetchTrendingGifs();
    } else if (activeSection === "Comunidad") {
      fetchSectionGifs("Cartoons & Comics");
    } else if (activeSection === "Recursos") {
      fetchSectionGifs("Recursos");
    }
  }, [activeSection]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchGifsByCategories();
    }
  }, [selectedCategories]);

  const fetchTrendingGifs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data);
      setError("");
    } catch (err) {
      setError("Error al cargar los GIFs populares.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionGifs = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data);
      setError("");
    } catch (err) {
      setError(`Error al cargar los GIFs de ${query}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGifsByCategories = async () => {
    try {
      setLoading(true);
      const query = selectedCategories.join(",");
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data);
      setError("");
    } catch (err) {
      setError("Error al cargar los GIFs por categorías seleccionadas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data);
      setError("");
    } catch (err) {
      setError("Error al buscar los GIFs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#121212", color: "#fff" }}>
      {/* Contenido */}
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Barra de búsqueda */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar GIFs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ backgroundColor: "#1976d2", marginRight: "10px" }}
            >
              Buscar
            </Button>
            {/* Botones Comunidad, Recursos, Novedades */}
            <ButtonGroup variant="contained" sx={{ backgroundColor: "#1976d2" }}>
              <Button
                onClick={() => setActiveSection("Comunidad")}
                sx={{
                  backgroundColor: activeSection === "Comunidad" ? "#1565c0" : "",
                }}
              >
                Comunidad
              </Button>
              <Button
                onClick={() => setActiveSection("Recursos")}
                sx={{
                  backgroundColor: activeSection === "Recursos" ? "#1565c0" : "",
                }}
              >
                Recursos
              </Button>
              <Button
                onClick={() => setActiveSection("Novedades")}
                sx={{
                  backgroundColor: activeSection === "Novedades" ? "#1565c0" : "",
                }}
              >
                Novedades
              </Button>
            </ButtonGroup>
          </Box>

          {/* Botones Registrar y Login */}
          <Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginRight: "10px" }}
            >
              Registrar
            </Button>
            <Button variant="contained" color="secondary">
              Login
            </Button>
          </Box>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ display: "flex" }}>
          {/* Barra lateral */}
          <Box sx={{ width: "250px", marginRight: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Categorías
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItem key={category}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        sx={{
                          color: "#fff",
                          "&.Mui-checked": { color: "#1976d2" },
                        }}
                      />
                    }
                    label={category}
                    sx={{ color: "#ccc" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Contenido de GIFs */}
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#000",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "#fff" }} />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Grid container spacing={2}>
                {gifs.map((gif) => (
                  <Grid item xs={6} sm={4} md={3} key={gif.id}>
                    <Card
                      sx={{
                        backgroundColor: "#121212",
                        boxShadow: "none",
                        borderRadius: "10px",
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={gif.images.fixed_height.url}
                          alt={gif.title}
                          sx={{ borderRadius: "10px" }}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GifSearch;
