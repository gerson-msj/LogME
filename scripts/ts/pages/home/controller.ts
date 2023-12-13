import LogModel from "../../model/LogModel.js";
import { ESentimento } from "../../model/enums.js";
import ViewModel from "./viewmodel.js";

{
    let viewModel: ViewModel;
    let log: LogModel;
    let lastId: number = 0;
    let lastOrdem: number = 0;
    let logs: LogModel[] = [];

    function Main() {
        viewModel = new ViewModel();

        viewModel.OnChange = (log) => change(log);

        const log = NovoLog();
        viewModel.ApresentarLog(log);

        const logs = ObterLogs();
        viewModel.ApresentarLogs(logs);

        viewModel.ApresentarMain();
    }

    function NovoLog() : LogModel {
        return new LogModel(++lastId, DataAtual(), ++lastOrdem, "", "", ESentimento.Bom);
    }

    function change(log: LogModel) {
        console.info(log);
    }

    function ObterLogs() : LogModel[] {
        return [];
    }

    function DataAtual() {
        const dt = new Date((Date.now() - 180 * 60 * 1000));
        return dt.toISOString().split("T")[0];
    }

    Main();
}