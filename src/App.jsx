import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { Inicio } from './components/ui/Inicio';
import { GeneroView } from './components/generos/GeneroView';
import { DirectorView } from './components/directores/DirectorView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';
import { MediaView } from './components/medias/MediaView';
import { MediaUpdate } from './components/medias/MediaUpdate';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/generos" element={<GeneroView />} />
          <Route path="/directores" element={<DirectorView />} />
          <Route path="/productoras" element={<ProductoraView />} />
          <Route path="/tipos" element={<TipoView />} />
          <Route path="/medias" element={<MediaView />} />
          <Route path="/medias/editar/:mediaId" element={<MediaUpdate />} />
          {/* cualquier otra ruta lo devuelve al inicio */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
