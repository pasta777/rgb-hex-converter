// RGB/HEX Convertor

const hexCheck = color => {
    if(color.includes('#')) {
        const reqHex = /[0-9A-Fa-f]{6}/g;
        let withoutHash = color.replace('#', '');
        if(reqHex.test(withoutHash)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const colorType = color => {
    if(typeof color == 'object' && color[0] <= 255 && color[1] <= 255 && color[2] <= 255 && color[0] >= 0 && color[1] >= 0 && color[2] >= 0) {
        return 'rgb';
    } else if(typeof color == 'string' && hexCheck(color) && color.length === 7) {
        return 'hex';
    } else {
        return null;
    }
}

let backgroundColor = document.querySelector("#background");

const converter = color => {
    if(colorType(color) == 'rgb') {
        let hash = '#';
        let red = color[0].toString(16);
        if(red.length === 1) {
            red = `0${red}`;
        }
        let green = color[1].toString(16);
        if(green.length === 1) {
            green = `0${green}`;
        }
        let blue = color[2].toString(16);
        if(blue.length === 1) {
            blue = `0${blue}`;
        }
        let newColor = `${hash}${red}${green}${blue}`;
        return newColor;
    } else if(colorType(color) == 'hex') {
        let withoutHash = color.replace('#', '');
        let redStr = withoutHash.substring(0,2);
        let red = parseInt(redStr, 16);
        let greenStr = withoutHash.substring(2,4);
        let green = parseInt(greenStr, 16);
        let blueStr = withoutHash.substring(4,6);
        let blue = parseInt(blueStr, 16);
        let newColor = [red, green, blue];
        return newColor;
    } else {
        backgroundColor.style.background = '#000000';
        return `This is not a color`;
    }
}

const convertButton = document.querySelector("#convertButton");
const exportColor = document.querySelector("#exportColor");

convertButton.addEventListener('click', () => {
    const inputColor = document.querySelector("#inputColor").value;
    let newInputColor = inputColor.replace('(', '');
    newInputColor = newInputColor.replace(')', '');

    let redColor;
    let greenColor;
    let blueColor;
    let bigColor;

    if (newInputColor.includes(',')) {
        redColor = parseInt(newInputColor.split(',', 3)[0].trim());
        greenColor = parseInt(newInputColor.split(',', 3)[1].trim());
        blueColor = parseInt(newInputColor.split(',', 3)[2].trim());
        bigColor = [redColor, greenColor, blueColor];
        backgroundColor.style.background = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    } else {
        bigColor = inputColor;
        backgroundColor.style.background = `${inputColor}`;
    }

    exportColor.innerHTML = converter(bigColor);
    
    
});
