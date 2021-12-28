import { useState } from "react";
import Send from "../pop-ups/send";
import Receive from "../pop-ups/receive";

export default function Exchange() {
  const [sendActive, setSendActive] = useState(false);
  const [receiveActive, setReceiveActive] = useState(false);

  return (
    <div>
      {sendActive && <Send setSendActive={setSendActive} />}
      {receiveActive && <Receive setReceiveActive={setReceiveActive} />}
      <div className=" w-full h-[12vh] flex items-center justify-around">
        <h3>Transactions</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSendActive(true);
            }}
            className="bg-blue-600 text-white py-3 w-40 rounded-md"
          >
            Send
          </button>

          <button
            onClick={() => {
              setReceiveActive(true);
            }}
            className="bg-gray-100 text-blue-600 py-3 w-40 rounded-md"
          >
            Receive
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}