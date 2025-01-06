import * as React from 'react';
import "./Transactions.css";
import { transactionsData } from "../../data/data";
import TransactionModal from './TransactionModal';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions/data.action';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment';
import { formatCurrency } from '../../utils/helpers';

const Transactions = () => {
const dispatch = useDispatch();
const {transactions} = useSelector(({data}) => data)
const [transDate, setTransDate] = React.useState(new Date())     


const handleBack = () => {
    const newDate = new Date(transDate);
    newDate.setDate(transDate.getDate() - 1);
    setTransDate(newDate);
    dispatch(getTransactions(newDate))
  };

  const handleNext = () => {
    const newDate = new Date(transDate);
    const now = new Date();
    
    newDate.setDate(transDate.getDate() + 1);
    
    if(newDate.getDate() > now.getDate()) return;
    
    
    setTransDate(newDate);
    dispatch(getTransactions(newDate))
  };

React.useEffect(() => {
    dispatch(getTransactions(transDate))

}, [])


console.log(transactions, 'transactions')
  return (
    <div className="grid-one-item grid-common grid-c2" >
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">All Transactions</h3>
            <div>
            <IconButton className="grid-c-title-icon" onClick={() => handleBack()}>
                <ArrowBackIosNewIcon fontSize="small" sx={{color: "#a8a5a6"}}/>
            </IconButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <IconButton className="grid-c-title-icon"  onClick={() => handleNext()}>
                <ArrowForwardIosIcon fontSize="small" sx={{color: "#a8a5a6"}}/>
            </IconButton>
            </div>
            <TransactionModal/>
        </div>

        <div className="grid-content" style={{marginRight: "-10px"}}>
            <span className='text-scarlet' style={{paddingBottom: "10px"}}>{moment(transDate).format('ll')}</span>
            <hr style={{marginTop: "10px", marginBottom: "20px"}}/>
            <div className="grid-items" style={{maxHeight: "300px", overflowX: "hidden", overflowY: "auto", paddingRight: "15px"}}>

                { transactions.length === 0 ? <p style={{textAlign: "center"}}>No Transactions</p> :
                    transactions.map((transaction) => {
                        const { entries } = transaction;
                    return (
                        <div className="grid-item" key={ transaction._id } style={{display: "flex", alignItems: "flex-start", marginBottom: "20px"}}>
                            <div style={{display: "flex", flexDirection: "column", flexBasis: "70%", justifyContent: "flex-start"}}>
                                {entries.filter(a => a.type === "debit").map(a => (<p className="text0" key={a._id} >{ a.account?.name } </p>))}
                                {entries.filter(a => a.type === "credit").map(a => ( <span key={a._id} className="text text1" style={{marginLeft: "10px", marginTop: "5px"}}>{ a.account?.name }</span>))}
                            <span className="text text2" style={{marginLeft: "25px", fontSize: "13px", width: "80%", marginTop: "5px"}}>{ transaction.description }</span>
                            </div>
                            <div   style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", flexBasis: "30%"}}>
                            {entries.filter(a => a.type === "debit").map(a => (<p className="text0" key={a._id} style={{marginRight: "20px"}} >{formatCurrency(a.amount ? a.amount  : 0)} </p>))}
                            {entries.filter(a => a.type === "credit").map((a, index) => (   <span key={a._id} className="text text1" style={{  marginTop: index === 0 ? "5px" : "0px"}} >{formatCurrency(a.amount ? a.amount : 0)}</span>))}
                            </div>
                        </div>
                    )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Transactions
