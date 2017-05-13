import {AL} from './AudioLayer';
class Analyzer{
    constructor(){
        this.translateWaveX = 0;
        this.ctx = null;
        this.canvas = null;
        this.img = null;
        this.animateWaveform = () => {
            if(this.ctx != null){
                this.translateWaveX = this.translateWaveX + 1;
                let translationX = this.translateWaveX + this.canvas.width/2

                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.img,-translationX,0,this.img.width,150);
                this.ctx.beginPath();
                this.ctx.moveTo(this.canvas.width/2,0);
                this.ctx.lineTo(this.canvas.width/2,this.canvas.height);
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle="#8cff72";
                this.ctx.stroke();
                console.log("wowowwo");
                requestAnimationFrame(this.animateWaveform);
            }
        }
    }

    initAnimation(canvas,ctx,img){
        this.ctx = ctx;
        this.canvas = canvas;
        this.img = img;

        requestAnimationFrame(this.animateWaveform);
        //let transX = canvas.width/2 + this.translateWaveX;
    };
}
export let AN = new Analyzer();
