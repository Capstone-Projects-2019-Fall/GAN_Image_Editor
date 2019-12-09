"use strict";

function displayQualityGAN(responseContainerId) {
    var qualityGANContainer = document.getElementById("qualityGANDisplay");
    //qualityGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Input Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="qualityInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadQualityForm">
                                            <input id="qualityGANInput" class="button" type="file" name="file_name" size="50" accept="image/png" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;" />
                                        </form>

                                        <button id="qualitySubmitButton" style="display:none;">Submit</button>
    
                                        <button id="qualityInputButton" style="border-radius: 3px;">Upload Image</button>
                                        
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
    
                                        <div class="image fit">
                                                <img id="qualityOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="qualityRunButton" style="border-radius: 3px;">Run Trained Model</button>
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
    
                                        <div class="image fit">
                                                <img id="customQualityOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="customQualityRunButton" style="border-radius: 3px;">Run Custom Model</button>
                                </div>
                        </article>
                </div>
        </section>
    `;

    qualityGANContainer.innerHTML = display;
    
    document.getElementById("qualityGANInput").onchange = function(e) {
        document.getElementById("qualitySubmitButton").click();
    };
    
    document.getElementById("qualityInputButton").onclick = function() {
        document.getElementById("qualityGANInput").click();
    };
    
    function qualityRun(modelInt){
        var fileName = document.getElementById("qualityInputImg").src;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        
        
        runFlask({paramString: fileName, portNum: '8000', funcInvoke: 'quality', imgId: 'qualityInputImg', responseId:responseContainerId, modelType: modelInt});
    }
    
    document.getElementById("qualitySubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadQualityForm", "qualityInputImg");});
    document.getElementById("qualityRunButton").addEventListener('click', function(){qualityRun("0");});
    document.getElementById("customQualityRunButton").addEventListener('click', function(){qualityRun("1");});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    
    
    qualityGANContainer.appendChild(inputDiv);
    qualityGANContainer.appendChild(outputDiv);
}

