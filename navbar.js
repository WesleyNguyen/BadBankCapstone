function changeBackground(e) { //Highlights the tab that you're on
  switch(e.target.id){
    case 'home':
      document.getElementById('createAcc').style.background = '';
      document.getElementById('login').style.background = '';
      document.getElementById('deposit').style.background = '';
      document.getElementById('withdraw').style.background = '';
      document.getElementById('alldata').style.background = '';
      break;

    case 'createAcc':
      document.getElementById('createAcc').style.background = 'mediumturquoise';
      document.getElementById('login').style.background = '';
      document.getElementById('deposit').style.background = '';
      document.getElementById('withdraw').style.background = '';
      document.getElementById('alldata').style.background = '';
      break;

    case 'login':
    document.getElementById('createAcc').style.background = '';
    document.getElementById('login').style.background = 'mediumturquoise';
    document.getElementById('deposit').style.background = '';
    document.getElementById('withdraw').style.background = '';
    document.getElementById('alldata').style.background = '';
    break;
    
    case 'deposit':
      document.getElementById('createAcc').style.background = '';
      document.getElementById('login').style.background = '';
      document.getElementById('deposit').style.background = 'mediumturquoise';
      document.getElementById('withdraw').style.background = '';
      document.getElementById('alldata').style.background = '';
      break;

    case 'withdraw':
      document.getElementById('createAcc').style.background = '';
      document.getElementById('login').style.background = '';
      document.getElementById('deposit').style.background = '';
      document.getElementById('withdraw').style.background = 'mediumturquoise';
      document.getElementById('alldata').style.background = '';
      break;

    case 'alldata':
      document.getElementById('createAcc').style.background = '';
      document.getElementById('login').style.background = '';
      document.getElementById('deposit').style.background = '';
      document.getElementById('withdraw').style.background = '';
      document.getElementById('alldata').style.background = 'mediumturquoise';
      break;
  }
}

function NavBar(){
  const ctx = React.useContext(UserContext);

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a title="Suspect banking website" className="navbar-brand" id='home' onClick={changeBackground} href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a title="Page to set up a new bank account" className="nav-link" id="createAcc" onClick={changeBackground} href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a title="Page to log into a bank account" className="nav-link" id="login" onClick={changeBackground} href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a title="Page to put money into your account" className="nav-link" id="deposit" onClick={changeBackground} href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a title="Page to take money out of your account" className="nav-link" id="withdraw" onClick={changeBackground} href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a title="Page with all users and associated data" className="nav-link" id="alldata" onClick={changeBackground} href="#/alldata/">AllData</a>
          </li>          
        </ul>
      </div>
    </nav>
    </>
  );
}