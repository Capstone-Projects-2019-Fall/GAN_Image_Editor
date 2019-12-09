"use strict";

function facialGAN(id) {
        
   
    var facialContent = `  
        <h2 style="text-align: center;"> Facial Editing GAN Model! </h2>
    
        <!-- <div id="facialFlaskHere"></div> -->
    
        <div>
            <div id="facialGANDisplay"></div>
        </div>
    
        <div id="facialResponseContainer"></div>
    `;
    
    var facialElement = document.getElementById(id);
    
    if(facialElement){
        facialElement.innerHTML = facialContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function facialGAN(id)");
        return;
    }
    
    //showTestFlask("facialFlaskHere");
    
    displayFacialGAN("facialResponseContainer");
}