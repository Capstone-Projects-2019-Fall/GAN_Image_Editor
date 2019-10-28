"use strict";

function submitUpload(id, uploadFileId) {
    
    
    ajax2({url:"webAPIs/uploadPhoto2.jsp", successFn: success, fileId: uploadFileId, errorId: id});
 
    function success (response){
        
    }
}