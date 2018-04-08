import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
//import * as Jquery from "jquery";

interface MyComponentProps {}
interface MyComponentState {
    NombreUsuario: string,
    ContraseniaUno: string,
    ContraseniaDos: string,
    redirect: boolean
}

export class Registro extends React.Component<RouteComponentProps<{}>, MyComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            NombreUsuario: "",
            ContraseniaUno: "",
            ContraseniaDos: "",
            redirect : false
        }

        this.handleChange = this.handleChange.bind(this);

    }

    validarCampos() {
        if (this.state.NombreUsuario == '') {
            alert("Debe ingresar su usuario");
            return false;
        } else if (this.state.ContraseniaUno == '' || this.state.ContraseniaDos === '') {
            alert("Debe ingresar su contraseña");
            return false;
        } else {
            if (this.state.ContraseniaUno === this.state.ContraseniaDos) {
                alert("Registro exitoso");
                return true;
            } else {
                alert("Las contraseñas no coinciden");
                return false;
            }
        }
    }

    handleChange(e: any) {
        const { value, name } = e.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit(e: any) {
        e.preventDefault();
        let validarCampo = this.validarCampos();
        if (validarCampo) {
            let info = {
                usuNombreUsuario: this.state.NombreUsuario,
                usuContrasenia: this.state.ContraseniaUno
            }
            fetch("api/Usuarios/registrarUsuario", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ redirect : true})
                });
        };
    }    

    render() {
        const { redirect } = this.state
        if (redirect) {
            return <Redirect to = '/'/>
        }

        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input type="text" name="NombreUsuario" className="form-control"
                            placeholder="Ingrese su usuario" value={this.state.NombreUsuario}
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="ContraseniaUno" className="form-control"
                            placeholder="Ingrese su contraseña" value={this.state.ContraseniaUno}
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>ConfirmarContraseña</label>
                        <input type="password" name="ContraseniaDos" className="form-control"
                            placeholder="Confirme su contraseña" value={this.state.ContraseniaDos}
                            onChange={(e) => this.handleChange(e)} />
                    </div>

                    <input type="submit" className="btn btn-primary" value ="Registrarse"/>
                </form>
            </div>
        );
    }
}



