import * as React from 'react';

import { iconsImgs } from "../../utils/images";
import IconButton from '@mui/material/IconButton';
import "./Cards.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountModal from './AccountModal';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartOfAccounts } from "../../redux/actions/data.action";
import { capitalizeFirstLetter } from '../../utils/helpers';


const Cards = () => {
    const dispatch = useDispatch();
    const { accounts} = useSelector(({data}) => data);
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [selectedAccount, setSelectedAccount] = React.useState({})


    const handleNext = (int) => {
        
        let newInt = selectedIndex + int;
        console.log(newInt, 'INTT')
        console.log(newInt >= 0, (accounts.length - 1) >= newInt, 'SINTT')

        if(newInt >= 0 && (accounts.length - 1) >= newInt){
                setSelectedIndex(newInt)
                setSelectedAccount(accounts[newInt])
        } 
    }



useEffect(() => {
    dispatch(getChartOfAccounts())


},[])

useEffect(() => {

if(accounts.length !== 0){

if(selectedIndex && selectedAccount._id){
    let ind = accounts.map(a => {return a._id}).indexOf(selectedAccount._id);
    if(ind === -1){
        setSelectedIndex(0);
        setSelectedAccount(accounts[0])
    } else {
        setSelectedIndex(ind);
    }
} else {
    setSelectedAccount(accounts[0])
    setSelectedIndex(0)
}
}

},[accounts])

console.log(accounts, 'accss')
console.log(selectedAccount)
  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Accounts</h3>
            <div>
            <IconButton className="grid-c-title-icon" onClick={() => handleNext(-1)}>
                <ArrowBackIosNewIcon fontSize="small" sx={{color: "#a8a5a6"}}/>
            </IconButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <IconButton className="grid-c-title-icon"  onClick={() => handleNext(1)}>
                <ArrowForwardIosIcon fontSize="small" sx={{color: "#a8a5a6"}}/>
            </IconButton>
            </div>
            <AccountModal/>
        </div>
        <div className="grid-c1-content">
            <p>{selectedAccount.name}</p>
            <div className="lg-value">₱ {selectedAccount.balance}</div>
            <div className="card-wrapper" style={{flexGrow: 1}}>
                <span className="card-pin-hidden">******** </span>
                {<span></span>}
            </div>
            
            <div className="card-logo-wrapper">
                <div>
                    <p className="text text-silver-v1 expiry-text">Normal Balance</p>
                    <p className="text text-sm text-white">{capitalizeFirstLetter(selectedAccount.normalBalance)}</p>
                </div>
                <div className="card-logo">
                <p>{selectedAccount.type}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards
