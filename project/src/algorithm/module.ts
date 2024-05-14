export class Module {
    private _name: string;
    private _height: number;
    private _width: number;
    private _depth: number;
    private _open: number;
    private _closed: number;
    private _saved: number;
    private _bed: boolean = false;
    private _sofa: boolean = false;
    private _desk: boolean = false;
    private _storage: boolean = false;
    private _width_options: { key: string, value: number; }[] = [];
    private _components: string[] = [];
    private _marge:number;

    constructor(mod: any, marge:number = 0.03) {
        this._marge = marge;
        this._name = mod.naam;
        this._height = +mod.hoogte / 1000;
        this._depth = +mod.diepte / 1000;
        this._open = +mod.open / 1000;
        this._closed = +mod.dicht / 1000;
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

        this._width_options.push({ key: "140", value: +mod.breedte140 / 1000 })
        this._width = +mod.breedte140 / 1000 // the default is the smallest value
        this._width_options.push({ key: "160", value: +mod.breedte160 / 1000 })
        this._width_options.push({ key: "180", value: +mod.breedte180 / 1000 })

        if (typeof mod == 'object' && mod != null) {
            Object.entries(mod).forEach(([key, value]) => {
                if (value == 'true') {
                    this._components.push(key);
                }
            });
        }
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

    public get components(): string[] {
        return this._components
    }

    /**
    * set the correct width
    * @param {string} size
    */
    public set width_options(size: string) {
        if (size == "140" || size == "160" || size == "180") {
            const option = this._width_options.find(option => option.key == size);
            if (option) {
                this._width = option.value;
            }
        }
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
    * Sees if the module contains the types if one can differ
    * @param {boolean} bed
    * @param {boolean} desk
    * @param {boolean} sofa
    * @param {boolean} storage
    * @return {boolean} softer type
    */
    public softer_type(bed: boolean, desk: boolean, sofa: boolean, storage: boolean) {
        return ((this._bed == bed && this._desk == desk && this._sofa == sofa) ||
            (this._bed == bed && this._desk == desk && this._storage == storage) ||
            (this._bed == bed && this._sofa == sofa && this._storage == storage) ||
            (this._desk == desk && this._sofa == sofa && this._storage == storage))
    }

    /**
    * Sees if the module would fit in the room if room is rectangle
    * @param {number} height in meters
    * @param {number} length in meters
    * @param {number} width in meters
    * @return {boolean} possible fit
    */
    public correct_size(height: number, length: number, width: number) {
        if(this._components.length >= 2)
            return ((this._height < height) && (this._width < width) && ((this._open + this._marge)< length)) || ((this._height < height) && (this._width < length) && ((this._open + this._marge) < width))
        return ((this._height < height) && ((this._width + this._marge)< width) && (this._open < length)) || ((this._height < height) && ((this._width + this._marge) < length) && (this._open < width));
    }

    /**
    * Sees if the module would fit in the room if room is other
    * @param {number} side meters
    * @return {boolean} possible fit
    */
    public correct_side(side: number) {
        if(this._components.length >= 2)
            return (((this._open + this._marge) < side)||(this._width < side))
        return ((this._open < side)||((this._width + this._marge) < side))
    }


}
