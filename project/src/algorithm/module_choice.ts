import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[] = []

export const check = (val: any, varia: any, get2D: any) => {
    let func = val.functionalities
    let dim = val.dimensions

    console.log("ALGORITHM: ")
    console.log(val.functionalities)

    //make sure to fill the modules
    if (modules.length == 0) {
        get_modules();
    }

    // change the size of the modules if bed is selected
    if (func.bed == true) {
        modules.forEach(mod => { mod.width_options = varia.size })
    }
    //if bed is not selected make sure to return the smallest value
    else {
        modules.forEach(mod => { mod.width_options = "140" })
    }

    //check if the exact combination is possible
    let result: Module[] = [];
    console.log("ALGORITHM: ")
    console.log(modules)
    modules.forEach(mod => {
        if (mod.type(func.bed, func.office_space, func.sofa, func.storage_space)) {
            result.push(mod)
        }
    })
    //If we could not find any combination, we will try to find options where 1 is not equal and the others are
    if (result.length == 0) {
        console.log("ALGORITHM: " + "combination is not possible, looking for a softer one")
        modules.forEach(mod => {
            if (mod.softer_type(func.bed, func.office_space, func.sofa, func.storage_space)) {
                result.push(mod)
            }
        })
        //still not possible send message
        if (result.length == 0) {
            console.log("ALGORITHM: " + "softer combinations not found, please change the demands")
            return
        }
    }


    if (val.rectangular) {
        // check size is correct
        let result_size: Module[] = [];
        result.forEach(mod => {
            if (mod.correct_size(dim.height, dim.length, dim.width)) {
                result_size.push(mod)
            }
        })
        if (result_size.length == 0) {
            console.log("ALGORITHM: " + "Room is not big enough for the combination")
        }
        result = result_size
        console.log("ALGORITHM: ")
    }
    else {
        let sides2D = get2D.lines;
        console.log(sides2D)
        if (sides2D.length!= 0) {
            let sides: number[] = []
            let result_size: Module[] = [];
            sides2D.forEach(side => { sides.push(side.getLength()) })
            sides.sort().reverse()
            result.forEach(mod => {
                if (mod.correct_side(sides[0])) {
                    result_size.push(mod)
                }
            })
            if (result_size.length == 0) {
                console.log("ALGORITHM: " + "Room is not big enough for the combination")
            }
            result = result_size
        }
        else{
            console.log("ALGORITHM: " + "No points given")
        }

    }

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