"use strict";

function facialGAN(id) {
        
   
    var facialContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Facial Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
    
        <!-- <div id="facialFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayFacialGAN("facialResponseContainer", null);
}

function facialGANFromAccount(id, picPath) {
    window.location.hash = '#/fake';
    update.userHasLeftAccountPage();
   
    var facialContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Facial Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
        
    
        <!-- <div id="facialFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayFacialGAN("facialResponseContainer", picPath);
}