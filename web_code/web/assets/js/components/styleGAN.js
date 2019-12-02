"use strict";

function styleGAN(id) {
        
   
    var styleContent = `  
        <h2> Style Editing GAN Model! </h2>
    
        <!-- <div id="styleFlaskHere"></div> -->
    
        <div>
            <div id="styleGANDisplay"></div>
        </div>
    
        <div id="styleResponseContainer"></div>
    `;
    
    document.getElementById(id).innerHTML = styleContent;
    
    //showTestFlask("styleFlaskHere");
    
    displayStyleGAN("styleResponseContainer");
}