"use strict";

function displayFacialGAN(responseContainerId) {
    var facialGANContainer = document.getElementById("facialGANDisplay");
    //facialGANContainer.setAttribute("style", "width: 95%; margin: 0 auto;");
    
    var display = `
        <section id="two">
                <div class="inner">
                        <article style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Input Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="facialInputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>                                       
                                    
                                
                                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadFacialForm">
                                            <input id="facialGANInput" class="button" type="file" name="file_name" accept="image/png, image/jpeg" size="50" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;"/>
                                        </form>

                                        <button id="facialSubmitButton" style="display:none;">Submit</button>
    
                                        <button id="facialInputButton" style="border-radius: 3px;">Upload Image</button>
                                        
                                </div>
                        </article >
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="facialOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="facialRunButton" style="border-radius: 3px;">Run Trained Model</button>
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div class="content ganModelImgContainer">
                                        <header>
                                                <h3>Output Image</h3>
                                        </header>
                                        <div class="image fit">
                                                <img id="customFacialOutputImg" src="pics/test/image-placeholder.png" alt="" />
                                        </div>
    
                                        <button id="customFacialRunButton" style="border-radius: 3px;">Run Custom Model</button>
                                </div>
                        </article>
                </div>
        </section>
    
        <section id="two" style="padding: 1% 0%">
                <div class="inner">
                        <article style="padding: 0% 5%">
                                <div class="content">
                                    <div style="text-align: center;">
                                        <strong>Describe the attributes of your input image:</strong>
                                    </div>
    
                                    <span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Bald?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBaldYes" type="radio" name="bald" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBaldNo" type="radio" name="bald" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Bangs?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBangsYes" type="radio" name="bangs" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBangsNo" type="radio" name="bangs" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Black Hair?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBlackHairYes" type="radio" name="blackHair" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBlackHairNo" type="radio" name="blackHair" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Blond Hair?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBlondHairYes" type="radio" name="blondHair" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBlondHairNo" type="radio" name="blondHair" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Brown Hair?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBrownHairYes" type="radio" name="brownHair" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBrownHairNo" type="radio" name="brownHair" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Bushy Eyebrows?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBushyEyebrowsYes" type="radio" name="eyebrows" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeBushyEyebrowsNo" type="radio" name="eyebrows" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Eyeglasses?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeEyeglassesYes" type="radio" name="eyeglasses" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeEyeglassesNo" type="radio" name="eyeglasses" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Male?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMaleYes" type="radio" name="male" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMaleYesNo" type="radio" name="male" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Mouth Slightly Open?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMouthSlightlyOpenYes" type="radio" name="mouth" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMouthSlightlyOpenNo" type="radio" name="mouth" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Mustache?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMustacheYes" type="radio" name="mustache" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeMustacheNo" type="radio" name="mustache" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>No Beard?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeNoBeardYes" type="radio" name="beard" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeNoBeardNo" type="radio" name="beard" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Pale Skin?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributePaleSkinYes" type="radio" name="pale" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributePaleSkinNo" type="radio" name="pale" value="no"></td>
                                                </tr>
                                                <tr>
                                                    <td>Young?</td>
                                                    <td>Yes</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeYoungYes" type="radio" name="young" value="yes" checked></td>
                                                    <td>No</td>
                                                    <td><input style="display: inline-block; float: none; opacity: 100; " id="attributeYoungNo" type="radio" name="young" value="no"></td>
                                                </tr>
                                            </tbody>
                                        </table>
    
                                        <br>
                                    </span>
                                </div>
                        </article>
                        <article class="alt" style="padding: 0% 5%">
                                <div style="text-align: center;">
                                    <strong>What do you want to change?</strong>
                                </div>
                                <div class="content">
                                
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Select an attribute you want to change:</td>
                                                <td style="padding: 0% 0%; vertical-align: middle;">
                                                    <select id="attributeToChange" style="float: right; display: inline-block; width: 100px">
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
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Select the intensity of the change:</td>
                                                <td style="padding: 0% 0%; vertical-align: middle;">
                                                    <select id="attributeIntensity" style="float: right; display: inline-block; width: 100px">
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
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
    
    <!--
                                    <span>
                                        Select an attribute you want to change:
                                    </span>
                                    &nbsp
                                    <select id="attributeToChange" style="float: right; display: inline-block; width: 100px">
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
    
                                    <br>
                                    
                                    <span>
                                        Select the intensity of the change:
                                    </span>
                                    &nbsp
                                    <select id="attributeIntensity" style="float: right; display: inline-block; width: 100px">
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
    -->
                                </div>
                        </article >
                </div>
        </section>
   
    `;
    
    facialGANContainer.innerHTML = display;
    
    document.getElementById("facialSubmitButton").addEventListener('click', function(){ajax_upload_form_non_user("uploadFacialForm", "facialInputImg");});
    
    document.getElementById("facialGANInput").onchange = function(e) {
        document.getElementById("facialSubmitButton").click();
    };
    
    document.getElementById("facialInputButton").onclick = function() {
        document.getElementById("facialGANInput").click();
    };

    
    function facialRun(modelInt){
        
        var fileName = document.getElementById("facialInputImg").src;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        
        var paramStringToSend = fileName + "/";
        
        paramStringToSend += getParamString();
        
        runFlask({paramString: paramStringToSend, portNum: '7010', funcInvoke: 'facial', imgId: 'facialInputImg', responseId:responseContainerId, modelType: modelInt});
    }
    
    document.getElementById("facialRunButton").addEventListener('click', function(){facialRun("0");});
    document.getElementById("customFacialRunButton").addEventListener('click', function(){facialRun("1");});
    
    var inputDiv = document.createElement("div");
    var outputDiv = document.createElement("div");
    
    function getParamString( male, mouthSlightlyOpen, mustache, noBeard, paleSkin, young) {
        var returnString = "";
        
        var toChange = document.getElementById("attributeToChange").value;
        var intensity = document.getElementById("attributeIntensity").value;
        
        
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
            returnString += "2";    //1 is currently not working
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
        
        
        if(document.getElementById("attributeBaldYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeBangsYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeBlackHairYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeBlondHairYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeBrownHairYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeBushyEyebrowsYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeEyeglassesYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeMaleYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeMouthSlightlyOpenYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeMustacheYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeNoBeardYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributePaleSkinYes").checked){
            returnString += "1";
        }
        else{
            returnString += "0";
        }
        
        if(document.getElementById("attributeYoungYes").checked){
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

