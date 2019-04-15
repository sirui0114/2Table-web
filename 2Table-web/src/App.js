import React  from 'react';
import { Header }  from './components/Header';
import { Main } from './components/Main';
import { TOKEN_KEY } from './constants';

import './styles/App.css';

 class App extends React.Component {
   state = {
     isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
   }

   handleLogin = (response) => {
     localStorage.setItem(TOKEN_KEY, response);
     this.setState({ isLoggedIn: true });
   }

   handleLogout = () => {
     localStorage.removeItem(TOKEN_KEY);
     this.setState({ isLoggedIn: false });
   }

   render() {
     return (
       <div className="App">
         <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
         <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
       </div>
     );
   }
  }

  export default App;