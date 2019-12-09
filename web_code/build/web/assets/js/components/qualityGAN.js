"use strict";

function qualityGAN(id) {
        
   
    var qualityContent = `  
        <h2 style="text-align: center;"> Quality Editing GAN Model! </h2>
    
    
        <!-- <div id="qualityFlaskHere"></div> -->
    
        <div>
            <div id="qualityGANDisplay"></div>
        </div>
    
        <div id="qualityResponseContainer"></div>
    `;
    
    var qualityElement = document.getElementById(id);
    
    if(qualityElement){
        qualityElement.innerHTML = qualityContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function qualityGAN(id)");
        return;
    }
    
    //showTestFlask("qualityFlaskHere");
    
    displayQualityGAN("qualityResponseContainer");
   
}
