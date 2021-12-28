import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { loadTransactions } from "redux/actions/transactionsAction";
import { Transaction as transactionType } from "redux/reducers/transactionReducer";
import Transaction from "./transaction";

export default function Transactions() {
  const { currentWallet, transactions, isLoadingTransactions } = useSelector(
    (state: RootState) => {
      return {
        currentWallet: state.customer.currentWallet,
        transactions: state.currentWalletTransactions.transactions,
        isLoadingTransactions: state.currentWalletTransactions.isLoading,
      };
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentWallet.address) {
      dispatch({ type: "LOADING_TRANSACTIONS" });
      dispatch(loadTransactions(currentWallet.address));
    }
  }, [currentWallet]);

  return (
    <div className="overflow-y-scroll h-[100%]">
      {!isLoadingTransactions &&
        transactions.map((t: transactionType) => (
          <Transaction
            id={t.id}
            amount={t["payment-transaction"]?.amount}
            sender={t.sender}
            time={t["round-time"]}
            receiver={t["payment-transaction"]?.receiver}
            fee={t.fee}
          />
        ))}
    </div>
  );
}