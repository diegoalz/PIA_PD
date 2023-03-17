import axios from 'axios';

const ENDPOINT_PATH = 'api/bitacora'
export default {
    listaBitacoras() {
        return axios.get(ENDPOINT_PATH + '/Read');
    },
    agregarBitacora(objeto){
        return axios.post(ENDPOINT_PATH+"/Create", {
            IdTipoMovimiento : objeto.idTipoMovimiento,
            Monto : objeto.monto,
            IdUsuario : localStorage.IdUsuario
        });
    },
    modificarBitacora(objeto){
        return axios.put(ENDPOINT_PATH+"/Update", {
            IdBitacora : objeto.idBitacora,
            Monto : objeto.monto,
        });
    }
}