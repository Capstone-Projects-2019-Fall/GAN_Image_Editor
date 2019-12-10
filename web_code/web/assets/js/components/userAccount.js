"use strict";

function userAccount(id) {
    
    var throwAway = document.createElement("div");
    ajax({url:"webAPIs/getProfileAPI.jsp", successFn:success, errorId:throwAway});
    
    function success(response) {
        
        if(response.toString().endsWith("No user logged in.")){ 
            alert("You must log in first!");
        }
        else{   //user is already logged in
            
            account.UI(id);
        }
    }
}

var account = {};

account.UI = function (id){
    var contentId = id;
    var accountContent = `
            <section id="one" style="padding: 4em 0 1em 0;">
                <div class="inner">
                        <header style="text-align:center;">
                                <h2>Account</h2>
                        </header>
                </div>
            </section>
    
            <section id="one" style="padding: 1em 0 0em 0; margin: 0px 5em 3em; border-radius: 10px; border: solid gray 4px; border-style: groove;">
                    
                    <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadAccountForm">
                        <input id="accountInput" class="button" type="file" name="file_name" accept="image/png, image/jpeg" size="50" style="display: none; width: 85%; padding: 0px; line-height: 22px; background-color: #f3f3f3; color: #5a5a5a !important;"/>
                    </form>

                    <button id="accountSubmitButton" style="display:none;">Submit</button>

                    <button id="accountInputButton" style="box-shadow: 2px 2px 5px black; border-radius: 3px; margin-left: 5%; margin-top: 4px;">Upload Image</button>
    
                    <div class="box alt">
                        <div class="row 50% uniform" id="userPictures">
                                
                        </div>
                    </div>
                    
                    <!--
                    <div class="inner" id="userPictures">
                    
                    </div>
                    -->
            </section>
    `;
    
    var accountElement = document.getElementById(contentId);
    
    
    if(accountElement){
        accountElement.innerHTML = accountContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function userAccount(id)");
        return;
    }
    
    document.getElementById("accountSubmitButton").addEventListener('click', function(){ajax_upload_form("uploadAccountForm");});
    
    document.getElementById("accountInput").onchange = function(e) {
        document.getElementById("accountSubmitButton").click();
    };
    
    document.getElementById("accountInputButton").onclick = function() {
        document.getElementById("accountInput").click();
    };

    
    
    update.userHasEnteredAccountPage();
    
    var picsContainer = document.getElementById("userPictures");
    
    ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
    
    function success2(response) {
        var stylePic1 = null;
        var stylePic2 = null;
        
        console.log("------------------------");
        console.log("success2 in userAccount.js");
        console.log(response);
        console.log("------------------------");
        
        var picsPerRow = 4;
        
        var tableContainer = document.createElement("div");
        tableContainer.setAttribute("style", "padding: 3%;");
        var table = document.createElement("table");
        table.setAttribute("style", "table-layout:fixed;");
        var tableBody = document.createElement("tbody");
        tableBody.setAttribute("style", "");
        //var row = document.createElement("tr");
        //row.setAttribute("style", "");
        var row = document.createElement("tr");
        
        //tableBody.appendChild(row);
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
        picsContainer.appendChild(tableContainer);
        
        for(var i = 0 ; i < response.imageList.length ; i++){
            var tableData = document.createElement("td");
            var imgCard = document.createElement("div");
            var imgContainer = document.createElement("span");
            var img = document.createElement("img");
            var imgPath = response.imageList[i].imagePath;
            
            var imgOptions = document.createElement("div");
            var optionFacial = document.createElement("a");
            var facialIcon = document.createElement("img");
            var optionStyle = document.createElement("a");
            var styleIcon = document.createElement("img");
            var optionQuality = document.createElement("a");
            var qualityIcon = document.createElement("img");
            var optionDownload = document.createElement("a");
            var downloadIcon = document.createElement("img");
            var optionDelete = document.createElement("a");
            var deleteIcon = document.createElement("img");
            
            var imgNaturalWidth = response.imageList[i].width;
            var imgNaturalHeight = response.imageList[i].height;
            
            if(isFirstImgOfRow(i)){
                row = document.createElement("tr");
                row.setAttribute("style", "border-color: white;");
                tableBody.appendChild(row);
            }
            
            tableData.setAttribute("style", " text-align:center; height: 450px; padding-top: 0px; padding-bottom: 0px;" + getColumnWidth());
            
            imgCard.setAttribute("style", "width: 80%; height: 80%; text-align: center; display:inline-block; height: 85%; max-height: 325px; box-shadow: 0px 0px 5px black; border-radius: 10px;");
            
            imgContainer.classList.add("image", "fit");
            imgContainer.setAttribute("style", "overflow: hidden; height: 86%; width: 100%; vertical-align: top; margin: 0%; display: inline-block; border-bottom: solid 1px #DCDCDC;");
            
            img.src = "./pics/test/" + imgPath;
            img.alt = "";
            img.id = "picId:" + response.imageList[i].imageId;
            
            img.setAttribute("style", "max-width: 100%; max-height: 100%; padding: 3%;");
            
            imgOptions.setAttribute("style", " width: 100%; height: 14%; padding: 3%;");
            
            
            //optionDelete.onclick = ;
            optionDelete.setAttribute("style", "float: right; height: 100%;");
            imgOptions.appendChild(optionDelete);
            imgOptions.appendChild(optionDownload);
            imgOptions.appendChild(optionQuality);
            imgOptions.appendChild(optionStyle);
            imgOptions.appendChild(optionFacial);
            
            deleteIcon.setAttribute("src", "./pics/icons/delete_can.png");
            deleteIcon.setAttribute("style", "cursor: pointer; height: 100%; float: right; margin: 0px 4px; padding: 1%;");
            optionDelete.appendChild(deleteIcon);
            optionDelete.addEventListener("click", deletePhoto);
            
            downloadIcon.setAttribute("src", "./pics/icons/download_icon.png");
            downloadIcon.setAttribute("style", "cursor: pointer; height: 100%; float: right; margin: 0px 4px; padding: 1%;");
            optionDownload.appendChild(downloadIcon);
            optionDownload.addEventListener("click", download);
            
            facialIcon.setAttribute("src", "./pics/icons/f_icon.png");
            facialIcon.setAttribute("style", "cursor: pointer; height: 100%; float: right; padding: 4%;");
            optionFacial.appendChild(facialIcon);
            optionFacial.addEventListener("click", picToFacial);
            
            styleIcon.setAttribute("src", "./pics/icons/s_icon.png");
            styleIcon.setAttribute("style", "cursor: pointer; height: 100%; float: right; padding: 4%;");
            optionStyle.appendChild(styleIcon);
            optionStyle.addEventListener("click", picToStyle);
            
            qualityIcon.setAttribute("src", "./pics/icons/q_icon.png");
            qualityIcon.setAttribute("style", "cursor: pointer; height: 100%; float: right; padding: 4%;");
            optionQuality.appendChild(qualityIcon);
            optionQuality.addEventListener("click", picToQuality);
            
            /*
            var testButton = document.createElement("button");
            testButton.innerHTML = "Delete Photo";
            testButton.addEventListener("click", ajax({url: "webAPIs/deleteImageAPI.jsp?deleteId=" + img.id.slice(6) , successFn: deletePhoto, errorId: id}));
            
            var breakLine = document.createElement("br");
            
            imgSetContainer.appendChild(img);
            imgSetContainer.appendChild(breakLine);
            imgSetContainer.appendChild(testButton);
            picsContainer.appendChild(imgSetContainer);
            */
           
           
            imgContainer.appendChild(img);
            imgCard.appendChild(imgContainer);
            imgCard.appendChild(imgOptions);
            tableData.appendChild(imgCard);
            row.appendChild(tableData);
            
            function deletePhoto(){
                var imageId = this.parentNode.parentNode.firstChild.firstChild.id.slice(6);
                ajax({url: "webAPIs/deleteImageAPI.jsp?deleteId=" + imageId , successFn: deletePhotoSuccess, errorId: id});
            
                function deletePhotoSuccess(){
                    document.getElementById("userPictures").innerHTML = ``;
                    ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
                }
            }
            
            function download(){
                var fullString = this.parentNode.parentNode.firstChild.firstChild.src.toString();
                var downloadElement = document.createElement("a");
                downloadElement.setAttribute("download", "");
                downloadElement.setAttribute("href", fullString);
                
                downloadElement.click();
            }
            
            function picToFacial(){
                var fullString = this.parentNode.parentNode.firstChild.firstChild.src.toString();
                var path = fullString.substr(fullString.indexOf("pics"));
                //console.log(fullString);
                //console.log(fullString.substr(fullString.indexOf("pics")));
                facialGANFromAccount("content", path);
            }
            
            function picToStyle(){
                var fullString = this.parentNode.parentNode.firstChild.firstChild.src.toString();
                var path = fullString.substr(fullString.indexOf("pics"));
                
                if(stylePic1){
                    if(stylePic1.includes(path)){
                        return;
                    }
                    else{
                        styleGANFromAccount("content", stylePic1, path);
                    }
                }
                else{
                    stylePic1 = path;
                }
                
            }
            
            function picToQuality(){
                var fullString = this.parentNode.parentNode.firstChild.firstChild.src.toString();
                var path = fullString.substr(fullString.indexOf("pics"));
                //console.log(fullString);
                //console.log(fullString.substr(fullString.indexOf("pics")));
                qualityGANFromAccount("content", path);
            }
            
        }
        
        function isFirstImgOfRow(index) {
            if(((index + (picsPerRow + 1)) % picsPerRow) === 1){
                return true;
            }
            return false;
        }

        function isLastImgOfRow(index){
            if(((index + (picsPerRow + 1)) % picsPerRow) === 0){
                return true;
            }
            return false;
        }
        
        function getColumnWidth(){
            var width = 100 / picsPerRow;
            return "width: " + Math.floor(width).toString() + "%;";
        }
    }

    
    
};
