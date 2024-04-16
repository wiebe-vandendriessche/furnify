import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[] = []

export const check = (val: any) => {
    let func = val.functionalities
    let dim = val.dimensions
    console.log("ALGORITHM: ")
    console.log(val.functionalities)

    if (modules.length == 0) {
        get_modules();
    }

    //check if the exact combination is possible
    let result_type: Module[] = [];
    console.log("ALGORITHM: ")
    console.log(modules)
    modules.forEach(mod => {
        if (mod.type(func.bed, func.office_space, func.sofa, func.storage_space)) {
            result_type.push(mod)
        }
    }) 
    if(result_type.length == 0){
        console.log("ALGORITHM: " + "combination is not possible, looking for a softer one")
        modules.forEach(mod => {
            if (mod.softer_type(func.bed, func.office_space, func.sofa, func.storage_space)) {
                result_type.push(mod)
            }
        })
        if( result_type.length == 0){
            console.log("ALGORITHM: " + "softer combinations not found, please change the demands")
            return
        }
    }
    

    // check size is correct
    let result_size: Module[] = [];
    result_type.forEach(mod =>{
        if(mod.correct_size(dim.height, dim.length, dim.width)){
            result_size.push(mod)
        }
    })
    if( result_size.length == 0){
        console.log("ALGORITHM: " + "Room is not big enough for the combination")
    }
    console.log("ALGORITHM: ")
    console.log(result_size)
}

const get_modules = () => {
    try {
        const parsedData = parseCsvData();
        parsedData.then(e => e.forEach(ev => modules.push(new Module(ev))))
    } catch (error) {
        console.log("ALGORITHM: ")
        console.error('Error parsing CSV:', error);
    }
}