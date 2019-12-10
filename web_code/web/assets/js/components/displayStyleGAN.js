"use strict";

function displayStyleGAN(responseContainerId, firstPicPathFromAccount, secondPicPathFromAccount) {
    var styleGANContainer = document.getElementById("styleGANDisplay");
    //styleGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article style="padding: 0% 5%">
                                <div class="content ganModelImgContainer" style="white-space: nowrap;">
                                        <header>
                                                <h3>Source Image</h3>
                                        </header>
                                        <div class="image fit" style="margin-bottom: 8px;">
                                                <img id="styleInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadStyleForm" style="display: none;">
                                            <input id="styleGANInputSource" class="button" type="file" name="file_name" size="50" accept="image/png, image/jpeg" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;" />
                                        </form>

                                        <button id="styleSubmitButton" style="display:none;">Submit</button>
                                        <div id="stylePic1Desc" style="min-height: 15px;"></div>
                                        <button id="styleInputButton1" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Upload Image</button>
                                        
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer" style="white-space: nowrap;">
                                        <header>
                                                <h3>Target Image</h3>
                                        </header>
                                        <div class="image fit" style="margin-bottom: 8px;">
                                                <img id="styleInputImg2" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadStyleForm2" style="display: none;">
                                            <input id="styleGANInputTarget" class="button" type="file" name="file_name" size="50" accept="image/png, image/jpeg" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;" />
                                        </form>

                                        <button id="styleSubmitButton2" style="display:none;">Submit</button>
                                        
                                        <div id="stylePic2Desc" style="min-height: 15px;"></div>
                                        <button id="styleInputButton2" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Upload Image</button>
                                        
                                </div>
                        </article>
    
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer" style="white-space: nowrap;">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit" style="margin-bottom: 8px;">
                                                <img id="styleOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <div id="styleRunOutputPicDesc" style="min-height: 15px;"></div>
                                        <button id="styleRunButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Run Trained Model</button>
                                </div>
                        </article>
    
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer" style="white-space: nowrap;">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit" style="margin-bottom: 8px;">
                                                <img id="customStyleOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <div id="styleCustomRunOutputPicDesc" style="min-height: 15px;"></div>
                                        <button id="customStyleRunButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px;">Run Custom Model</button>
                                </div>
                        </article>
                </div>
        </section>
    `;
    
    styleGANContainer.innerHTML = display;
    
    document.getElementById("styleGANInputSource").onchange = function(e) {
        document.getElementById("styleSubmitButton").click();
    };
    
    document.getElementById("styleGANInputTarget").onchange = function(e) {
        document.getElementById("styleSubmitButton2").click();
    };
    
    document.getElementById("styleInputButton1").onclick = function() {
        document.getElementById("styleGANInputSource").click();
    };
    
    document.getElementById("styleInputButton2").onclick = function() {
        document.getElementById("styleGANInputTarget").click();
    };
    
    if(firstPicPathFromAccount && secondPicPathFromAccount){
        document.getElementById("styleInputImg").setAttribute("src", firstPicPathFromAccount);
        document.getElementById("styleInputImg2").setAttribute("src", secondPicPathFromAccount);
        /*
        var path1 = firstPicPathFromAccount.substr(firstPicPathFromAccount.indexOf("test/"));
        path1 = path1.substr(5);
        var path2 = secondPicPathFromAccount.substr(secondPicPathFromAccount.indexOf("test/"));
        path1 = path1.substr(5);
        
        placeImageDimensions(path1, "styleInputImg");
        placeImageDimensions(path2, "styleInputImg2");
        */
    }
    
    document.getElementById("styleSubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadStyleForm", "styleInputImg", "stylePic1Desc");});
    document.getElementById("styleSubmitButton2").addEventListener('click', function(){ajax_upload_form_non_user("uploadStyleForm2", "styleInputImg2", "stylePic2Desc");});
    document.getElementById("styleRunButton").addEventListener('click', function(){runFlask({picDescId: "styleRunOutputPicDesc", portNum:'9000', funcInvoke:'style', imgId:'styleInputImg', imgId2:'styleInputImg2', responseId:responseContainerId, modelType: '0'});});
    document.getElementById("customStyleRunButton").addEventListener('click', function(){runFlask({picDescId: "styleCustomRunOutputPicDesc", portNum:'9000', funcInvoke:'style', imgId:'styleInputImg', imgId2:'styleInputImg2', responseId:responseContainerId, modelType: '1'});});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    styleGANContainer.appendChild(inputDiv);
    styleGANContainer.appendChild(outputDiv);
}

