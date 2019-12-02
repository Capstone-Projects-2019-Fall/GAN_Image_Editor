"use strict";

function displayFacialGAN(responseContainerId) {
    var facialGANContainer = document.getElementById("facialGANDisplay");
    //facialGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article>
                                <div class="content">
                                        <header>
                                                <h3>Input Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="facialInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
                                        
                                        <h3 style="text-align:center;">Upload an Image</h3>
                                        <div class="inner" style="display:inline-block;">
                                                <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadFacialForm">
                                                    <input class="button" type="file" name="file_name" size="50"/>
                                                    <!-- <input type="submit" value="upload"/> -->
                                                </form>
                                        </div>

                                        <button id="facialSubmitButton" >Submit</button>
                                        
                                </div>
                        </article>
                        <article class="alt">
                                <div class="content">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="facialOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="qualityRunButton" >Run Model</button>
                                </div>
                        </article>
                </div>
        </section>
        <div>
            <span>
                <span>
                    Select the attribute you want to change:
                    <select id="attributeToChange" style="width: 100px">
                        <option value="bald">Bald</option>
                        <option value="bangs">Bangs</option>
                        <option value="blackhair">Black Hair</option>
                        <option value="blondhair">Blond Hair</option>
                        <option value="brownhair">Brown Hair</option>
                        <option value="bushyeyebrows">Bushy Eyebrows</option>
                        <option value="eyeglasses">Eyeglasses</option>
                        <option value="male">Male</option>
                        <option value="mouthslightlyopen">Mouth Slightly Open</option>
                        <option value="mustache">Mustache</option>
                        <option value="nobeard">No Beard</option>
                        <option value="paleskin">Pale Skin</option>
                        <option value="young">Young</option>
                    </select>
                </span>
                <span>
                    Select the intensity of the attribute you want to change:
                    <select id="attributeIntensity" style="width: 100px">
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                        <option value="six">6</option>
                        <option value="seven">7</option>
                        <option value="eight">8</option>
                        <option value="nine">9</option>
                        <option value="ten">10</option>
                    </select>
                </span>
    
                
                <span>
                <br>
                <br>
                Describe the attributes of your input image:
                </span>
                
                
                <span>
                    Bald:
                    <select id="attributeBald" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Bangs:
                    <select id="attributeBangs" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Black Hair:
                    <select id="attributeBlackHair" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Blond Hair:
                    <select id="attributeBlondHair" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Brown Hair:
                    <select id="attributeBrownHair" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Bushy Eyebrows:
                    <select id="attributeBushyEyebrows" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Eyeglasses:
                    <select id="attributeEyeglasses" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Male:
                    <select id="attributeMale" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Mouth Slightly Open:
                    <select id="attributeMouthSlightlyOpen" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Mustache:
                    <select id="attributeMustache" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    No Beard:
                    <select id="attributeNoBeard" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Pale Skin:
                    <select id="attributePaleSkin" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
                <span>
                    Young:
                    <select id="attributeYoung" style="width: 100px">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </span>
            </span>
        </div>
    `;
    
    facialGANContainer.innerHTML = display;
    document.getElementById("facialSubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadFacialForm", "facialInputImg");});
    
    
    
    function facialRun(){
        var v1 = document.getElementById("attributeToChange").value;
        var v2 = document.getElementById("attributeIntensity").value;
        var v3 = document.getElementById("attributeBald").value;
        var v4 = document.getElementById("attributeBangs").value;
        var v5 = document.getElementById("attributeBlackHair").value;
        var v6 = document.getElementById("attributeBlondHair").value;
        var v7 = document.getElementById("attributeBrownHair").value;
        var v8 = document.getElementById("attributeBushyEyebrows").value;
        var v9 = document.getElementById("attributeEyeglasses").value;
        var v10 = document.getElementById("attributeMale").value;
        var v11 = document.getElementById("attributeMouthSlightlyOpen").value;
        var v12 = document.getElementById("attributeMustache").value;
        var v13 = document.getElementById("attributeNoBeard").value;
        var v14 = document.getElementById("attributePaleSkin").value;
        var v15 = document.getElementById("attributeYoung").value;
        
        var fileName = document.getElementById("facialInputImg").src;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        
        var paramStringToSend = fileName + "/";
        
        paramStringToSend += getParamString(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15);
        
        runFlask({paramString: paramStringToSend, portNum:'7010', funcInvoke:'facial', imgId:'facialInputImg', responseId:responseContainerId});
    }
    
    document.getElementById("qualityRunButton").addEventListener('click', function(){facialRun();});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    function getParamString(toChange, intensity, bald, bangs, blackHair, blondHair, brownHair, bushyEyebrows, eyeGlasses, male, mouthSlightlyOpen, mustache, noBeard, paleSkin, young) {
        var returnString = "";
        
        if(toChange.includes("bald")){
            returnString += "Bald";
        }
        else if(toChange.includes("bangs")){
            returnString += "Bangs";
        }
        else if(toChange.includes("blackhair")){
            returnString += "Black_Hair";
        }
        else if(toChange.includes("blondhair")){
            returnString += "Blond_Hair";
        }
        else if(toChange.includes("brownhair")){
            returnString += "Brown_Hair";
        }
        else if(toChange.includes("bushyeyebrows")){
            returnString += "Bushy_Eyebrows";
        }
        else if(toChange.includes("eyeglasses")){
            returnString += "Eyeglasses";
        }
        else if(toChange.includes("male")){
            returnString += "Male";
        }
        else if(toChange.includes("mouthslightlyopen")){
            returnString += "Mouth_Slightly_Open";
        }
        else if(toChange.includes("mustache")){
            returnString += "Mustache";
        }
        else if(toChange.includes("nobeard")){
            returnString += "No_Beard";
        }
        else if(toChange.includes("paleskin")){
            returnString += "Pale_Skin";
        }
        else if(toChange.includes("young")){
            returnString += "Young";
        }
        
        returnString += "+";
        
        
        if(intensity.includes("one")){
            returnString += "1";
        }
        else if(intensity.includes("two")){
            returnString += "2";
        }
        else if(intensity.includes("three")){
            returnString += "3";
        }
        else if(intensity.includes("four")){
            returnString += "4";
        }
        else if(intensity.includes("five")){
            returnString += "5";
        }
        else if(intensity.includes("six")){
            returnString += "6";
        }
        else if(intensity.includes("seven")){
            returnString += "7";
        }
        else if(intensity.includes("eight")){
            returnString += "8";
        }
        else if(intensity.includes("nine")){
            returnString += "9";
        }
        else if(intensity.includes("ten")){
            returnString += "10";
        }
        
        returnString += "+";
        
        
        if(bald.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(bangs.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(blackHair.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(blondHair.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(brownHair.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(bushyEyebrows.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(eyeGlasses.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(male.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(mouthSlightlyOpen.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(mustache.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(noBeard.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(paleSkin.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(young.includes("yes")){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        myconsole.log("getParamString return string: ", returnString);
        return returnString;
    }

    
    facialGANContainer.appendChild(inputDiv);
    facialGANContainer.appendChild(outputDiv);
}

