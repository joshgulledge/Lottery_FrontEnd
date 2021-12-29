import './App.css';
import { useState, useEffect } from "react";
import web3Inst from './web3';
import lottery from './lottery';

function App() {

  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [contractBalance, setContractBalance] = useState("");

  useEffect(() => {
    // create a call to get the data from the contract
    async function getData () {
      // this should actually go to the contract and retrieve the data
      let managerAddress = await lottery.methods.manager().call();
      let players = await lottery.methods.getPlayersList().call();
      let balance = await web3Inst.eth.getBalance(lottery.options.address);
      // set the state values with data from the contract
      setContractBalance(balance);
      setManager(managerAddress);
      setPlayers(players);
    };

    getData();

  }, []);

  // temporary log out the values -TODO remove the logs
  console.log(manager);
  console.log(players);
  console.log(contractBalance);

  return (
    <div>
      <h2>
        Lottery Contract 
      </h2>

      <p>
        Contract Managed by: {manager}
      </p>

      <p>
        Current number of players: {players.length}
      </p>

      <p>
        Current balance of Lottery: {contractBalance}
      </p>
    </div>
  );
}

export default App;
