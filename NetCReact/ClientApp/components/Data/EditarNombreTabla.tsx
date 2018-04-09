import * as React from 'react'
import { RouteComponentProps } from 'react-router';

interface MyComponensState {
    nombreEquipo: string
}
interface MyComponentProps {
    idEquipo: string,
    actualizarEquipos: () => void
}

export class EditarNombreTabla extends React.Component<MyComponentProps,MyComponensState>{

    constructor(props: any) {
        super(props)

        this.state = {
            nombreEquipo : ""
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
        if (this.state.nombreEquipo == '') {
            alert("Debe escribir el nombre del equipo");
        } else {
            fetch("api/Equipos/actualizarEquipo", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    EqunombreEquipo: this.state.nombreEquipo,
                    EquIdEquipo: this.props.idEquipo
                })
            }).then(response => {
                response.json()
                this.props.actualizarEquipos();
            })
        }
    }


    public render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <input type="text" name="nombreEquipo" className="form-control"
                            placeholder="Nombre del equipo" value={this.state.nombreEquipo}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <input type="submit" value="Modificar Nombre" className="btn btn-primary center-block" />
                </form>

            </div>
         )
    }

}

