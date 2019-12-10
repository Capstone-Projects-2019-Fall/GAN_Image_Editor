"use strict";

function displayQualityGAN(responseContainerId, picPathFromAccount) {
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
                                        <div class="image fit" style="text-align: center; margin-bottom: 8px;">
                                                <img style="display: inline-block; width: 80%;" id="qualityInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadQualityForm" style="display: none;">
                                            <input id="qualityGANInput" class="button" type="file" name="file_name" size="50" accept="image/png" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;" />
                                        </form>

                                        <button id="qualitySubmitButton" style="display:none;">Submit</button>
    
                                        <div id="qualityPicDesc" style="min-height: 15px;"></div>
                                        <button id="qualityInputButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Upload Image</button>
                                        
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
    
                                        <div class="image fit" style=" margin-bottom: 8px;">
                                                <img  id="qualityOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <div id="qualityRunOutputPicDesc" style="min-height: 15px;"></div>
                                        <button id="qualityRunButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Run Trained Model</button>
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
    
                                        <div class="image fit" style="margin-bottom: 8px;">
                                                <img id="customQualityOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <div id="qualityCustomRunOutputPicDesc" style="min-height: 15px;"></div>
                                        <button id="customQualityRunButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Run Custom Model</button>
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
    
    if(picPathFromAccount){
        document.getElementById("qualityInputImg").setAttribute("src", picPathFromAccount);
        
        /*
        var path1 = picPathAccount.substr(picPathFromAccount.indexOf("test/"));
        path1 = path1.substr(5);
        
        placeImageDimensions(path1, "qualityInputImg");
        */
    }
    
    function qualityRun(modelInt){
        var fileName = document.getElementById("qualityInputImg").src;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        
        if(modelInt.includes("0")){
            runFlask({picDescId: "qualityRunOutputPicDesc", paramString: fileName, portNum: '8000', funcInvoke: 'quality', imgId: 'qualityInputImg', responseId:responseContainerId, modelType: modelInt});
        }
        else{
            runFlask({picDescId: "qualityCustomRunOutputPicDesc", paramString: fileName, portNum: '8000', funcInvoke: 'quality', imgId: 'qualityInputImg', responseId:responseContainerId, modelType: modelInt});
        }
        
    }
    
    document.getElementById("qualitySubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadQualityForm", "qualityInputImg", "qualityPicDesc");});
    document.getElementById("qualityRunButton").addEventListener('click', function(){qualityRun("0");});
    document.getElementById("customQualityRunButton").addEventListener('click', function(){qualityRun("1");});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    
    
    qualityGANContainer.appendChild(inputDiv);
    qualityGANContainer.appendChild(outputDiv);
}

