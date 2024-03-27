import { parseCsvData } from "./read_file_csv";

const MIN_HEIGHT = 2.24;

export const height_check = (height: number) => {
    if (height < MIN_HEIGHT) {
        console.log("Kamer is niet hoog genoeg voor de module, minimuum hoogte: " + MIN_HEIGHT + " cm, jouw hoogte: " + height + " cm")
    } else {
        console.log("kamer van " + height + "cm is hoog genoeg");
    }

    try {
        const parsedData = parseCsvData();
        console.log(parsedData);
        console.log('test') // Do something with the parsed data
    } catch (error) {
        console.error('Error parsing CSV:', error);
    }
}