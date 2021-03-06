import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UtilsService {

    remote: Electron.Remote;

    constructor(private http: HttpClient) {
        this.remote = window.require("electron").remote;
    }

    /**
     * Return true if the string is a JSON Object.
     * @param {string} JSONString
     * @returns {boolean}
     */
    public static isJSONString(JSONString: string) {
        try {
            JSON.parse(JSONString);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Return the json of package.json.
     * @returns {Promise<any>}
     */
    public getPackageInformations(): Promise<any> {
        return this.http.get("../package.json").toPromise();
    }

    /**
     * Open a link with the default browser.
     * @param {string} href
     */
    public openExternalLink(href: string) {
        this.remote.shell.openExternal(href);
    }

    /**
     * Close the application.
     */
    public closeApplication() {
        let currentWindow = this.remote.getCurrentWindow();

        currentWindow.close();
    }

    /**
     * Minimize the application.
     */
    public minimizeApplication() {
        let currentWindow = this.remote.getCurrentWindow();

        currentWindow.minimize();
    }

    /**
     * Invert the full screen setting of the application.
     */
    public toggleFullScreen() {
        let currentWindow = this.remote.getCurrentWindow();

        if (this.isFullScreen()) {
            currentWindow.setFullScreen(false);
        } else {
            currentWindow.setFullScreen(true);
        }
    }

    /**
     * Return the status of the fullScreen setting.
     * @returns {boolean}
     */
    public isFullScreen(): boolean {
        let currentWindow = this.remote.getCurrentWindow();

        return currentWindow.isFullScreen();
    }

}
