import React, { useState } from 'react';

{/* shelved for now */}
const Collapsible = () => {
  const [open, setOpen] = useState(false);


  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button>toggle</button>
      {open && <div>toggle me</div>}
    </div>
  );
};
export default Collapsible;
