import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink,Redirect } from 'react-router-dom';
//import * as Jquery from "jquery";

interface MyComponentProps { }
interface MyComponentState {
    NombreUsuario: string,
    Contrasenia: string,
    redirect : string
}

export class Login extends React.Component<RouteComponentProps<{}>, MyComponentState>{

    constructor(props: any) {
        super(props);
        this.state = {
            NombreUsuario: "",
            Contrasenia: "",
            redirect: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.actualizarRedirect = this.actualizarRedirect.bind(this);
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
                        alert("Datos Incorrectos");
                    } else {
                        alert("Bienvenido");
                        this.setState({ redirect: "/Equipos" })
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

    actualizarRedirect(redireccion: string) {
        this.setState({
            redirect: "/Registro" 
        })

    }


    
    public render() {

        //Para el ruteo
        const { redirect } = this.state;
        let direcion = this.state.redirect;
        if (redirect) {
            return <Redirect to={direcion}/>;
        }

        return (
            <div className="login center-block">
                <div className="marginForm">
                <form onSubmit={(e) => this.handleSubmit(e)} className="marginL">

                    <div className="form-group text-center">
                        <label className="center-block">Usuario</label>
                        <input type="text" name="NombreUsuario" className="form-control tamanioInput center-block"
                            placeholder="Ingrese su usuario" value={this.state.NombreUsuario}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <div className="form-group text-center">
                        <label>Contrase&ntilde;a</label>
                        <input type="password" name="Contrasenia" className="form-control tamanioInput center-block"
                            placeholder="Ingrese su contrase&ntilde;a" value={this.state.Contrasenia}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                        <div className="row">
                            <div className="col-sm-2">
                                <input type="submit" className="btn btn-primary botonIngresar" value="Ingresar" />
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-success botonRegistrarse"
                                    onClick={this.actualizarRedirect.bind("/Registro")} >Registrarse</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
