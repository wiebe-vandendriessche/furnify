import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[] = []

export const check = (val: any) => {
let func = val.functionalities

    if (modules.length == 0) {
        get_modules();
    }
    let result: Module[] = [];
    //console.log(modules)
    //console.log(func)
    modules.forEach(mod => {
        if (mod.type(func.bed, func.desk, func.sofa, func.storagespace)) {
            result.push(mod)
        }
    })
    console.log(result)
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