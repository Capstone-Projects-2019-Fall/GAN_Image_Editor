"use strict";

function qualityGAN(id) {
        
   
    var qualityContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Quality Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
    
    
        <!-- <div id="qualityFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayQualityGAN("qualityResponseContainer", null);
   
}

function qualityGANFromAccount(id, picPath) {
    window.location.hash = '#/fake';
    update.userHasLeftAccountPage();
   
    var qualityContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Quality Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
    
    
        <!-- <div id="qualityFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayQualityGAN("qualityResponseContainer", picPath);
   
}
