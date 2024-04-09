import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[]= []

export const check = () => {

    if(modules.length == 0){
        get_modules();
    }
    console.log(modules)
}

const get_modules = () => {
    try {
        const parsedData = parseCsvData();
        console.log(parsedData);
        parsedData.then(e => e.forEach(ev => modules.push(new Module(ev))))
    } catch (error) {
        console.error('Error parsing CSV:', error);
    }
}