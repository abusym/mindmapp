import {Injectable} from "@angular/core";
import {ipcRenderer} from "electron";
import {TranslateService} from "@ngx-translate/core";
import {LangChangeEvent} from "@ngx-translate/core/src/translate.service";

@Injectable()
export class UpdateService {

    private ipcRenderer: typeof ipcRenderer;

    private translations: any;

    constructor(private translateService: TranslateService) {
        this.ipcRenderer = window.require("electron").ipcRenderer;

        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translations = event.translations;
        });
    }

    public createUpdateListener() {
        this.ipcRenderer.send("check-updates");

        this.ipcRenderer.on("update-available", () => {
            this.ipcRenderer.send("show-update-available-dialog", {
                type: "question",
                title: this.translations["UPDATES_FOUND_TITLE"],
                message: this.translations["UPDATES_FOUND_MESSAGE"],
                buttons: [this.translations["YES"], this.translations["NO"]]
            });
        });

        this.ipcRenderer.on("update-downloaded", () => {
            this.ipcRenderer.send("show-update-downloaded-dialog", {
                type: "info",
                title: this.translations["INSTALL_UPDATES_TITLE"],
                message: this.translations["INSTALL_UPDATES_MESSAGE"],
                buttons: [this.translations["OK"], this.translations["LATER"]]
            });
        });
    }

}
