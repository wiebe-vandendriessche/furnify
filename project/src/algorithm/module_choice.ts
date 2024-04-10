import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[] = []

export const check = (val: any) => {
    let func = val.functionalities
    let dim = val.dimensions

    if (modules.length == 0) {
        get_modules();
    }

    //check if the exact combination is possible
    let result_type: Module[] = [];
    modules.forEach(mod => {
        if (mod.type(func.bed, func.desk, func.sofa, func.storagespace)) {
            result_type.push(mod)
        }
    })
    //maybe set a second test if the result is empty

    // check size is correct
    let result_size: Module[] = [];
    result_type.forEach(mod =>{
        if(mod.correct_size(dim.height, dim.length, dim.width)){
            result_size.push(mod)
        }
    })
    console.log(result_size)
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