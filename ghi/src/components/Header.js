import React from 'react';
import './Home.css';
import NavSignUp from './NavSignUp';


function Header() {
  return (
    <>

        <NavSignUp />
        {/* banner */}
        <section id="banner">
            <div className="container">
                    <div className="banner-title-div">
                        <p className="banner-title">Welcome to our Website</p>
                        <p>Placeholder text</p>
                        <form action="#">
                                <button className="btn-sing-up" type="submit">Sign up</button>
                        </form>
                    </div>
            </div>
        </section>
    </>
  );
}

export default Header;
