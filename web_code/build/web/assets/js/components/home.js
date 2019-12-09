"use strict";

function home(id) {
    
    var homeContent = `
      <!-- Banner -->
            <section id="banner">
                    <div class="inner">
                            <h1>GAN Image Editing: <span>Alter your look<br />
                            and experience freedom!</span></h1>
                            <ul class="actions">
                                    <li><a href="#" class="button alt">Get Started</a></li>
                            </ul>
                    </div>
            </section>
    
            <!-- One -->
            <section id="one">
                    <div class="inner">
                            <header>
                                    <h2>Generative Adversarial Networks (GANs)</h2>
                            </header>
                            <p>A Generative Adversarial Network (GAN) is a class of machine learning systems
                                where two neural networks contest with each other. The generative network generates 
                                candidates (data) while the discriminative network evaluates them. Typically, the generative 
                                network learns to map from a latent space to a data distribution of interest, while the 
                                discriminative network distinguishes candidates produced by the generator from the true data 
                                distribution. The generative network's training objective is to increase the error rate of the 
                                discriminative network (i.e., "fool" the discriminator network by producing novel candidates that 
                                the discriminator thinks are not synthesized (are part of the true data distribution)).
                            </p>
                            <ul class="actions">
                                    <li><a href="#" class="button alt">Learn More</a></li>
                            </ul>
                    </div>
            </section>

            <!-- Two -->
            <section id="two">
                    <div class="inner">
                            <article>
                                    <div class="content">
                                            <header>
                                                    <h3>Our GAN models</h3>
                                            </header>
                                            <div class="image fit">
                                                    <img src="images/shopify2.jpg" alt="" />
                                            </div>
                                    </div>
                            </article>
                            <article class="alt">
                                    <div class="content">
                                            <header>
                                                    <h3>About us</h3>
                                            </header>
                                            <div class="image fit">
                                                    <img src="images/shopify1.jpg" alt="" />
                                            </div>
                                    </div>
                            </article>
                    </div>
            </section>

           
    `;
    
    var homeElement = document.getElementById(id);
    
    if(homeElement){
        homeElement.innerHTML = homeContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function home(id)");
    }
}