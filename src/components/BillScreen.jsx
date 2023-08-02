import React from 'react';
import BillNavbar from './BillNavbar';
import BillBottomNav from './BillBottomNav';
import BillCheckOut from './BillCheckOut';

const BillScreen = () => {
  return (
    <div>
      <BillNavbar title="Checkout" />
      <BillCheckOut/>
      <BillBottomNav/>
    </div>
  );
};

export default BillScreen;
