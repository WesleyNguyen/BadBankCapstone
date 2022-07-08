function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [deposit, setDeposit]   = React.useState(0);

  const ctx = React.useContext(UserContext);
  const [dataOne, setData] = React.useState('');

  // const [list, setList] = React.useState(ctx.users);

  function validate(field, label){
      if (!field) {
        setStatus('Error: Empty number field');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function findUser(email){
    const url = `/account/deposit/${email}/${deposit}`;
    console.log("The URL: " + url);

  }

  function handleDeposit(){
    if (!validate(deposit,     'deposit'))     return;

    // console.log("Current ctx: " + JSON.stringify(ctx));
    // ctx.data[0].balance = ctx.data[0].balance + Number(deposit); //handle deposit
    // console.log("After deposit: " + JSON.stringify(ctx)); //Before and after
    // //console.log(`ctx: ${ctx.data[1].balance}`);

    //  //setEmail('wesley@mit.edu');
    //  console.log("email(sent from handleDeposit): " + email);
     
    //  //const url = `/account/deposit/peter@mit.edu/${deposit}`;
      const url = `/account/deposit/${email}/${deposit}`;
      console.log("The URL: " + url);

     const myInfo = fetch(url)
     .then((res) => {const data = res.json(); console.log("Data is: " + data)})
     .then(data => {
        console.log("Data from Deposit: " + data);
        setData(JSON.stringify(data));
        ctx.data[0] = dataOne;
        console.log("Data One: " + ctx.data[0]);
        return data});
     //.then(data => {return data});
     console.log("myInfo: " + myInfo);

    // const url = `/account/deposit/${email}/${deposit}`;
    // (async () => {
    //   var res = await fetch(url);
    //   console.log("Balance Res's Status: " + res.status)
    //   var data = await res.json();
    //   console.log("Data is: " + data);
    //   // console.log("Data's _id: " + data._id);
    //   // ctx.data[0].name = data.name;
    //   ctx.data[0] = data;
    //   console.log("Testing ctx.data[0].name: " + ctx.data[0].name);
    //   console.log("Testing ctx.data[0].email: " + ctx.data[0].email);
    //   console.log("Testing ctx.data[0].password: " + ctx.data[0].password);
    //   console.log("Testing ctx.data[0].balance: " + ctx.data[0].balance);
    // })();

    //ctx.updateUsers({...ctx.data});
    setShow(false);
  }

  function handleTest(){
    console.log("Test Handler works");
    console.log("email: " + email);

    setEmail('wesley@mit.edu');
    
    console.log("email after setEmail: " + email);
    console.log("deposit: " + deposit);
    setShow(false);
  }

  function clearForm(){
    setName('');
    setPassword('');
    setDeposit(0);
    setShow(true);
    
    console.log("email after function clearForm: " + email);
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
          Account Balance: {ctx.data[0].balance}
          <br/>
          Alternative Facts Balance: {dataOne}<br/>
          Email<br/>
          <input type="text" className="form-control" id="email" placeholder="" onChange={e => setEmail(e.currentTarget.value)}/><br/>
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