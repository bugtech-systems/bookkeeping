import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ENTRY, CLOSE_MODAL, SET_ENTRY } from '../../../redux/actions/types';
import { createAiTransactions, createTransactions, getChartOfAccounts, getTransactions } from '../../../redux/actions/data.action';


const steps = ['Describe Transaction', 'Journal Entry'];



export default function Checkout() {
  const dispatch = useDispatch();
  const { entry, description } = useSelector(({data}) => data)
  const [activeStep, setActiveStep] = React.useState(0);
  const [isError, setIsError] = React.useState(false);


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm />;
      case 1:
        return <Review isError={isError} setIsError={setIsError}/>;
      default:
        throw new Error('Unknown step');
    }
  }


  const handleNext = () => {
    setIsError(false)
    if(activeStep === 0){
      dispatch({type: CLEAR_ENTRY})
      setActiveStep(activeStep + 1);
      dispatch(createAiTransactions({"entry": description}))
    .then(res => {
      dispatch({ type: SET_ENTRY, payload: res.data })
      return res.data
    })
    .catch(err => {
      setIsError(true)
      return null
    })
     
    } else {
      dispatch(createTransactions(entry))
      dispatch({type: CLOSE_MODAL})
      
    }
    
    
  };

  const handleBack = () => {
    setIsError(false)
    if(activeStep === 0){
      
      dispatch({type: CLOSE_MODAL})
      return
    }
    
    setActiveStep(activeStep - 1);
  };

console.log(entry, 'ent')
  return (
    <React.Fragment>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h6" variant="h5" align="left">
            New Transaction
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* {activeStep !== 0 && ( */}
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === 0 ? 'Close' : 'Back'}
                  </Button>
                {/* )} */}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
    </React.Fragment>
  );
}
