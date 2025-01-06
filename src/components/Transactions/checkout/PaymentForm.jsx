import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch} from 'react-redux';
import { SET_DESCRIPTION, SET_ENTRY } from '../../../redux/actions/types';

export default function PaymentForm() {
  const dispatch = useDispatch()
  const { entry, description } = useSelector(({data}) => data);


  return (
    <React.Fragment>
      <Grid container spacing={3}>
      <Grid  item xs={12}>
      <TextField
          id="outlined-multiline-static"
          label="Transaction Details"
          placeholder="Enter Transaction Details here..."
          multiline
          rows={2}
          fullWidth
          value={description}
          onChange={(e) => dispatch({type: SET_DESCRIPTION, payload: e.target.value  })}
        />       
      </Grid>
      </Grid>
    </React.Fragment>
  );
}
