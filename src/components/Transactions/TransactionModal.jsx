import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { iconsImgs } from "../../utils/images";
import Checkout from './checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_DESCRIPTION, CLEAR_ENTRY, CLOSE_MODAL, OPEN_MODAL } from '../../redux/actions/types';


export default function TransactionModal() {
    const dispatch = useDispatch()
    const { modal } = useSelector(({ui}) => ui)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        dispatch({type: CLEAR_DESCRIPTION})
        dispatch({type: OPEN_MODAL, payload: "transaction"})
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: CLOSE_MODAL})
        dispatch({type: CLEAR_ENTRY})
    };
    console.log(modal, 'modal')

    return (
        <React.Fragment>
            <button className="grid-c-title-icon" onClick={handleClickOpen}>
                <img src={iconsImgs.plus} />
            </button>
            <Dialog open={modal === 'transaction'} onClose={handleClose} maxWidth="sm" fullWidth >
                <Checkout/>
   
          {/*       <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Entry</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
