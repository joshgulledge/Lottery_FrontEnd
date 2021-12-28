import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import web3Inst from './web3';
import lottery from './lottery';

function App() {

  const [manager, setManager] = useState("");

  useEffect(() => {
    async function getData () {
      let managerAddress = await lottery.methods.manager().call();
      setManager(managerAddress);
    };
    getData();
  }, []);

  console.log(manager);
  return (
    <div>
      <h2>
        Lottery Contract 
      </h2>

      <p>
        Contract Managed by: {manager}
      </p>
    </div>
  );
}

export default App;
