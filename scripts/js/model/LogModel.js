import { ESentimento } from "./enums.js";
export default class LogModel {
    Id;
    DataLog;
    Ordem;
    TituloLog;
    ConteudoLog;
    Sentimento = ESentimento.Neutro;
    DataAtualizacao;
    constructor(id, dataLog, ordem, tituloLog, conteudoLog, sentimento) {
        this.Id = id;
        this.DataLog = dataLog;
        this.Ordem = ordem;
        this.TituloLog = tituloLog;
        this.ConteudoLog = conteudoLog;
        this.Sentimento = sentimento;
        this.DataAtualizacao = this.dataAtual();
    }
    dataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }
}
//# sourceMappingURL=LogModel.js.map