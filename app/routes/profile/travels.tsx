import React from 'react';
import { NavLink } from 'react-router';

function Travels() {
  return (
    <div>
      <NavLink to={'/add-travel'}>Добавьте</NavLink> своё первое путешествие
    </div>
  );
}

export default Travels;
