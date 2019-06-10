const uploadButton = document.querySelector('#uploadFile');
const cancelButton =document.querySelector('#cancelUpload');
const input = document.getElementById("fileInput");

function goHome(){
    location.href = "index.html";
}

function upload(){
    if(input.value != ""){
        alert("File Uploaded!");
    } else {
        alert("No File Selected!");
    }
}

cancelButton.onclick = goHome;
uploadButton.onclick = upload;