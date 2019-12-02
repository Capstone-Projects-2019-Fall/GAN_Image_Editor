"use strict";

function qualityGAN(id) {
        
   
    var qualityContent = `  
        <h2> Quality Editing GAN Model! </h2>
    
    
        <!-- <div id="qualityFlaskHere"></div> -->
    
        <div>
            <div id="qualityGANDisplay"></div>
        </div>
    
        <div id="qualityResponseContainer"></div>
    `;
    
    document.getElementById(id).innerHTML = qualityContent;
    
    //showTestFlask("qualityFlaskHere");
    
    displayQualityGAN("qualityResponseContainer");
   
}
