function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [deposit, setDeposit]   = React.useState(0);

  const ctx = React.useContext(UserContext);

  function validate(field, label){ //If you're not logged in, you will be told to log in
    if (!field) {
      setStatus('Error: You are not logged in');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handleDeposit(){
    if (!validate(deposit,     'deposit'))     return;
    if (!validate(ctx.data[0].email, 'email')) return;
    
    const url = `/account/deposit/${ctx.data[0].email}/${deposit}`;
    console.log("The URL: " + url);
    
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      ctx.data[0].balance = parseInt(ctx.data[0].balance, 10) + parseInt(deposit);
      console.log("ctx.data[0].balance: " + ctx.data[0].balance);
      console.log("ctx.data[0].balance: " + typeof ctx.data[0].balance);
    })();
    setShow(false);
  }

  function clearForm(){
    setName('');
    setPassword('');
    setDeposit(0);
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? (
        <>
          {/* Account Name: {ctx.data.map((user) => (<span key={user.name}>{user.name}</span>))}<br/> */}
          {/* Account Balance: {ctx.data.map((user) => (<span key={user.name}>{user.balance}</span>))} */}
          LOGGED IN AS: {ctx.data[0].name}<br/>
          Account Balance of {ctx.data[0].name}: ${ctx.data[0].balance}<br/><br/>
          Deposit Amount<br/>
            <input type="text" className="form-control" id="balance" placeholder="$0.00" onChange={e => setDeposit(e.currentTarget.value)}
              onKeyPress = {(event) => {
                if (!/[0-9]/.test(event.key)){
                  event.preventDefault();
                }
              }}/><br/>
            <button type="submit" className="btn btn-light" disabled={!deposit} onClick={handleDeposit}>Deposit</button>
        </>
            ):(
            <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Deposit more money</button>
            </>
          )}
    />
  )
}