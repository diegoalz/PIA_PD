import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PieCV } from '../Charts/PieCV';
import { LineB } from '../Charts/LineB';
import {Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component{
    static displayName = Dashboard.name;
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render(){
        return(
            <div>
                {/* <div className="container d-flex justify-content-center flex-column">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col">
                        1 of 2
                        </div>
                        <div className="col">
                        2 of 2
                        </div>
                    </div>
                </div> */}
                <Pagination>
                    <PaginationItem>
                        <PaginationLink tag={Link} to='linea-bitacora'>
                        Bitacora
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag={Link} to='pieCompraVenta'>
                        Movimiento
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
                <Routes>
                    <Route path='linea-bitacora' element={<LineB />} />
                    <Route path='PieCompraVenta' element={<PieCV />} />
                </Routes>
            </div>
        );
    }
}