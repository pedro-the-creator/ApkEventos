import Horario from "./Horario";


export class evento{


    private _id! : string;
    private _nome : string;
    private _dia : number;
    private _mes : number;
    private _ano : number;
    private _descricao : string;
    private _horario : Horario;
    private _downloadURL: any;


    constructor(nome: string, dia: number, mes: number, ano: number, descricao: string, horario : Horario){
        this._nome = nome;
        this._dia = dia;
        this._mes = mes;
        this._ano = ano;
        this._descricao = descricao;
        this._horario = horario;


    }

    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }


    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
        /**
     * Getter horario
     * @return {Horario}
     */
	public get horario(): Horario {
		return this._horario;
	}

    /**
     * Setter horario
     * @param {Horario} value
     */
	public set horario(value: Horario) {
		this._horario = value;
	}
    
        /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Getter dia
     * @return {number}
     */
	public get dia(): number {
		return this._dia;
	}

    /**
     * Getter mes
     * @return {number}
     */
	public get mes(): number {
		return this._mes;
	}

    /**
     * Getter ano
     * @return {number}
     */
	public get ano(): number {
		return this._ano;
	}

    /**
     * Getter descricao
     * @return {string}
     */
	public get descricao(): string {
		return this._descricao;
	}

    /**
     * Setter nome
     * @param {string} value
     */
	public set nome(value: string) {
		this._nome = value;
	}


    /**
     * Setter dia
     * @param {number} value
     */
	public set dia(value: number) {
		this._dia = value;
	}

    /**
     * Setter mes
     * @param {number} value
     */
	public set mes(value: number) {
		this._mes = value;
	}

    /**
     * Setter ano
     * @param {number} value
     */
	public set ano(value: number) {
		this._ano = value;
	}

    /**
     * Setter descricao
     * @param {string} value
     */
	public set descricao(value: string) {
		this._descricao = value;
	}
}

