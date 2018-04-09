import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { TablaJugadores } from './TablaJugadores';
import { EditarNombreTabla } from './EditarNombreTabla';


interface MyComponentState {
    showReply: boolean,
    recargarEquipos: boolean
    idEquipo: number,
    lJugador: IJugadores[]
}
interface MyComponentProps {
    listaEquipos: lEquipo[],
    actualizarEquipos: () => void
}
interface lEquipo {
    equIdEquipo: string;
    equNombreEquipo: string;
}
interface IJugadores {
    jugIdJugador: string,
    jugNombreJugador: string,
    jugIdEquipo: string,
}

export class TablaEquipos extends React.Component<MyComponentProps, MyComponentState>{

    constructor(props: MyComponentProps) {
        super(props)
        this.state = {
            showReply: false,
            recargarEquipos: false,
            idEquipo: 0,
            lJugador: []
        }
        this.eliminarEquipo = this.eliminarEquipo.bind(this);
        this.actualizarListaJugadores = this.actualizarListaJugadores.bind(this);
    }

    eliminarEquipo(IdEquipo: any) {
        var confirmacion = confirm("Si se elimina el equipo tambien se eliminaran los jugadores que este tenga ¿Desea continuar?");
        if (confirmacion == true) {
            fetch("api/Equipos/eliminarEquipos", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ EquIdEquipo: IdEquipo })
            }).then(response => {
                response.json()
                this.props.actualizarEquipos();
                this.actualizarEstado(0, false);
            })
        } 


    }

    actualizarListaJugadores() {
        fetch('api/Jugadores/listarJugadores', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jugIdEquipo: this.state.idEquipo })
        }).then(response => response.json())
            .then(data => {
                this.setState({ lJugador: data });
            });
    }

    actualizarEstado(PIdEquipo: any, estado: boolean) {
        this.setState({
            showReply: estado,
            idEquipo: PIdEquipo
        }, this.actualizarListaJugadores);
           
    }

    actualizarLEquipos() {
        this.props.actualizarEquipos();
    }

    public render() {
        let props = {
            listaJugdores: this.state.lJugador,
            actualizarJugadores: this.actualizarListaJugadores.bind(this),
            idEquipo: this.state.idEquipo
        }


        return (
            <div className="tablaEquipos center-block marginFormEquipo">
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
                                    <td><input type="submit" value="Administrar jugadores" className="btn btn-success center-block"
                                        onClick={this.actualizarEstado.bind(this, fila.equIdEquipo, true)} /></td>
                                    <td>

                                        <EditarNombreTabla {...{
                                            idEquipo: fila.equIdEquipo,
                                            actualizarEquipos: this.actualizarLEquipos.bind(this)
                                        }} />
                                    
                                    </td>
                                    <td><button type="button" className="btn btn-danger center-block"
                                        onClick={this.eliminarEquipo.bind(this, fila.equIdEquipo)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {this.state.showReply && <TablaJugadores {...props} />}

                </div>
        )       
    }
}
