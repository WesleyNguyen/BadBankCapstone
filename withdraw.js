function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const [withdraw, setWithdraw]   = React.useState(0);

  const ctx = React.useContext(UserContext);
  // const [list, setList] = React.useState(ctx.users);
  const [tempBalance, setTempBalance] = React.useState(ctx.data);


  function validate(field, label){
      if (!field) {
        setStatus('Error: Empty number field' + field);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      //Overdraft logic
      if (field > ctx.data[0].balance){
        alert(`You don't have enough money. You are overdrafting $${field-ctx.data[0].balance}`);
        return false;
      }
      return true;
  }

  function handleWithdraw(){
    if (!validate(withdraw,     'withdraw'))     return;
    // if (isNaN(deposit)) {
    //   //if input is not a number then here
    //   alert('It is not a Number');
    // } else {
    //   //if input is number then here
    //   alert('It is a Number');
    // }

    console.log(JSON.stringify(ctx));
    //Attempting to update ctx.data; this works if it's not an array of objects
    //ctx.updateUsers({...ctx.data, balance: ctx.data.balance + Number(deposit)}); //balance is set to current balance + deposit
    console.log(JSON.stringify(ctx));

    // const newList = ctx.data.map((user) => {
    //   /*const newArr = [...ctx.data];
    //   newArr[index] = user;
    //   console.log("newArr: " + newArr);
    //   ctx.data.updateUsers(newArr);*/

    //   console.log("List's Balance:" + user.balance);
    //   //Testing basic array validation; no longer needed
    //   /*if (user.name === 'wesley'){
    //     user.name = 'abel';
    //   }*/
    //   user.balance = user.balance + Number(deposit);
    //   //return user;
    //   //const updatedBalance = Number(user.balance) + Number(deposit);
    //   //console.log("Updated Balance: " + updatedBalance);
    //   //const updatedList = {...user, balance: updatedBalance,};
    //   //return updatedList;
    // });
    //console.log(JSON.stringify(newList)); //Works, but maybe we don't need to make a newList anymore
    console.log(JSON.stringify(ctx)); //Before and after
    
    //Likely a much simpler approach
    ctx.data[0].balance = ctx.data[0].balance - Number(withdraw);
    //ctx.updateUsers({...ctx.data});
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
          Account Balance: {ctx.data[0].balance}
          <br/>
          <br/>
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