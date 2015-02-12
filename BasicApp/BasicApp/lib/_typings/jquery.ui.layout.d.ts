// Type definitions for jQueryUI 1.9
// Project: http://layout.jquery-dev.net/
// Definitions by: Steve Fenton <https://github.com/Steve-Fenton>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="./jquery.d.ts"/>
/// <reference path="./jqueryui.d.ts"/>

interface JQueryLayoutOptions
{
    // - - - - - - - - - - - - 
    // Sub-Key Format options
    // - - - - - - - - - - - - 

    /** global options for the west pane */
    defaults?: JQueryLayoutOptions;

    /** options for the north pane */
    north?: JQueryLayoutOptions;

    /** options for the east pane */
    east?: JQueryLayoutOptions;

    /** options for the south pane */
    south?: JQueryLayoutOptions;

    /** options for the west pane */
    west?: JQueryLayoutOptions;

    // - - - - - - - - - - - - 
    // List Format options (only default options with no prefixes)
    // - - - - - - - - - - - - 

    /** apply basic styles directly to resizers & buttons (default = false) */
    applyDefaultStyles?: boolean;

    size?: any;
    minSize?: number;
    maxSize?: number;

    resizable?: boolean;
    closable?: boolean;

    spacing_open?: number;
    spacing_closed?: number;

    paneSelector?: string;

    onresize?: any;
}

interface JQueryLayout {
    panes: any;
    options: JQueryLayoutOptions;
    state: any;

    toggle(pane: any): any;
    open(pane: any): any;
    close(pane: any): any;
    show(pane: any, openPane?: boolean): any;
    hide(pane: any): any;
    sizePane(pane: any, sizeInPixels: number): any;
    resizeContent(pane: any): any;
    resizeAll(): any;

    addToggleBtn(selector: string, pane: any)
    addCloseBtn(selector: string, pane: any)
    addOpenBtn(selector: string, pane: any)
    addPinBtn(selector: string, pane: any)
    allowOverflow(elemOrPane: any)
    resetOverflow(elemOrPane: any)
}

interface JQuery {
    layout(options?: JQueryLayoutOptions): JQueryLayout;
}
