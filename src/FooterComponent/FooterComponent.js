import "./FooterComponent.css";
import React from "react";
import { Link } from "react-router-dom";
const FooterComponent = () => {


    return(<div className="FooterContainer">
          <ul className="footerele">
            <Link className="elements"  to="/about">About</Link>
            <li className="elements">Contact US</li>
           <Link className="elements" to="/legal">Terms Of service</Link>
           <li className="elements">Social</li>
            <li className="elements">Copyright@Fancasa.com</li>
          </ul>
        
    </div>);
}
export default FooterComponent;