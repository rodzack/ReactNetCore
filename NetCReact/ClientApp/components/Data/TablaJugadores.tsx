import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

interface MyComponentState {
    IlistaJugador: IntJugadores[],
    nombreJugador: string
}
interface MyComponentProps {
    idEquipo : number
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
        this.actualizarListaJugadores();
    }

    actualizarListaJugadores() {
        alert("Entro a listar jugadores");
        fetch('api/Jugadores/listarJugadores', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jugIdEquipo: this.props.idEquipo})
        }).then(response => response.json() as Promise<IntJugadores[]>)
            .then(data => {
                this.setState({ IlistaJugador: data });
            });
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
            }).then(response => response.json())
                .then(data => { });
            this.actualizarListaJugadores();
        }
    }

    public render() {
        let tabla = /*this.state.loading
            ? <p><em>Loading...</em></p> :*/
            TablaJugadores.renderlistaJugadores(this.state.IlistaJugador);
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

                {tabla}
            </div>
        )
    }

    private static renderlistaJugadores(IlistaJugador: IntJugadores[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id Jugador</th>
                    <th>Nombre Jugador</th>
                    <th>IdEquipo</th>
                </tr>
            </thead>
            <tbody>
                {IlistaJugador.map(lJugador =>
                    <tr key={lJugador.jugIdJugador}>
                        <td>{lJugador.jugIdJugador}</td>
                        <td>{lJugador.jugNombreJugador}</td>
                        <td>{lJugador.jugIdEquipo}</td>
                   </tr>
                )}
            </tbody>
        </table>;
    }
}


