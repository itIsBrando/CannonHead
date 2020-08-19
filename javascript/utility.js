function hasTouchScreen() {
    return window.location.href.indexOf("?touch") !== -1 ||window.location.href.indexOf("&touch") !== -1 || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
}


function drawDigit(digit, x, y) {
    let img = document.getElementById("font" + (digit % 10).toString());
    context.drawImage(img, x, y, 6, 10);
}


// change scaling
function initializeScaling() {
    let w = Math.floor(window.innerWidth / 128);
    let h = Math.floor(window.innerHeight / 128);
    xScale = yScale = Math.min(w, h);
    
    if(w > h) {
    	canvas.style.height = "100%";
    	canvas.style.width = "auto";
    } else {
    	canvas.style.width = "100%";
    	canvas.style.height = "auto";
    }
                    
    context.canvas.width = 128 * xScale;
    context.canvas.height= 128 * yScale;
    context.scale(xScale, yScale);

    if(inGame) {
        game.fullRedraw();
    }
    
		context.msImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

}


function limitInput(min, max) {
		let i = document.getElementById("maxScoreInput");
		i.value = Math.min(Math.max(Number(i.value), min), max).toString();
}

function copyText() {
    let element = document.createElement('textarea');
    let copyText = myID;
    console.log("Copy:"+copyText);

    element.style.position = "fixed";
    element.style.overflow = "hidden";
    document.body.appendChild(element);
    element.value = copyText;
    element.focus();
    element.select();
    
    document.execCommand("copy", true);

    // remove temporary DIV
    document.body.removeChild(element);
}