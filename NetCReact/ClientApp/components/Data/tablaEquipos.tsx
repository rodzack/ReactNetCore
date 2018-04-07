import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { TablaJugadores } from './TablaJugadores';
import { EditarNombre } from './EditarNombre';


interface MyComponentState {
    //SlistaEquipos: lEquipo[]
    showReply: boolean,
    recargarEquipos: boolean
    idEquipo: number
}

interface MyComponentProps {
    listaEquipos: lEquipo[],
    actualizarEquipos: () => void
}
interface lEquipo {
    equIdEquipo: string;
    equNombreEquipo: string;
}

export class TablaEquipos extends React.Component<MyComponentProps, MyComponentState>{

    constructor(props: MyComponentProps) {
        super(props)
        this.state = {
            showReply: false,
            recargarEquipos: false,
            idEquipo: 0
        }
        this.eliminarEquipo = this.eliminarEquipo.bind(this);
    }

    eliminarEquipo(IdEquipo: any) {
        //console.log(IdEquipo);
        fetch("api/Equipos/eliminarEquipos", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({EquIdEquipo: IdEquipo})
        }).then(response => {
            response.json()
            this.props.actualizarEquipos();
        })
    }

    actualizarEstado(PIdEquipo: any) {
        alert(PIdEquipo+" Entro a actualizar state de jugadores " + this.state.idEquipo);

        this.setState({
            showReply: true,
            idEquipo: PIdEquipo
        })
            
        alert(PIdEquipo+ "Entro a 2 actualizar state de jugadores " + this.state.idEquipo);
    }

    actualizarLEquipos() {
        this.props.actualizarEquipos();
    }

     public render() {
        return (
                <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre equipo</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listaEquipos.map(fila => (
                                <tr key={fila.equIdEquipo}>
                                    <td>{fila.equNombreEquipo}</td>
                                    <td><input type="submit" value="Agregar Jugadores" className="btn btn-success"
                                        onClick={this.actualizarEstado.bind(this, fila.equIdEquipo)} /></td>
                                    <td>

                                        <EditarNombre {...{
                                            idEquipo: fila.equIdEquipo,
                                            actualizarEquipos: this.actualizarLEquipos.bind(this)
                                        }} />
                                    
                                    </td>
                                    <td><button type="button" className="btn btn-danger"
                                        onClick={this.eliminarEquipo.bind(this, fila.equIdEquipo)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {this.state.showReply && <TablaJugadores idEquipo={this.state.idEquipo} />}

                </div>
        )
              /*
                {this.state.showReply && <TablaJugadores idEquipo={this.state.idEquipo}/>}

               */

        
    }
}
