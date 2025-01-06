import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { iconsImgs } from "../../utils/images";
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { createChartAccount, getChartOfAccounts } from '../../redux/actions/data.action';
import { useDispatch } from 'react-redux';

const accountType = [ { title: "Asset", normalBalance: "debit"},  { title: "Liability", normalBalance: "credit"} ,  { title: "Equity", normalBalance: "credit"},  { title: "Expense", normalBalance: "debit"},   { title: "Revenue", normalBalance: "credit"}]
const normalBalanceType = ["debit", "credit"];


export default function AccountModal() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({});
    
    const handleChanges = prop => event => {
            
            
            if(!event.target.value) return;
            let newVal = {...values, [prop]: event.target.value};
            let accnt = accountType.find(a => a.title === event.target.value)
            
            console.log(accnt, 'ACCNT')
            if(accnt){
                newVal = { ...newVal, normalBalance: accnt.normalBalance}
            }
            
            setValues(newVal)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
    
        await dispatch(createChartAccount(values))
        .then(res => {
            console.log(res, 'RESS')
            dispatch(getChartOfAccounts())
            setValues({name: "", type: "", normalBalance: ""})
            handleClose()
        })
        .catch(err => {
            console.log(err, 'ERR')
        })
    
    
    }

    const handleClose = () => {
        setOpen(false);
    };
    
    console.log(values, 'VAL')

    return (
        <>
            <button className="grid-c-title-icon" onClick={handleClickOpen}>
                <img src={iconsImgs.plus} />
            </button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
                <div  
                >
                <DialogTitle 
                sx={{
                color: "#bdbabb"}}
                >{"New Account"}</DialogTitle>
                <DialogContent  
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        size='small'
                        label="Account Name"
                        fullWidth
                        variant="outlined"
                        value={values.name}
                        onChange={handleChanges('name')}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                         <TextField
          id="filled-select-currency"
          select
          fullWidth
          size='small'
          label="Account Type"
          helperText="Please select your account type"
          variant="outlined"
          margin="dense"
          defaultValue="Asset"
          value={values.type}
          onChange={handleChanges('type')}
          sx={{mr: 5}}

        >
          {accountType.map((option) => (
            <MenuItem key={option.title} value={option.title}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
                         <TextField
                         size='small'
          id="filled-select-normal"
          select
          fullWidth
          label="Normal Balance"
          helperText="Select normal balance"
          variant="outlined"
          margin="dense"
          defaultValue="debit"
          value={values.normalBalance}
          onChange={handleChanges('normalBalance')}
        >
          {normalBalanceType.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Box>
                </DialogContent>
                <DialogActions  
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
                </div>
            </Dialog>
        </>
    );
}
