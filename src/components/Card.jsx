import React from 'react';
import {Link} from 'react-router-dom';

function Card({imgPath, item, routePath, children}) {
  return (
    <Link to={`/${routePath}/${item.id}`} style={{textDecoration: 'none'}}>
      <img src={imgPath} alt="" />
      {children}
    </Link>
  );
}

export default Card;
