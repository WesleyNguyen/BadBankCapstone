function AllData(){
//Removed this one to integrate into backend
  const ctx2 = React.useContext(DatabaseContext);
  
  const [data, setData] = React.useState([]);
   
   React.useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all/')
    .then(response => response.json()
    )
    .then(data => {
      ctx2.data = data;
      console.log("Data from allData: " + data[1].name);
      console.log("Data from ctx2.data: " + ctx2.data[0].name);
      setData(JSON.stringify(data));
    })    
  }, []);

//Basic code that spits all data from json file onto screen
/*  return (<>
    <h5>All Data in Store:</h5>
    {data}
  </>);*/

  //Removing all the below to refactor
  var n = 0;

  function nTable(){
    n++;
  }

  return (
    <CardTable
      bgcolor="primary"
      header="All Data in Store"
      body={(  
              <>
              {//Simple raw json spat onto scree; removed now that the table works
              /* {data}<br/> */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                  <tbody>
                    {ctx2.data.map((user, index) => (
                    // {data.map((user, index) => (
                       <tr>
                        <th scope="row" onLoad={nTable()}>{n}</th>
                        <td key={user.index}>{user.name}</td>
                        <td key={user.index}>{user.email}</td>
                        <td key={user.index}>{user.password}</td>
                        <td key={user.index}>{user.balance}</td>
                       </tr>
                    ))}
                  </tbody>
              </table>
                {console.log("All Data (saved as ctx2): " + JSON.stringify(ctx2))}
              </>
            )}
  />
  ); //Functional down to here; below here is duplicate/test

  // return (
  //   <>
  //   <h5>All Data in Store</h5>
  //   {/* {JSON.stringify(ctx)}<br/> */}
  //   <table className="table">
  //     <thead>
  //       <tr>
  //         <th scope="col">#</th>
  //         <th scope="col">Name</th>
  //         <th scope="col">Email</th>
  //         <th scope="col">Password</th>
  //         <th scope="col">Balance</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {/* <tr>
  //         <th scope="row">1</th>
  //         <td>Mark</td>
  //         <td>Otto</td>
  //         <td>@mdo</td>
  //       </tr>
  //       <tr>
  //         <th scope="row">2</th>
  //         <td>Jacob</td>
  //         <td>Thornton</td>
  //         <td>@fat</td>
  //       </tr>
  //       <tr>
  //         <th scope="row">3</th>
  //         <td>Larry</td>
  //         <td>the Bird</td>
  //         <td>@twitter</td>
  //       </tr> */}

  //       {ctx.data.map((user) => (
  //         <tr>
  //           <th scope="row" onLoad={nTable()}>{n}</th>
  //           <td key={user}>{user.name}</td>
  //           <td key={user}>{user.email}</td>
  //           <td key={user}>{user.password}</td>
  //           <td key={user}>{user.balance}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  //   </>
  // );
}