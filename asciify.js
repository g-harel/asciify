/*jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", function() {

    let gradient = [' ', '.', 'o', '#'];

    let width = 100,
        height = 100;

    let img = new Image();
    img.src = 'pic.png';

    let ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
        let display = '';
        average(ctx.getImageData(0, 0, width, height).data).forEach(function(val, index) {
            display += gradient[Math.round((1-val/255)*(gradient.length-1))];
            if ((index+1)%width === 0) {
                display += '\n';
            }
        });
        document.getElementById('container').innerHTML = display;
    };

    function average(data) {
        averages = [];
        for (let i = 0; i+3 < data.length; i += 4) {
            averages.push(data[i+3]?(data[i]+(data[i]+1)+(data[i]+2))/3-1:255);
        }
        return averages;
    }

    document.body.appendChild(ctx.canvas);

});
