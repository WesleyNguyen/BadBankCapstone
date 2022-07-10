const { json } = require("express");

function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginstatus, setLoginStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: missing ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(`Received input fields (email, password): ${email}, ${password}`); //Debugging
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    // Reaches into the backend and creates a new account
    const url = `/account/login/${email}/${password}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json(); //Proper syntax for accessing this data: data[0].name (or balance, etc.); alternatively: data[0]['name']
      
      //If we get an empty array/null value, then we get a failed login alert;
      //If we get an actual data set, then ctx.data[0] is set to the fetched data. Trigger setShow and a success alert
      if (data[0] == null){
        alert("Failed Login. Wrong email and/or password");
      }
      else{
        //This line no longer needed; this stringifies the entire json data into an entire string. Set to email hook because bad programming names
        //setEmail(JSON.stringify(data));
        ctx.data[0] = data[0];
        console.log("ctx.data[0].email is now set to: " + ctx.data[0].email);
        console.log("Stringified data: " + JSON.stringify(ctx));
        setShow(false);
        setLoginStatus('logged in');
        alert(`Successfully Logged In! Welcome back, ${ctx.data[0].name}`);
      }
    })();
    //console.log(<span>{ctx.data.balance}</span>) //Useless test code, but I'm keeping it for legacy reasons
  }

function handleLogout(){
  console.log(JSON.stringify(ctx.data[0]));
  ctx.data[0]._id = null;
  ctx.data[0].name = null;
  ctx.data[0].email = null;
  ctx.data[0].password = null;
  ctx.data[0].balance = null;
  console.log(JSON.stringify(ctx.data[0]));
  setShow(false);
  setLoginStatus('logged out');
}

function clearForm(){
  setName('');
  setEmail('');
  setPassword('');
  setShow(true);
}

return (
  <Card
    bgcolor="success"
    header="Login"
    status={status}
    body={show ? (  
            <>
            LOGGED IN AS: {ctx.data[0].name}<br/><br/>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" disabled={!email && !password} onClick={handleLogin}>Log In</button>
            <button type="submit" className="btn btn-light" disabled={!ctx.data[0].name} onClick={handleLogout}>Log Out</button>
            </>
          ):(
            <>
            <h5>Successfully {loginstatus}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Go Back to Login Page</button>
            </>
          )}
  />
  )
}