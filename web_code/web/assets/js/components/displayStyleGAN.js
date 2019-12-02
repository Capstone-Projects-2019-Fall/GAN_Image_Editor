"use strict";

function displayStyleGAN(responseContainerId) {
    var styleGANContainer = document.getElementById("styleGANDisplay");
    //styleGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article>
                                <div class="content">
                                        <header>
                                                <h3>Source Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="styleInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <h3 style="text-align:center;">Upload an Image</h3>
                                        <div class="inner" style="display:inline-block;">
                                                <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadStyleForm">
                                                    <input class="button" type="file" name="file_name" size="50"/>
                                                    <!-- <input type="submit" value="upload"/> -->
                                                </form>
                                        </div>

                                        <button id="styleSubmitButton" >Submit</button>
                                        
                                </div>
                        </article>
                        <article>
                                <div class="content">
                                        <header>
                                                <h3>Target Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="styleInputImg2" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <h3 style="text-align:center;">Upload an Image</h3>
                                        <div class="inner" style="display:inline-block;">
                                                <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadStyleForm2">
                                                    <input class="button" type="file" name="file_name" size="50"/>
                                                    <!-- <input type="submit" value="upload"/> -->
                                                </form>
                                        </div>

                                        <button id="styleSubmitButton2" >Submit</button>
                                        
                                </div>
                        </article>
    
                        <article class="alt">
                                <div class="content">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="styleOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="styleRunButton" >Run Model</button>
                                </div>
                        </article>
                </div>
        </section>
    `;
    
    styleGANContainer.innerHTML = display;
    document.getElementById("styleSubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadStyleForm", "styleInputImg");});
    document.getElementById("styleSubmitButton2").addEventListener('click', function(){ajax_upload_form_non_user("uploadStyleForm2", "styleInputImg2");});
    document.getElementById("styleRunButton").addEventListener('click', function(){runFlask({portNum:'9000', funcInvoke:'style', imgId:'styleInputImg', imgId2:'styleInputImg2', responseId:responseContainerId});});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    styleGANContainer.appendChild(inputDiv);
    styleGANContainer.appendChild(outputDiv);
}

