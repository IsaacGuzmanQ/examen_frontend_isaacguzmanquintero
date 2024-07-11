import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const CreateUsuario = () => {
    const endpoint = 'http://127.0.0.1:8000/api/Usuario';

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [FechaNacimiento, setFechaNacimiento] = useState("");
    const navigate = useNavigate("");

    const store = async (e) => {
        e.preventDefault();

        if( [Name, Email, Password, Direccion, Telefono, FechaNacimiento].includes("") ){
            Swal.fire({
                icon: "error",
                text: "Dejó algún campo vacío",
                title: "Todos los campos son obligatorios"
            });
            return;
        }

        await fetch(endpoint,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: Name,
                    Email: Email,
                    Password: Password,
                    Direccion: Direccion,
                    Telefono: Telefono,
                    FechaNacimiento: FechaNacimiento,
                })
            }).then(function(){

                Swal.fire({
                    icon: "success",
                    text: "Usuario registrado con exito",
                    title: "Exito"
                }).then(function(){
                    navigate("/");
                });
                
            });
        
    }

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Lista de Usuarios</h5>

                <form onSubmit={store} className='text-start'>

                    <div className="row mb-3">

                        <div className='col-6'>
                            <label htmlFor="Name" className="form-label">Nombre completo: </label>
                            <input type="text" className="form-control" name='Name' id="Name" placeholder="Nombre Completo" value={Name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='col-6'>
                            <label htmlFor="Email" className="form-label">Correo electrónico: </label>
                            <input type="email" className="form-control" name='Email' id="Email" placeholder="Correo electrónico" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className='col-6'>
                            <label htmlFor="Password" className="form-label">Contraseña: </label>
                            <input type="password" className="form-control" name='Password' id="Password" placeholder="Contraseña" value={Password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='col-6'>
                            <label htmlFor="Direccion" className="form-label">Dirección: </label>
                            <input type="text" className="form-control" name='Direccion' id="Direccion" placeholder="Dirección" value={Direccion} onChange={(e) => setDireccion(e.target.value)} />
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className='col-6'>
                        <label htmlFor="Telefono" className="form-label">Teléfono: </label>
                        <input type="text" className="form-control" name='Telefono' id="Telefono" placeholder="Teléfono" value={Telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>

                        <div className='col-6'>
                            <label htmlFor="FechaNacimiento" className="form-label">Fecha de Nacimiento: </label>
                        <input type="date" className="form-control " name='FechaNacimiento' id="FechaNacimiento" placeholder="Fecha de Nacimiento" value={FechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                        </div>

                    </div>


                    <div className='d-flex justify-content-around'>
                        <Link to="/" className="btn btn-label-warning"> <i className="fa-solid fa-arrow-left me-2"></i> Regresar</Link>
                        <button type="submit" className="btn btn-label-primary"> <i className="fa-solid fa-floppy-disk me-2"></i> Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUsuario;