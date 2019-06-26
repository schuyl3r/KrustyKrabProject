const uploadButton = document.querySelector('#import');
const cancelButton = document.querySelector('#cancelUpload');
const input = document.getElementById('selectFiles');

function goHome() {
	location.href = 'index.html';
}

function upload() {
	if (input.value != '') {
	} else {
		alert('No File Selected!');
	}
}

uploadButton.addEventListener('click', upload);
cancelButton.addEventListener('click', goHome);
