import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink,Redirect } from 'react-router-dom';
//import * as Jquery from "jquery";

interface MyComponentProps { }
interface MyComponentState {
    NombreUsuario: string,
    Contrasenia: string,
    redirect : boolean
}

export class Login extends React.Component<RouteComponentProps<{}>, MyComponentState>{

    constructor(props: any) {
        super(props);
        this.state = {
            NombreUsuario: "",
            Contrasenia: "",
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public validarCampos(){
        if (this.state.NombreUsuario == '') {
            alert("Debe ingresar su usuario");
            return false;
        } else if (this.state.Contrasenia == '') {
            alert("Debe ingresar su contraseña");
            return false;
        } else {
            return true;
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        let  vCampos = this.validarCampos();
        if (vCampos) {
            let info = {
                usuNombreUsuario: this.state.NombreUsuario,
                usuContrasenia: this.state.Contrasenia
            };
            fetch("api/Usuarios/ValidarUsuario",{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.idUsuario == 0) {
                        alert("Usuario Incorrecto");
                    } else {
                        alert("Bienvenido");
                        this.setState({ redirect: true })
                    }

                });
        }
    }

    handleChange(e: any) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })

    }
    
    public render() {

        //Para el ruteo
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/Equipos'/>;
        }

        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className="form-group">
                        <label>Usuario</label>
                        <input type="text" name="NombreUsuario" className="form-control"
                            placeholder="Ingrese su usuario" value={this.state.NombreUsuario}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <label>Contrase&ntilde;a</label>
                        <input type="password" name="Contrasenia" className="form-control"
                            placeholder="Ingrese su contrase&ntilde;a" value={this.state.Contrasenia}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Ingresar" />
                </form>
            </div>
        )
    }
}
