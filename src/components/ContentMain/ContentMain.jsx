import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Loans />
            <Savings />
            
        </div>
        <div className="content-grid-one">
            <Transactions />

            
            <Budget />
              
            <div className="grid-two-item">
              <div className="subgrid-two">
              <Report/>
              <Financial />
              </div>
            </div>
        </div>
    </div>
  )
}

export default ContentMain
