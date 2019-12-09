"use strict";

function styleGAN(id) {
        
   
    var styleContent = `  
        <h2 style="text-align: center;"> Style Editing GAN Model! </h2>
    
        <!-- <div id="styleFlaskHere"></div> -->
    
        <div>
            <div id="styleGANDisplay"></div>
        </div>
    
        <div id="styleResponseContainer"></div>
    `;
    
    var styleElement = document.getElementById(id);
    
    if(styleElement){
        styleElement.innerHTML = styleContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function styleGAN(id)");
        return;
    }
    
    //showTestFlask("styleFlaskHere");
    
    displayStyleGAN("styleResponseContainer");
}