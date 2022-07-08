function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  // const [data1, setData] = React.useState('');
  // React.useEffect(() => {
  //   // fetch(`/account/login/peter@mit.edu/secret`)
  //   fetch(`/account/all`)
  //     .then(response => response.json())
  //     .then(data1 => {
  //       console.log(data1);
  //       setData(JSON.stringify(data1));
  //     });
  // }, []);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(email,password);

    //ctx.data[0].email = email;

    console.log("context changes: " + ctx.data[0].email);

    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    // Reaches into the backend and creates a new account
    const url = `/account/login/${email}/${password}`;
    // (async () => {
    //   const res = await fetch(url);
    //     console.log("Login Res's Status: " + res.status)
    //   const data = await res.json();
    //     console.log("Data is: " + data);
    //   ctx.data[0] = data;

    //   console.log("Testing ctx.data[0].name: " + ctx.data[0].name);
    //   console.log("Testing ctx.data[0].email: " + ctx.data[0].email);
    //   console.log("Testing ctx.data[0].password: " + ctx.data[0].password);
    //   console.log("Testing ctx.data[0].balance: " + ctx.data[0].balance);
    // })();

    const fetchTableData = () => {
      const myResponse = fetch(url)
          .then(result => result.json())
          .then(data => {
              return data;
          })
          console.log("myResponse: " + myResponse);
      return myResponse;
      }
    console.log("FetchTableData: " + fetchTableData);

    // fetch(`/account/login/${email}/${password}`)
    // .then(response => response.json())
    // .then(data1 => {
    //   console.log("data1: " + data1);
    //   console.log("data1.name: " + data1.name)
    //   ctx.data[0].name = data1.name;
    //   console.log(`ctx.data[0].name = ${ctx.data[0].name}`);
    // });

    setShow(false);
    //if(ctx.data[0].name == null)
      //alert("Failed Login")
    //else
    alert("Successfully Logged In")
    //console.log(<span>{ctx.data.balance}</span>) //Useless test code, but I'm keeping it for legacy reasons
  }

// function handleLogin(){
//   console.log(email,password);
//   if (!validate(email,    'email'))    return;
//   if (!validate(password, 'password')) return;

//   if (password.length < 8){
//     alert('Error: Password must be at least 8 characters long')
//     return false;
//   }
  
//     ctx.data.push({email,password,balance:100});
//     console.log(JSON.stringify(ctx));
//     setShow(false);
//     alert("Successfully Created Account")
//     //console.log(<span>{ctx.data.balance}</span>) //Useless test code, but I'm keeping it for legacy reasons
// }

function clearForm(){
  setName('');
  setEmail('');
  setPassword('');
  setShow(true);
  ctx.data[0].name = email;
  console.log("ctx.data[0] from clearForm: " + ctx.data[0].name);
}

return (
  <Card
    bgcolor="success"
    header="Login"
    status={status}
    body={show ? (  
            <>
            {/* Junk test: {data1}<br/> */}
            Newly Logged In User: {ctx.data[0].name}<br/>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" disabled={!email && !password} onClick={handleLogin}>Log In</button>
            </>
          ):(
            <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
            </>
          )}
  />
  )
}