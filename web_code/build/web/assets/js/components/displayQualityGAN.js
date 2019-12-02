"use strict";

function displayQualityGAN(responseContainerId) {
    var qualityGANContainer = document.getElementById("qualityGANDisplay");
    //qualityGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article>
                                <div class="content">
                                        <header>
                                                <h3>Input Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="qualityInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <h3 style="text-align:center;">Upload an Image</h3>
                                        <div class="inner" style="display:inline-block;">
                                                <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadQualityForm">
                                                    <input class="button" type="file" name="file_name" size="50"/>
                                                    <!-- <input type="submit" value="upload"/> -->
                                                </form>
                                        </div>

                                        <button id="qualitySubmitButton" >Submit</button>
                                        
                                </div>
                        </article>
                        <article class="alt">
                                <div class="content">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="qualityOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="qualityRunButton" >Run Model</button>
                                </div>
                        </article>
                </div>
        </section>
    `;
    
    function qualityRun(){
        var fileName = document.getElementById("qualityInputImg").src;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        
        
        runFlask({paramString: fileName, portNum:'8000', funcInvoke:'quality', imgId:'qualityInputImg', responseId:responseContainerId});
    }
    
    qualityGANContainer.innerHTML = display;
    document.getElementById("qualitySubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadQualityForm", "qualityInputImg");});
    document.getElementById("qualityRunButton").addEventListener('click', function(){qualityRun();});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    
    
    qualityGANContainer.appendChild(inputDiv);
    qualityGANContainer.appendChild(outputDiv);
}

