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
    
            <section id="one">
                    <h3>Stored Images</h3>
                    <div class="inner" id="userPictures">
                    
                    </div>
            </section>
    
            <section id="one">
                <h3>Upload an Image</h3>
                <div class="inner">
                        <form method="post" action="webAPIs/uploadPhoto.jsp" encType="multipart/form-data">
                            <input type="file" name="file_name" size="50"/>
                            <input type="submit" value="upload"/>
                        </form>
                </div>
            </section>
    
    <!--
            <section id="one">
                <h3>Upload an Image2</h3>
                <div class="inner">
                        <input type="file" name="file_name" size="50" id="fileSubmit"/>
                        <input type="submit" value="upload" onclick="submitUpload(" + id + ", fileSubmit)"/>
                </div>
            </section>
    -->
    `;
    

    document.getElementById(contentId).innerHTML = accountContent;
    
    
    var picsContainer = document.getElementById("userPictures");
    //pics.innerHTML = "Test";
    
    ajax({url:"webAPIs/getUserImageFileNames.jsp", successFn:success, errorId:"userPictures"});
    
    function success(response) {
        
        console.log("------------------------");
        console.log(response);
        console.log("------------------------");
        
        for(var i = 0 ; i < response.imageList.length ; i++){
            var img = response.imageList[i].imagePath;
            var picElement = document.createElement("img");
            
            picElement.src = "./pics/test/" + img;
            picElement.setAttribute("style", "width: 25%; padding: 3%;");
            
            picsContainer.appendChild(picElement);
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
