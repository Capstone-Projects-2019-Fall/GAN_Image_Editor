"use strict";

function facialGAN(id) {
        
   
    var facialContent = `  
        <h2> Facial Editing GAN Model! </h2>
    
        <!-- <div id="facialFlaskHere"></div> -->
    
        <div>
            <div id="facialGANDisplay"></div>
        </div>
    
        <div id="facialResponseContainer"></div>
    `;
    
    document.getElementById(id).innerHTML = facialContent;
    
    //showTestFlask("facialFlaskHere");
    
    displayFacialGAN("facialResponseContainer");
}