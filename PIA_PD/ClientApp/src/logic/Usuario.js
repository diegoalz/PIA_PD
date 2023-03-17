import axios from 'axios';

const ENDPOINT_PATH = 'api/usuario'
export default{
    login(objeto){
        return axios.post(ENDPOINT_PATH+'/LoginId', {
        Usuario:objeto.Usuario,
        Contra:objeto.Contra
    });
        // return fetch(ENDPOINT_PATH+'/LoginId', {
        //     method:"POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept":"application/json"
        //     },
        //     body: JSON.stringify({
        //         Usuario:user,
        //         Contra: password
        //     })
        // })
    },
    listaUsuarios(){
        return axios.get(ENDPOINT_PATH+'/Read');
    },
    registrarUsuario(objeto){
        return axios.post(ENDPOINT_PATH+'/Create', {
            Nombre : objeto.nombre,
            APaterno : objeto.aPaterno,
            AMaterno : objeto.aMaterno,
            Contra : objeto.contra,
            Usuario : objeto.usuario
        });
    },
    editarUsuario(objeto){
        return axios.put(ENDPOINT_PATH+'/Update',{
            IdUsuario : objeto.idUsuario,
            Nombre : objeto.nombre,
            APaterno : objeto.aPaterno,
            AMaterno : objeto.aMaterno,
            Contra : objeto.contra,
            Usuario : objeto.usuario
        });
    },
    bajaUsuario(objeto){
        return axios.put(ENDPOINT_PATH+'/Delete', {
            IdUsuario : objeto.idUsuario
        });
    }
}