import { ESentimento } from "./enums.js";

export default class LogModel {
    Id: number;
    DataLog: string;
    Ordem: number;
    TituloLog: string;
    ConteudoLog: string;
    Sentimento: ESentimento = ESentimento.Neutro;
    DataAtualizacao: string;

    constructor(id: number, dataLog: string, ordem: number, tituloLog: string, conteudoLog: string, sentimento: ESentimento) {
        this.Id = id;
        this.DataLog = dataLog;
        this.Ordem = ordem;
        this.TituloLog = tituloLog;
        this.ConteudoLog = conteudoLog;
        this.Sentimento = sentimento;
        this.DataAtualizacao = this.dataAtual();
    }

    private dataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }
}