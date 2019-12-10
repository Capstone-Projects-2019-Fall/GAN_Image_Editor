"use strict";

function styleGAN(id) {
        
   
    var styleContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Style Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
    
        <!-- <div id="styleFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayStyleGAN("styleResponseContainer", null, null);
}

function styleGANFromAccount(id, picPath1, picPath2) {
    window.location.hash = '#/fake';
    update.userHasLeftAccountPage();
   
    var styleContent = `  
        <section id="one" style="padding: 3em 0 1em 0;">
            <div class="inner">
                    <header style="text-align:center;">
                            <h2> Style Editing GAN Model! </h2>
                    </header>
            </div>
        </section>
    
        <!-- <div id="styleFlaskHere"></div> -->
    
        <div style="margin: 0 0 11em 0;">
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
    
    displayStyleGAN("styleResponseContainer", picPath1, picPath2);
}