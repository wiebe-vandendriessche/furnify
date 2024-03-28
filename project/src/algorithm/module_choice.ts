import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: String[] | undefined = undefined;

export const check = (height: number) => {
    
    if(modules == undefined){
        get_modules();
    }
}

const get_modules = () => {
    try {
        const parsedData = parseCsvData();
        console.log(parsedData);
        parsedData.then(e => modules = e)
    } catch (error) {
        console.error('Error parsing CSV:', error);
    }
}