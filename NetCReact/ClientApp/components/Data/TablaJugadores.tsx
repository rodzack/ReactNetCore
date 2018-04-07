﻿import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

interface MyComponentState {
    IlistaJugador: IntJugadores[],
    nombreJugador: string
}
interface MyComponentProps {
    idEquipo: number,
    listaJugdores: IntJugadores[],
    actualizarJugadores: () => void
}

interface IntJugadores {
    jugIdJugador: string,
    jugNombreJugador: string,
    jugIdEquipo: string,
}

export class TablaJugadores extends React.Component<MyComponentProps, MyComponentState>{

    constructor(props: MyComponentProps) {
        super(props)

        this.state = {
            IlistaJugador: [],
            nombreJugador: ""
        }
        this.props.actualizarJugadores();
    }

    handleChange(e: any) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e: any) {
        e.preventDefault();
        if (this.state.nombreJugador == '') {
            alert("Debe escribir el nombre del jugador");
        } else {
            let info = {
                jugNombreJugador: this.state.nombreJugador,
                jugIdEquipo: this.props.idEquipo
            };
            fetch("api/Jugadores/agregarJugador", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            }).then(response => {
                response.json()
                this.props.actualizarJugadores();
            })
            
        }
    }

    public render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label>Ingrese el nombre del jugador</label>
                        <input type="text" name="nombreJugador" className="form-control"
                            placeholder="Nombre del jugador" value={this.state.nombreJugador}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Crear equipo" />
                </form>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listaJugdores.map(fila => (
                                <tr key={fila.jugIdEquipo}>
                                    <td>{fila.jugNombreJugador}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}


