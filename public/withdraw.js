function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [withdraw, setWithdraw]   = React.useState(0);

  const ctx = React.useContext(UserContext);

  function validate(field, label){ //If you're not logged in, you will be told to log in
    if (!field) {
      setStatus('Error: You are not logged in');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    //Overdraft logic
    else if (field > ctx.data[0].balance){
      alert(`You don't have enough money. You are overdrafting $${field-ctx.data[0].balance}`);
      return false;
    }
    return true;
  }

  function handleWithdraw(){
    if (!validate(withdraw, 'withdraw'))        return;
    if (!validate(ctx.data[0].email, 'email'))  return;

    const url = `/account/withdraw/${ctx.data[0].email}/${withdraw}`;
    console.log("The URL: " + url);
    
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      ctx.data[0].balance = parseInt(ctx.data[0].balance, 10) - parseInt(withdraw);
      console.log("ctx.data[0].balance: " + ctx.data[0].balance);
      console.log("ctx.data[0].balance: " + typeof ctx.data[0].balance);
    })();
    
    setShow(false);
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setWithdraw(0);
    setShow(true);
  }

  return (
    <Card
      bgcolor="danger"
      header="Withdraw"
      status={status}
      body={show ? (
        <>
          {/* Account Name: {ctx.data.map((user) => (<span key={user.name}>{user.name}</span>))}<br/> */}
          {/* Account Balance: {ctx.data.map((user) => (<span key={user.name}>{user.balance}</span>))} */}
          LOGGED IN AS: {ctx.data[0].name}<br/>
          Account Balance of {ctx.data[0].name}: ${ctx.data[0].balance}<br/><br/>
          Withdraw Amount<br/>
            <input type="text" className="form-control" id="balance" placeholder="$0.00" onChange={e => setWithdraw(e.currentTarget.value)}
            onKeyPress = {(event) => {
              if (!/[0-9]/.test(event.key)){
                event.preventDefault();
              }
            }}/><br/>
            <button type="submit" className="btn btn-light" disabled={!withdraw} onClick={handleWithdraw}>Withdraw</button>

            {/* Attempting to map the array list object */}
            {/* {list.map((item) => (
              <span key={item.name}>
                {item.balance}
              </span>
            ))} */}
        </>
            ):(
            <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw more money</button>
            </>
          )}
    />
  )
}