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
                                <h2><u>Account Page</u></h2>
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
    

    document.getElementById(contentId).innerHTML = accountContent;    
    document.getElementById("accountSubmitButton").addEventListener('click', function(){ajax_upload_form("uploadForm");});
    update.userHasEnteredAccountPage();
    
    var picsContainer = document.getElementById("userPictures");
    
    ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
    
    function success2(response) {
        
        console.log("------------------------");
        console.log("success2 in userAccount.js");
        console.log(response);
        console.log("------------------------");
        
        for(var i = 0 ; i < response.imageList.length ; i++){
            var imgDivContainer = document.createElement("div");
            var imgSpanContainer = document.createElement("span");
            var img = document.createElement("img");
            var imgPath = response.imageList[i].imagePath;
            
            if(((i + 4) % 3) === 0){
                imgDivContainer.classList.add("4u$");
            }
            else{
                imgDivContainer.classList.add("4u");
            }
            
            imgSpanContainer.classList.add("image", "fit");
            
            img.src = "./pics/test/" + imgPath;
            img.alt = "";
            img.id = "picId:" + response.imageList[i].imageId;
            img.setAttribute("style", "maxWidth: 50px; padding: 3%;");
            
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
           
           imgSpanContainer.appendChild(img);
           imgDivContainer.appendChild(imgSpanContainer);
           picsContainer.appendChild(imgDivContainer);
            
            function deletePhoto(){
                //ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success2, errorId:"userPictures"});
                ;
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
