function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        alert('Error: ' + label)
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  //Removed due to refactor, which uses mongoDB
  // function handleCreate(){
  //   console.log(name,email,password);
  //   if (!validate(name,     'name'))     return;
  //   if (!validate(email,    'email'))    return;
  //   if (!validate(password, 'password')) return;

  //   if (password.length < 8){
  //     alert('Error: Password must be at least 8 characters long')
  //     return false;
  //   }

  //   ctx.data.push({name,email,password,balance:100});
  //   console.log(JSON.stringify(ctx));
  //   setShow(false);
  //   alert("Successfully Created Account")
  //   //console.log(<span>{ctx.data.balance}</span>) //Useless test code, but I'm keeping it for legacy reasons
  // }

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    if (password.length < 8){
      alert('Error: Password must be at least 8 characters long')
      return false;
    }

    // Reaches into the backend and creates a new account
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      // console.log("Data's _id: " + data._id);
      // ctx.data[0].name = data.name;
      ctx.data[0] = data;
      console.log("Testing ctx.data[0]._id: " + ctx.data[0]._id);
      console.log("Testing ctx.data[0].name: " + ctx.data[0].name);
      console.log("Testing ctx.data[0].email: " + ctx.data[0].email);
      console.log("Testing ctx.data[0].password: " + ctx.data[0].password);
      console.log("Testing ctx.data[0].balance: " + ctx.data[0].balance);
    })();

    //props.setShow(false);

//    ctx.data.push({name,email,password,balance:100});
//    console.log(JSON.stringify(ctx));
    setShow(false);
    alert("Successfully Created Account")
    //console.log(<span>{ctx.data.balance}</span>) //Useless test code, but I'm keeping it for legacy reasons
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              LOGGED IN AS: {ctx.data[0].name}<br/><br/>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" disabled={!name && !email && !password} onClick={handleCreate}>Create Account</button>
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