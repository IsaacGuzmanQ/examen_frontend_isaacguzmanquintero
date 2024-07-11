import logo from './logo.svg';
import './App.css';
import ShowUsers from './components/Usuarios';
import CreateUsuario from './components/CreateUsuario';
import UpdateUsuario from './components/EditarUsuario';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App p-5" >
			<BrowserRouter>
				<Routes>
					<Route path='/' element={ <ShowUsers/> }  />
					<Route path='/create' element={ <CreateUsuario/> }  />
					<Route path='/edit/:id' element={ <UpdateUsuario/> }  />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
