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
            <section id="one">
                <div class="inner">
                        <header style="text-align:center;">
                                <h2>Account Page</h2>
                        </header>
                </div>
            </section>
    
            <section id="one" style="border-bottom: 5px solid #E5474B; border-top: 5px solid #E5474B;">
                    <h3>Stored Images</h3>
                    <div class="box alt">
                        <div class="row 50% uniform" id="userPictures">
                                
                        </div>
                    </div>
                    
                    <!--
                    <div class="inner" id="userPictures">
                    
                    </div>
                    -->
            </section>
    
            <section id="one" style="background-color:#f9d2d4">
                <h3 style="text-align:center;">Upload an Image</h3>
                <div class="inner" style="display:inline-block;">
                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data" id="uploadForm">
                            <input class="button" type="file" name="file_name" size="50"/>
                            <!-- <input type="submit" value="upload"/> -->
                        </form>
                </div>
    
                <button id="accountSubmitButton">Submit</button>
            </section>
    
    
    <!-- OLD WORKING FORM
            <section id="one">
                <h3>Upload an Image</h3>
                <div class="inner">
                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data">
                            <input type="file" name="file_name" size="50"/>
                            <input type="submit" value="upload"/>
                        </form>
                </div>
            </section>
    -->
    `;
    
    var accountElement = document.getElementById(contentId);
    
    if(accountElement){
        accountElement.innerHTML = accountContent;
    }
    else{
        console.log("Could not find element with id: '" + id + "' in function userAccount(id)");
        return;
    }
    
    document.getElementById("accountSubmitButton").addEventListener('click', function(){ajax_upload_form("uploadForm");});
    update.userHasEnteredAccountPage();
    
    var picsContainer = document.getElementById("userPictures");
    
    ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
    
    function success2(response) {
        
        console.log("------------------------");
        console.log("success2 in userAccount.js");
        console.log(response);
        console.log("------------------------");
        
        var table = document.createElement("table");
        table.setAttribute("style", "");
        var tableBody = document.createElement("tbody");
        tableBody.setAttribute("style", "");
        var row = document.createElement("tr");
        row.setAttribute("style", "");
        
        tableBody.appendChild(row);
        table.appendChild(tableBody);
        picsContainer.appendChild(table);
        
        for(var i = 0 ; i < response.imageList.length ; i++){
            var tableData = document.createElement("td");
            var imgCard = document.createElement("div");
            var imgContainer = document.createElement("span");
            var img = document.createElement("img");
            var imgPath = response.imageList[i].imagePath;
            
            var imgOptions = document.createElement("div");
            var optionChoices = document.createElement("a");
            var imgIcon = document.createElement("img");
            var optionFacial = document.createElement("a");
            var facialIcon = document.createElement("img");
            var optionStyle = document.createElement("a");
            var styleIcon = document.createElement("img");
            var optionQuality = document.createElement("a");
            var qualityIcon = document.createElement("img");
            var optionDelete = document.createElement("a");
            var deleteIcon = document.createElement("img");
            var imgNaturalWidth = response.imageList[i].width;
            var imgNaturalHeight = response.imageList[i].height;
            
            if(isFirstImgOfRow(i)){
                row = document.createElement("tr");
                row.setAttribute("style", "");
                tableBody.appendChild(row);
            }
            
            tableData.setAttribute("style", "border: green solid 1px; text-align:center; height: 450px;");
            
            imgCard.setAttribute("style", "width: 80%; height: 80%; text-align: center; display:inline-block; height: 85%; border: red solid 1px;");
            
            imgContainer.classList.add("image", "fit");
            imgContainer.setAttribute("style", "overflow: hidden; height: 80%; width: 100%; vertical-align: top; margin: 0%; display: inline-block; border: blue solid 1px;");
            
            img.src = "./pics/test/" + imgPath;
            img.alt = "";
            img.id = "picId:" + response.imageList[i].imageId;
            
            img.setAttribute("style", "max-width: 100%; max-height: 100%; padding: 3%;");
            
            imgOptions.setAttribute("style", "width: 100%; height: auto;");
            
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
            tableData.appendChild(imgCard);
            row.appendChild(tableData);
            
            function deletePhoto(){
                //ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
                ;
            }
            
            function isFirstImgOfRow(index) {
                if(((index + 4) % 3) === 1){
                    return true;
                }
                return false;
            }
            
            function isLastImgOfRow(index){
                if(((index + 4) % 3) === 0){
                    return true;
                }
                return false;
            }
        }
    }

    
    function success(response) {
        
        console.log("------------------------");
        console.log(response);
        console.log("------------------------");
        
        for(var i = 0 ; i < response.imageList.length ; i++){
            var imgSetContainer = document.createElement("div");
            imgSetContainer.setAttribute("style", "display:inlineBlock;");
            
            var img = response.imageList[i].imagePath;
            var picElement = document.createElement("img");
            
            
            picElement.src = "./pics/test/" + img;
            picElement.setAttribute("style", "width: 25%; padding: 3%;");
            picElement.id = "picId:" + response.imageList[i].imageId;
            
            var testButton = document.createElement("button");
            testButton.innerHTML = "Delete Photo";
            testButton.addEventListener("click", ajax({url: "webAPIs/deleteImageAPI.jsp?deleteId=" + picElement.id.slice(6) , successFn: deletePhoto, errorId: id}));
            
            var breakLine = document.createElement("br");
            
            imgSetContainer.appendChild(picElement);
            imgSetContainer.appendChild(breakLine);
            imgSetContainer.appendChild(testButton);
            picsContainer.appendChild(imgSetContainer);
            
            function deletePhoto(){
                
            }
        }
        
        /*
        if(response.toString().endsWith("No user logged in.")){ 
            alert("You must log in first!");
        }
        else{   //user is already logged in
            
            account.UI(id);
        }
        */
    }
};
