export class Module {
    private _name: string;
    private _height: number;
    private _width: number ;
    private _depth: number;
    private _open: number;
    private _closed: number;
    private _saved: number;
    private _bed: boolean = false;
    private _sofa: boolean = false;
    private _desk: boolean = false;
    private _storage: boolean = false;
    private _width_options: { key: number, value: number; }[] = [];



    constructor(mod: any) {
        this._name = mod.naam;
        this._height = +mod.hoogte; 
        this._depth = +mod.diepte; 
        this._open = +mod.open;
        this._closed = +mod.dicht; 
        this._saved = +mod.besparing; 

        if (mod.zetel == 'true') {
            this._sofa = true;
        }

        if (mod.opkladbed == 'true' || mod.bed_bewegend == 'true') {
            this._bed = true;
        }

        if (mod.kast_met_zijschappen == 'true' || mod.kast == 'true' ||
            mod.kast_bewegend == 'true' || mod.tweede_kast_bewegend == 'true') {
            this._storage = true;
        }
        if (mod.bureau == 'true' || mod.bureau_bewegend == 'true') {
            this._desk = true;
        }

        this._width_options.push({ key: 140, value: +mod.breedte140 })
        this._width = +mod.breedte140 // the default is the smallest value
        this._width_options.push({ key: 160, value: +mod.breedte160 })
        this._width_options.push({ key: 180, value: +mod.breedte180 })
    }

    public get name(): string {
        return this._name;
    }
    public get height(): number {
        return this._height;
    }
    public get depth(): number {
        return this._depth;
    }
    public get open(): number {
        return this._open;
    }
    public get closed(): number {
        return this._closed;
    }
    public get saved(): number {
        return this._saved;
    }
    public get width(): number {
        return this._width
    }

    /**
    * set the correct width
    * @param {number} size
    */
    public set width_options(size: number) {
        if (size == 140 ||size === 160 || size || 180)
            this._width = this._width_options[size].value;
    }
    /**
    * Sees if the module contains these types
    * @param {boolean} bed
    * @param {boolean} desk
    * @param {boolean} sofa
    * @param {boolean} storage
    * @return {boolean} type
    */
    public type(bed: boolean, desk: boolean, sofa: boolean, storage: boolean) {
        return (this._bed == bed && this._desk == desk && this._sofa == sofa && this._storage == storage)
    }

    /**
    * Sees if the module would fit in the room
    * @param {number} height 
    * @param {number} depth 
    * @param {number} width 
    * @return {boolean} possible fit
    */
    public correct_size(height: number, depth: number, width: number) {
        return ((this._height < height) && (this._width < width) && (this._open < depth)) || ((this._height < height) && (this._width < depth) && (this._open < width))
    }
}
