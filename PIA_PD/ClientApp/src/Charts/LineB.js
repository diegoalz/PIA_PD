import React, {Component} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import bitacoraControl from '../logic/Bitacora';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Bitacora',
        },
    },
};

export class LineB extends Component{
    constructor(props){
        super(props);
        this.state = {
            Lista : [],
            ListaCompra : [],
            data : undefined
        }
        this.cargarDatos = ()=>{
            bitacoraControl.listaBitacoras().then(response=>{
                // console.log(response);
                this.setState({Lista:response.data});
                const proptotipo = [...response.data];
                let listaCompra = proptotipo.filter(item=>{
                    return item.idTipoMovimiento == 1;
                }).map(item=>{
                    return item.monto;
                });
                let listaVenta = proptotipo.filter(item=>{
                    return item.idTipoMovimiento == 2;
                }).map(item=>{
                    return item.monto;
                });
                // console.log(listaCompra);
                // console.log(listaVenta);
                let preLabels = proptotipo.map(item=>{
                    return new Date(item.fecRegistro).toLocaleDateString();
                })
                preLabels = new Set(preLabels);
                const labels = [...preLabels];
                // console.log(labels);
                let datos = {
                    labels,
                    datasets: [
                        {
                        label: 'Compra',
                        data: listaCompra,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                        label: 'Venta',
                        data: listaVenta,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                };
                this.setState({data:datos});
            }).catch(error=>{
                console.log(error);
            })
        }
    }
    componentDidMount() {
        this.cargarDatos();
        console.log(this.state.data);
    }
    componentDidUpdate(){
        console.log(this.state.data);
    }
    render(){
        return(
            <div>
                {(this.state.data != undefined)?<Line options={options} data={this.state.data}/>:<p>Cargando...</p>}
            </div>
        )
    }
}

// export function LineB(props) {
//     return
// }