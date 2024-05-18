import './App.css';
import React from 'react';
import Transactions from './Transactions';
import web from '../src/images/1.jpg';
function Home() {
  return (
<div>


<section id='header' className='d-flex align-items-center'>

<div class='container-fluid nav_bg'>
<div class='row'>
<div class='col-10 mx-auto'>
<div className='row'>
<div class='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column'>
<h1>Welcome to one of the <strong class='brand-name'>finest bank of World</strong></h1>
<h2 class='my-3'>
We are trusted all over the country.
</h2>
<div class='mt-3'>
<a className="btn-get-started" href="/Transactions" role="button">Get Started</a>
</div>
</div>

<div className='col-lg-6 order-1 order-lg-2 header-img'>
<img src={web} className='img-fluid animated' alt='home img' />
</div>
</div>
</div>
</div>
</div>
</section>

</div>
   
   

  )
}

export default Home;
