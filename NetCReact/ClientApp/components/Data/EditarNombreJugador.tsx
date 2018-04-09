import * as React from 'react'
import { RouteComponentProps } from 'react-router';

interface MyComponensState {
    nombreJugador: string
}
interface MyComponentProps {
    idJugador: string,
    actualizarJugadores: () => void
}

export class EditarNombreJugador extends React.Component<MyComponentProps,MyComponensState>{

    constructor(props: any) {
        super(props)

        this.state = {
            nombreJugador : ""
        }
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
            fetch("api/Jugadores/actualizarJugadores", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jugNombreJugador: this.state.nombreJugador,
                    jugIdJugador: this.props.idJugador
                })
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
                        <input type="text" name="nombreJugador" className="form-control"
                            placeholder="Nombre del jugador" value={this.state.nombreJugador}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <input type="submit" value="Modificar Nombre" className="btn btn-primary center-block" />
                </form>

            </div>
         )
    }

}

