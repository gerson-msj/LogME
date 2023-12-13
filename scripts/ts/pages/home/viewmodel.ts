import LogModel from "../../model/LogModel.js";
import { ESentimento } from "../../model/enums.js";

export default class ViewModel {

    private main = document.querySelector("main") as HTMLElement;
    private dataLog = document.getElementById("data-log") as HTMLInputElement;
    private pesquisarData = document.querySelector("#pesquisar-data") as HTMLSpanElement;
    private menuData = document.querySelector("#menu-data") as HTMLSpanElement;

    private tituloLog = document.querySelector("#titulo-log") as HTMLInputElement;
    private conteudoLog = document.querySelector("#conteudo-log") as HTMLTextAreaElement;
    private sentimento = ESentimento.Neutro;
    
    private bom = document.querySelector("#bom") as HTMLSpanElement;
    private neutro = document.querySelector("#neutro") as HTMLSpanElement;
    private ruim = document.querySelector("#ruim") as HTMLSpanElement;
    private saveLog = document.querySelector("#save-log") as HTMLSpanElement;
    
    private up = document.querySelector("#up") as HTMLSpanElement;
    private down = document.querySelector("#down") as HTMLSpanElement;
    private left = document.querySelector("#left") as HTMLSpanElement;
    private right = document.querySelector("#right") as HTMLSpanElement;
    
    private listaLogs = document.querySelector("#lista-logs") as HTMLDivElement;
    private templateRegistro = document.querySelector("#modelo-registro") as HTMLTemplateElement;
    private templateVazio = document.querySelector("#modelo-registro-vazio") as HTMLTemplateElement;

    OnChange = (log: LogModel) => { };

    get DataLog() { return this.dataLog.value; }
    set DataLog(v: string) { this.dataLog.value = v; }

    get TituloLog() { return this.tituloLog.value; }
    set TituloLog(v: string) { this.tituloLog.value = v; }

    get ConteudoLog() { return this.conteudoLog.value; }
    set ConteudoLog(v: string) { this.conteudoLog.value = v; }

    get Sentimento() { return this.sentimento; }
    set Sentimento(v: ESentimento) { this.sentimento = v; }

    private log: LogModel | null = null;
    get Log() { return this.log; }
    set Log(v) { this.log = v; }

    private logs: LogModel[] = [];
    get Logs() { return this.logs; }
    set Logs(v) { this.logs = v; }

    private timer: number | undefined;

    constructor() {
        this.definirEventos();
    }

    private definirEventos() {
        this.dataLog.onchange = (ev) => this.delayChange(ev);
        this.tituloLog.onkeyup = (ev) => this.delayChange(ev);
    }

    private delayChange(ev: Event, delay: number = 500) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.change(ev), delay);
    }

    private change(ev: Event) {
        clearTimeout(this.timer);
        const source = ev.target as HTMLInputElement;

        if (source.id === this.dataLog.id) {
            this.changeBtn(this.DataLog === "", this.pesquisarData, this.menuData);
        }

        if (source.id === this.tituloLog.id) {
            this.changeBtn(this.TituloLog === "", this.saveLog);
        }

        console.log(this.DataLog);
    }

    private changeBtn(disabled: boolean, ...btn: HTMLSpanElement[]) {
        btn.forEach(b => {
            if (disabled) {
                b.classList.add("btn-disabled");
                b.classList.remove("btn");
            } else {
                b.classList.add("btn");
                b.classList.remove("btn-disabled");
            }
        });
    }

    private saveChange() {
        if (!this.log)
            return;

        this.log.DataLog = this.DataLog;
        this.log.TituloLog = this.TituloLog;
        this.log.ConteudoLog = this.ConteudoLog;

        this.OnChange(this.log);
    }

    private dataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }

    ApresentarLog(log: LogModel) {
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

    ApresentarLogs(logs: LogModel[]) {
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