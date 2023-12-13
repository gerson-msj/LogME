import LogModel from "../../model/LogModel.js";
import { ESentimento } from "../../model/enums.js";
import ViewModel from "./viewmodel.js";
{
    let viewModel;
    let log;
    let lastId = 0;
    let lastOrdem = 0;
    let logs = [];
    function Main() {
        viewModel = new ViewModel();
        viewModel.OnChange = (log) => change(log);
        const log = NovoLog();
        viewModel.ApresentarLog(log);
        const logs = ObterLogs();
        viewModel.ApresentarLogs(logs);
        viewModel.ApresentarMain();
    }
    function NovoLog() {
        return new LogModel(++lastId, DataAtual(), ++lastOrdem, "", "", ESentimento.Bom);
    }
    function change(log) {
        console.info(log);
    }
    function ObterLogs() {
        return [];
    }
    function DataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }
    Main();
}
//# sourceMappingURL=controller.js.map