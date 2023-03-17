import TablaBitacora from '../components/TablaBitacora';
import TablaMovimiento from '../components/TablaMovimientos';
import TablaUsuarios from '../components/TablaUsuarios';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import {Routes, Route} from 'react-router-dom';
import NavMenu from '../partials/NavMenu';

export default function Panel(){
    return(
        <div>
            <NavMenu />
            <Routes>
                <Route path='landing' element={<Landing />} />
                <Route path='usuarios' element={<TablaUsuarios />} />
                <Route path='bitacora' element={<TablaBitacora />} />
                <Route path='movimiento' element={<TablaMovimiento />} />
                <Route path='dashboard/*' element={<Dashboard />} />
            </Routes>
        </div>
    );
}