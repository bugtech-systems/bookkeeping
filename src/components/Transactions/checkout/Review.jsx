import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { createAi, createAiTransactions } from '../../../redux/actions/data.action';
import { useDispatch, useSelector } from 'react-redux';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { formatCurrency } from '../../../utils/helpers';
import { CLEAR_ENTRY, SET_ENTRY } from '../../../redux/actions/types';
import LoopIcon from '@mui/icons-material/Loop';


export default function Review({isError, setIsError}) {
const dispatch = useDispatch();
const { entry, description, accounts } = useSelector(({data}) => data)

  const regenerateTransaction = () => {
    setIsError(false)
    dispatch({type: CLEAR_ENTRY})
    let newText = `Please generate other entries, not similar to this: \n ${JSON.stringify({entries: entry.entries})} \n `
    dispatch(createAi({entry: newText}))
    .then(res => {
      console.log(res.data, 'Entry OF AI')
      dispatch({ type: SET_ENTRY, payload: res.data })
      return res.data
    })
    .catch(err => {
      setIsError(true)
      return null
    })
    
  }
  
  const switchEntry = () => {
    let { entries } = entry;
  let newEntries = entries.map(a => {
          let item = a;
          item.type = a.type === 'credit' ? 'debit' : 'credit';
          return item;
  });
  
  dispatch({ type: SET_ENTRY, payload: {...entry, entries: newEntries} })
 
  
  }
  
  console.log(entry, 'desc')
  
  const journalEntries = (prop) => {
    let { entries } = prop;
    
    entries.map(a => { 
      let account = accounts.find(ab => ab._id == a.account);
      let newAccount = a;
      console.log(account, 'FINDINGGS', a)
      if(account){
        newAccount.account = account;
      }
      return newAccount
    })
    
    console.log(accounts, 'aaa', entries.filter(a => a.type === "debit"))
    
    return (
        <div className="grid-item" style={{display: "flex", alignItems: "flex-start", marginBottom: "20px"}}>
            <div style={{display: "flex", flexDirection: "column", flexBasis: "70%", justifyContent: "flex-start"}}>
                {entries.filter(a => a.type === "debit").map(a => (<p className="text-dark0" >{ a.account?.name } </p>))}
                {entries.filter(a => a.type === "credit").map(a => ( <span className="text-dark2" style={{marginLeft: "10px", marginTop: "5px"}}>{ a.account?.name }</span>))}
            <span className="text text2" style={{marginLeft: "25px", fontSize: "13px", width: "80%", marginTop: "5px"}}>{ description }</span>
            </div>
            <IconButton onClick={() => switchEntry()}>
                <LoopIcon/>
            </IconButton>
            <div   style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", flexBasis: "30%"}}>
            {entries.filter(a => a.type === "debit").map(a => (<p className="text-dark0" style={{marginRight: "20px"}} >{formatCurrency(a.amount ? a.amount  : 0)} </p>))}
            {entries.filter(a => a.type === "credit").map((a, index) => (   <span className="text-dark2" style={{  marginTop: index === 0 ? "5px" : "0px"}} >{formatCurrency(a.amount ? a.amount : 0)}</span>))}
            </div>
        </div>
    )
  }


  return (
    <React.Fragment>
    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
      <Typography variant="h6" gutterBottom>
        Particulars
      </Typography>
      <Button size="small"  variant="contained" disabled onClick={() => regenerateTransaction()}>
      <AutoFixHighIcon fontSize="small"/>&nbsp;&nbsp;Re-analyze
      </Button>
      </div>
      <br/>      <br/>
      {isError && (<p style={{color: "red", textAlign: "center"}}>Analyze Transaction Again.</p>)}

          { entry.entries &&  journalEntries(entry)}
          <br/><br/>
    </React.Fragment>
  );
}
