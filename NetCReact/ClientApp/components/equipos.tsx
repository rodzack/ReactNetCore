import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { TablaEquipos } from './Data/TablaEquipos';

interface MyComponentProps {}
interface MyComponentState {
    lEquipo: IEquipos[],
    nombreEquipo: string,
    redirect: boolean,
}
interface IEquipos {
    equIdEquipo: string,
    equNombreEquipo: string
}


export class Equipos extends React.Component<RouteComponentProps<{}>, MyComponentState>{

    constructor(props: any) {
        super(props)

        this.state = {
            lEquipo: [],
            nombreEquipo: "",
            redirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.actualizarEquipos();
    }

    actualizarEquipos() {
        fetch("api/Equipos/listarEquipos", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({ lEquipo: data })
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
        if (this.state.nombreEquipo == '') {
            alert("Debe escribir el nombre del equipo");
        } else {
            let info = { EqunombreEquipo: this.state.nombreEquipo };
            fetch("api/Equipos/agregarEquipo", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            }).then(response => {
                response.json()
                    this.actualizarEquipos();
                })
        }
    }

    public render() {
        //console.log(this.state.lEquipo);
        let props = {
            listaEquipos: this.state.lEquipo,
            actualizarEquipos: this.actualizarEquipos.bind(this)
        }

        return (<div className="equipos center-block marginFormEquipo">
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group text-center row marginFormEquiposP">
                    <label className="col-sm-4 col-form-label marginlabel">Ingrese el nombre del equipo</label>
                    <div className="col-sm-4 pr10 marginInputNombreEquipo">
                    <input type="text" name="nombreEquipo" className="form-control tamanioInput"
                        placeholder="Nombre del equipo" value={this.state.nombreEquipo}
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="col-sm-4 ">
                        <input type="submit" className="btn btn-primary marginright" value="Crear equipo" />
                    </div>
                </div>

            </form>

            <TablaEquipos {...props}/>
        </div>)
    }
}

//<form onSubmit={(e) => this.handleSubmit(e)}>
//        <label>Ingrese el nombre del equipo</label>
//        <input type="text" name="nombreEquipo" className="form-control"
//            placeholder="Nombre del equipo" value={this.state.nombreEquipo}
//            onChange={(e) => this.handleChange(e)} />
//</form>
