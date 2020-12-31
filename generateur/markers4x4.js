if(typeof padDigits === "undefined") {
    function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
}
// 0 = noir
var markers_opts = [[0,0,1,0], [0,0,1,1], [1,1,1,0], [1,0,1,1]];

function makeMarker(id,width,height) {
    var canvas = document.createElement('canvas');
    canvas.pad = 80;
    canvas.height = height + canvas.pad*2;
    canvas.width = width + canvas.pad*2;
    return drawMarker(canvas,id);
}

function drawMarker(canvas,id) {
    var val = padDigits(Number(id).toString(4),4);
    var rows = /(\d)(\d)(\d)(\d)/.exec(val).slice(1,5);
    var ctx = canvas.getContext('2d');
    var pad = canvas.pad || 80;
    var sw=(canvas.width - (pad*2))/6;
    var sh=(canvas.height - (pad*2))/6;

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.rect(0,0,canvas.height,canvas.width);
    ctx.stroke();
    ctx.fill();
    var blancs = 0;
    for(var h=0;h<6;h++) {
        for(var w=0;w<6;w++) {
            ctx.beginPath();
            if(w===0||h===0||h===5||w===5){
                ctx.fillStyle = 'black';
                ctx.strokeStyle = 'black';
            } else if(markers_opts[rows[h - 1]][w - 1] === 0) {
                ctx.fillStyle = 'black';
                ctx.strokeStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'white';
                blancs++;
            }
            ctx.rect(w*sw + canvas.pad,h*sh + canvas.pad,sw,sh);
            ctx.stroke();
            ctx.fill();
        }
    }
    return [canvas,blancs];
}

