import React from 'react';
import CheckoutWizard from '../components/CheckoutWizard';

function done() {
  return (
    <div>
      <CheckoutWizard activeStep={3} done={done} />

      <h1>doane</h1>
    </div>
  );
}

export default done;
