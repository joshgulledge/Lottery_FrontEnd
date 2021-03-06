import './App.css';
import { useState, useEffect } from "react";
import web3Inst from './web3';
import lottery from './lottery';

function App() {
  // local state variables
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [contractBalance, setContractBalance] = useState(""); // will be in wei
  const [amountEntered, setAmountEntered] = useState(""); // will be in eth
  const [enterMessage, setEnterMessage] = useState("");

  useEffect(() => {
    // create a call to get the data from the contract
    async function getData () {
      // this should actually go to the contract and retrieve the data
      let managerAddress = await lottery.methods.manager().call();
      let players = await lottery.methods.getPlayersList().call();
      // balance is in wei and not ether
      let balance = await web3Inst.eth.getBalance(lottery.options.address);

      // set the state values with data from the contract
      setContractBalance(web3Inst.utils.fromWei(balance), 'ether'); // converts to eth
      setManager(managerAddress);
      setPlayers(players);
    };

    getData();

  }, []);

  // local functions
  async function enterLottery (e) {
    e.preventDefault();
    // send the transaction to the contract
    const accounts = await web3Inst.eth.getAccounts();

    setEnterMessage('Transaction being processed... please continue to wait');

    await lottery.methods.enter().send({
      // assume the first account is the main one we will be using
      from: accounts[0],
      // get the value entered and convert to wei from an ether amount
      value: web3Inst.utils.toWei(amountEntered, 'ether')
    });

    setEnterMessage('Congratulations! You have been entered!!');

  };

  async function pickWinner () {
    setEnterMessage('Transaction being processed... please continue to wait');

    const accounts = await web3Inst.eth.getAccounts();
    
    // only manager can pick a winner
    if (manager != accounts[0]) {
      setEnterMessage('Only contract manager can pick a winner');
      return
    };

    // trigger the pick winner method in the contract, must be contract manager
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    }); // when we send a transaction, we get no response back
    // TODO - go back and change the contract to have a variable that saves the winner
    setEnterMessage('Winner has been picked!');

  };

  return (
    <div>
      <h2>
        Lottery Contract 
      </h2>

      <div>
        Contract Managed by: {manager} 
      </div>

      <div>
        Current number of players: {players.length}
      </div>

      <div>
        Current balance of Lottery: {contractBalance} Eth
      </div>

      <form onSubmit={enterLottery}>
        <h4>
          Enter the Lottery today!
        </h4>

        <div>
          <label>
            Amount of Eth to Enter:
            <input onChange={e => {
              setAmountEntered(e.target.value);
            }} type="text" />
          </label>
        </div>

        <button>
          Enter Lottery
        </button>
      </form>
      
      <h4>
        {enterMessage}
      </h4>

      <h4>
        Pick a Winner
      </h4>
      <button onClick={pickWinner}>
        Chicken Dinner
      </button>
    </div>
  );
}

export default App;
