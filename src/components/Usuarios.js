import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";



const ShowUsers = () => {

    const endpoint = 'http://127.0.0.1:8000/api';

    const [users, setUsers] = useState( [] );


    useEffect( () => {
        getAllUsers()
    }, []);

    const getAllUsers = async () => {
        const users = await fetch(endpoint + "/Usuarios");
        const json = await users.json();
        setUsers(json);        
    }

    const [ currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice( firstIndex, lastIndex);
    const npage = Math.ceil( users.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const deleteUser = async (id) => {

        Swal.fire({
            title: "¡Estas por eliminar un registro!",
            icon: "warning",
            text: "Esta acción no se puede deshacer",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
          }).then((result) => {            
            if (result.isConfirmed) {

                fetch(endpoint + "/Usuario/"+id, {
                    method: 'DELETE',
                }).then( function(){
                    getAllUsers();
                    Swal.fire({
                        icon: "success",
                        text: "Registro eliminado correctamente",
                        title: "Exito"
                    });
                });
              
            } else if (result.isDenied) {
              Swal.fire("No se ha realizado cambios", "", "info");
            }
        });
        
    }

    return (

        <div className="card" >
            <div className="card-body">
                <h1 className="card-title">Lista de Usuarios</h1>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/create" className="btn btn-label-primary "> <i className="fa-solid fa-user-plus me-2"></i> Registrar nuevo usuario </Link>
                </div>
                
                <div className="table-responsive">
                    <table className="table mb-5">
                        <thead className="table">
                            <tr>
                                <th>Nombre completo</th>
                                <th>Email</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Fecha de nacimiento</th>
                                <th>Edad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { records.map(  (user,i) => ( 
                                <tr key={i} >
                                    <td> { user.Name } </td>
                                    <td> { user.Email } </td>
                                    <td> { user.Direccion } </td>
                                    <td> { user.Telefono } </td>
                                    <td> { user.FechaNacimiento } </td>
                                    <td> { user.Edad } </td>
                                    <td className="d-flex justify-content-center">
                                        <Link to={`/edit/${ user.ID }`} className="btn rounded-pill me-2 btn-label-warning"> <i className="fa-solid fa-pen me-2"></i> Editar </Link>
                                        <button onClick={ ()=>deleteUser(user.ID)  } type="button" className="btn rounded-pill me-2 btn-label-danger"> <i className="fa-solid fa-trash me-2"></i> Eliminar </button>
                                    </td>
                                    
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation" className="d-flex justify-content-center">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={prePage}>
                                    <i className="fa-solid fa-arrow-left"></i>
                                </a>
                            </li>
                            
                            {
                                numbers.map( (n,i) =>(
                                    <li className={`page-item ${ currentPage === n ? 'active' : '' } `} key={i} >
                                        <a className="page-link" href="#" onClick={ ()=> changeCPage(n) }> {n}</a>
                                    </li>
                                ))
                            }
                        
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={ nextPage }>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>

    );

    function prePage(){
        if( currentPage !== 1){
            setCurrentPage( currentPage - 1 );
        }
    }

    function changeCPage(id){
        setCurrentPage( id );
    }


    function nextPage(){
        if( currentPage !== npage){
            setCurrentPage( currentPage + 1 );
        }
    }
    

}


export default ShowUsers;
