import axios from 'axios';

const ENDPOINT_PATH = 'api/movimiento'
export default {
    listaMovimientos() {
        return axios.get(ENDPOINT_PATH + '/Read');
    },
    registrarMovimiento(objeto){
        return axios.post(ENDPOINT_PATH+'/Create', {
            IdTipoMovimiento : Number(objeto.idTipoMovimiento),
            CantDolares : Number(objeto.cantDolares),
            PUnitario : Number(objeto.pUnitario),
            CostoTotal : Number(objeto.costoTotal),
            Pago : Number(objeto.pago),
            Cambio : Number(objeto.cambio),
            IdUsuario : Number(localStorage.IdUsuario)
        });
    }
}