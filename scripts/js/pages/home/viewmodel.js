import { ESentimento } from "../../model/enums.js";
export default class ViewModel {
    main = document.querySelector("main");
    dataLog = document.getElementById("data-log");
    pesquisarData = document.querySelector("#pesquisar-data");
    menuData = document.querySelector("#menu-data");
    tituloLog = document.querySelector("#titulo-log");
    conteudoLog = document.querySelector("#conteudo-log");
    sentimento = ESentimento.Neutro;
    bom = document.querySelector("#bom");
    neutro = document.querySelector("#neutro");
    ruim = document.querySelector("#ruim");
    saveLog = document.querySelector("#save-log");
    up = document.querySelector("#up");
    down = document.querySelector("#down");
    left = document.querySelector("#left");
    right = document.querySelector("#right");
    listaLogs = document.querySelector("#lista-logs");
    templateRegistro = document.querySelector("#modelo-registro");
    templateVazio = document.querySelector("#modelo-registro-vazio");
    OnChange = (log) => { };
    get DataLog() { return this.dataLog.value; }
    set DataLog(v) { this.dataLog.value = v; }
    get TituloLog() { return this.tituloLog.value; }
    set TituloLog(v) { this.tituloLog.value = v; }
    get ConteudoLog() { return this.conteudoLog.value; }
    set ConteudoLog(v) { this.conteudoLog.value = v; }
    get Sentimento() { return this.sentimento; }
    set Sentimento(v) { this.sentimento = v; }
    log = null;
    get Log() { return this.log; }
    set Log(v) { this.log = v; }
    logs = [];
    get Logs() { return this.logs; }
    set Logs(v) { this.logs = v; }
    timer;
    constructor() {
        this.definirEventos();
    }
    definirEventos() {
        this.dataLog.onchange = (ev) => this.delayChange(ev);
        this.tituloLog.onkeyup = (ev) => this.delayChange(ev);
    }
    delayChange(ev, delay = 500) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.change(ev), delay);
    }
    change(ev) {
        clearTimeout(this.timer);
        const source = ev.target;
        if (source.id === this.dataLog.id) {
            this.changeBtn(this.DataLog === "", this.pesquisarData, this.menuData);
        }
        if (source.id === this.tituloLog.id) {
            this.changeBtn(this.TituloLog === "", this.saveLog);
        }
        console.log(this.DataLog);
    }
    changeBtn(disabled, ...btn) {
        btn.forEach(b => {
            if (disabled) {
                b.classList.add("btn-disabled");
                b.classList.remove("btn");
            }
            else {
                b.classList.add("btn");
                b.classList.remove("btn-disabled");
            }
        });
    }
    saveChange() {
        if (!this.log)
            return;
        this.log.DataLog = this.DataLog;
        this.log.TituloLog = this.TituloLog;
        this.log.ConteudoLog = this.ConteudoLog;
        this.OnChange(this.log);
    }
    dataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }
    ApresentarLog(log) {
        this.log = log;
        this.DataLog = this.log.DataLog;
        this.TituloLog = this.log.TituloLog;
        this.ConteudoLog = this.log.ConteudoLog;
        this.Sentimento = this.log.Sentimento;
        this.bom.classList.remove("selected");
        this.neutro.classList.remove("selected");
        this.ruim.classList.remove("selected");
        if (this.Sentimento === ESentimento.Bom)
            this.bom.classList.add("selected");
        else if (this.Sentimento === ESentimento.Neutro)
            this.neutro.classList.add("selected");
        else
            this.ruim.classList.add("selected");
    }
    ApresentarLogs(logs) {
        this.logs = logs;
        if (this.logs.length === 0) {
            this.listaLogs.innerHTML = this.templateVazio.innerHTML;
        }
    }
    ApresentarMain() {
        this.main.classList.remove("hidden");
    }
    OcultarMain() {
        this.main.classList.add("hidden");
    }
}
//# sourceMappingURL=viewmodel.js.map