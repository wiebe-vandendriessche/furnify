const MIN_HEIGHT = 2.2;

export const height_check = (height: number) => {
    if(height < MIN_HEIGHT){
        console.log("Kamer is niet hoog genoeg voor de module, minimuum hoogte: " + MIN_HEIGHT + " cm, jouw hoogte: "+ height +" cm")
    }else{
        console.log("kamer van " + height + "cm is hoog genoeg");
    }
    
}