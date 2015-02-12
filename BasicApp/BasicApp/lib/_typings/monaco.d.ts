
// FROM: http://monacotools/doc#Editor_TypeScript_API

// Some types were replaced with `any` to introduce cut-off points
// in order to not bring in our entire TypeScript universe

declare module Monaco.Editor
{

    export function create(domNode: HTMLElement, options: IEditorConstructionOptions): ICodeEditor;
    export function createDiffEditor(domNode: HTMLElement, options: IDiffEditorConstructionOptions): IDiffEditor;
    export function createModel(value: string, modeName: string, associatedResource?: any): IModel;
    export function createModel(value: string, modeName: IMonarchLanguage, associatedResource?: any): IModel;
    export function getOrCreateMode(mimeType: string): TPromise<IMode>;
    export function createCustomMode(description: IMonarchLanguage): IMode;

    export interface IEditorConstructionOptions extends ICodeEditorWidgetCreationOptions
    {
        value?: string;
        /**
         * A mode name (such as text/javascript, etc.) or an IMonarchLanguage
         */
        mode?: any;
        enableTelemetry?: boolean;
    }

    export interface IDiffEditorConstructionOptions extends IDiffEditorOptions
    {
    }




    // --- vs/base/lib/winjs.d.ts

    export interface ProgressCallback
    {
        (progress: any): any;
    }

    export interface TPromise<V>
    {

        then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;
        then<U>(success?: (value: V) => U, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        then<U>(success?: (value: V) => U, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;

        done(success?: (value: V) => void, error?: (err: any) => any, progress?: ProgressCallback): void;
        cancel(): void;
    }





    // --- vs/base/eventEmitter

    export interface IEmitterEvent
    {
        getType(): string;
        getData(): any;
    }

    export interface ListenerCallback
    {
        (value: any): void;
    }

    export interface IBulkListenerCallback
    {
        (value: IEmitterEvent[]): void;
    }

    export interface ListenerUnbind
    {
        (): void;
    }

    export interface IEventEmitter
    {
        addListener(eventType: string, listener: ListenerCallback): ListenerUnbind;
        addOneTimeListener(eventType: string, listener: ListenerCallback): ListenerUnbind;
        addBulkListener(listener: IBulkListenerCallback): ListenerUnbind;
        addEmitter(eventEmitter: IEventEmitter, emitterType?: string): ListenerUnbind;
        addEmitterTypeListener(eventType: string, emitterType: string, listener: ListenerCallback): ListenerUnbind;
        emit(eventType: string, data?: any): void;
    }




    // --- vs/base/dom/htmlContent.ts

    export interface IHTMLContentElement
    {
        formattedText?: string;
        text?: string;
        className?: string;
        style?: string;
        customStyle?: any;
        tagName?: string;
        children?: IHTMLContentElement[];
        isText?: boolean;
    }

    // --- vs/platform/services.ts

    export interface IPlatformServices
    {
    }

    export interface IInstantiationService
    {
    }

    export interface IConstructorSignature1<A1, T>
    {
        new (context: IPlatformServices, first: A1): T;
    }

    export interface IConstructorSignature2<A1, A2, T>
    {
        new (context: IPlatformServices, first: A1, second: A2): T;
    }


    // --- vs/editor/modes/monarch/monarchTypes.ts

    /**
     * A Monarch language definition
     */
    export interface IMonarchLanguage
    {
        // required
        name: string;								// unique name to identify the language
        mimeTypes: string[];						// associated mime types, for example ['text/x-koka']
        tokenizer: Object;							// map from string to ILanguageRule[]	

        // optional
        displayName?: string;						// nice display name
        fileExtensions?: string[];					// file extensions associated with this language
        ignoreCase?: boolean;							// is the language case insensitive?
        lineComment?: string;						// used to insert/delete line comments in the editor
        blockCommentStart?: string;					// used to insert/delete block comments in the editor
        blockCommentEnd?: string;
        defaultToken?: string;						// if no match in the tokenizer assign this token class (default 'source')
        brackets?: IMonarchLanguageBracket[];				// for example [['{','}','delimiter.curly']]

        // advanced
        start?: string;								// start symbol in the tokenizer (by default the first entry is used)
        tokenPostfix?: string;						// attach this to every token class (by default '.' + name)
        autoClosingPairs?: string[][];				// for example [['"','"']]
        nonWordTokens?: string[];					// token classes that are not words, for example ['delimiter','delimiter.curly']
        wordDefinition?: RegExp;					// word definition regular expression
        outdentTriggers?: string;					// characters that could potentially cause outdentation
        autoComplete?: IMonarchLanguageAutoComplete[];		// autocompletion rules
        autoIndent?: IMonarchLanguageAutoIndent[];			// autoindentation rules
        noindentBrackets?: string /* || RegExp */;	// suppress auto indentation for certain brackets, for example /[()<>]/

        // worker
        workerScriptPath?: string;					// path to worker script

        // hidden?
        editorOptions?: Object;
        logConsole?: string;
    }

    /**
     * This interface can be shortened as an array, ie. ['{','}','delimiter.curly']
     */
    export interface IMonarchLanguageBracket
    {
        open: string;	// open bracket
        close: string;	// closeing bracket
        token: string;	// token class
    }

    export interface IMonarchLanguageAutoComplete
    {
        triggers: string;				// characters that trigger auto completion rules
        match: string /* || RegExp */;	// autocomplete if this matches
        complete: string;				// complete with this string
    }

    export interface IMonarchLanguageAutoIndent
    {
        match: string /* || RegExp */;		// auto indent if this matches on enter
        matchAfter: string /* || RegExp */;	// and auto-outdent if this matches on the next line
    }


    // --- vs/editor/modes/modes.ts
    export interface IState
    {
        clone(): IState;
        equals(other: IState): boolean;
        getMode(): IMode;
        getStateData(): IState;
        setStateData(state: IState): void;
    }
    export interface IToken
    {
        startIndex: number;
        type: string;
        bracket: number;
    }
    export interface IModeTransition
    {
        startIndex: number;
        mode: IMode;
    }
    export interface ILineTokens
    {
        tokens: IToken[];
        actualStopOffset: number;
        endState: IState;
        modeTransitions: IModeTransition[];
    }
    export interface IMode
    {

    }

    // --- position & range

    /**
     * A position in the editor. This interface is suitable for serialization.
     */
    export interface IPosition
    {
        /**
         * line number (starts at 1)
         */
        lineNumber: number;
        /**
         * column (the first character in a line is between column 1 and column 2)
         */
        column: number;
    }

    /**
     * A position in the editor.
     */
    export interface IEditorPosition extends IPosition
    {
        /**
         * Test if this position equals other position
         */
        equals(other: IPosition): boolean;
        /**
         * Test if this position is before other position. If the two positions are equal, the result will be false. 
         */
        isBefore(other: IPosition): boolean;
        /**
         * Test if this position is before other position. If the two positions are equal, the result will be true.
         */
        isBeforeOrEqual(other: IPosition): boolean;
        /**
         * Clone this position.
         */
        clone(): IEditorPosition;
    }

    /**
     * A range in the editor. This interface is suitable for serialization.
     */
    export interface IRange
    {
        /**
         * Line number on which the range starts (starts at 1).
         */
        startLineNumber: number;
        /**
         * Column on which the range starts in line `startLineNumber` (starts at 1).
         */
        startColumn: number;
        /**
         * Line number on which the range ends.
         */
        endLineNumber: number;
        /**
         * Column on which the range ends in line `endLineNumber`.
         */
        endColumn: number;
    }

    /**
     * A range in the editor.
     */
    export interface IEditorRange extends IRange
    {
        /**
         * Test if this range is empty.
         */
        isEmpty(): boolean;
        /**
         * Test if position is in this range. If the position is at the edges, will return true.
         */
        containsPosition(position: IPosition): boolean;
        /**
         * Test if range is in this range. If the range is equal to this range, will return true.
         */
        containsRange(range: IRange): boolean;
        /**
         * A reunion of the two ranges. The smallest position will be used as the start point, and the largest one as the end point.
         */
        plusRange(range: IRange): IEditorRange;
        /**
         * A intersection of the two ranges.
         */
        intersectRanges(range: IRange): IEditorRange;
        /**
         * Test if this range equals other.
         */
        equalsRange(other: IRange): boolean;
        /**
         * Return the end position (which will be after or equal to the start position)
         */
        getEndPosition(): IEditorPosition;
        /**
         * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
         */
        setEndPosition(endLineNumber: number, endColumn: number): IEditorRange;
        /**
         * Return the start position (which will be before or equal to the end position)
         */
        getStartPosition(): IEditorPosition;
        /**
         * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
         */
        setStartPosition(startLineNumber: number, startColumn: number): IEditorRange;
        /**
         * Clone this range.
         */
        cloneRange(): IEditorRange;
        /**
         * Transform to a user presentable string representation.
         */
        toString(): string;
    }

    /**
     * A selection in the editor.
     * The selection is a range that has an orientation.
     */
    export interface ISelection
    {
        /**
         * The line number on which the selection has started.
         */
        selectionStartLineNumber: number;
        /**
         * The column on `selectionStartLineNumber` where the selection has started.
         */
        selectionStartColumn: number;
        /**
         * The line number on which the selection has ended.
         */
        positionLineNumber: number;
        /**
         * The column on `positionLineNumber` where the selection has ended.
         */
        positionColumn: number;
    }

    /**
     * The direction of a selection.
     */
    export enum SelectionDirection
    {
        /**
         * The selection starts above where it ends.
         */
        LTR,
        /**
         * The selection starts below where it ends.
         */
        RTL
    }

    /**
     * A selection in the editor.
     */
    export interface IEditorSelection extends ISelection, IEditorRange
    {
        /**
         * Test if equals other selection.
         */
        equalsSelection(other: ISelection): boolean;
        /**
         * Clone this selection.
         */
        clone(): IEditorSelection;
        /**
         * Get directions (LTR or RTL).
         */
        getDirection(): SelectionDirection;
        /**
         * Create a new selection with a different `positionLineNumber` and `positionColumn`.
         */
        setEndPosition(endLineNumber: number, endColumn: number): IEditorSelection;
        /**
         * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
         */
        setStartPosition(startLineNumber: number, startColumn: number): IEditorSelection;
    }

    /**
     * Configuration options for editor scrollbars
     */
    export interface IEditorScrollbarOptions
    {
        /**
         * The size of arrows (if displayed).
         * Defaults to 11.
         */
        arrowSize?: number;
        /**
         * Render vertical scrollbar.
         * Accepted values: 'auto', 'visible', 'hidden'.
         * Defaults to 'auto'.
         */
        vertical?: string;
        /**
         * Render horizontal scrollbar.
         * Accepted values: 'auto', 'visible', 'hidden'.
         * Defaults to 'auto'.
         */
        horizontal?: string;
        /**
         * Cast horizontal and vertical shadows when the content is scrolled.
         * Defaults to false.
         */
        useShadows?: boolean;
        /**
         * Render arrows at the top and bottom of the vertical scrollbar.
         * Defaults to false.
         */
        verticalHasArrows?: boolean;
        /**
         * Render arrows at the left and right of the horizontal scrollbar.
         * Defaults to false.
         */
        horizontalHasArrows?: boolean;
        /**
         * Listen to mouse wheel events and react to them by scrolling.
         * Defaults to true.
         */
        handleMouseWheel?: boolean;
        /**
         * Height in pixels for the horizontal scrollbar.
         * Defaults to 10 (px).
         */
        horizontalScrollbarSize?: number;
        /**
         * Width in pixels for the vertical scrollbar.
         * Defaults to 10 (px).
         */
        verticalScrollbarSize?: number;
        // TODO@ALex
        verticalSliderSize?: number;
    }

    /**
     * Configuration options for the editor. Common between configuring the editor and the options the editor has computed
     */
    export interface ICommonEditorOptions
    {
        /**
         * Control the rendering of line numbers.
         * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
         * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
         * Otherwise, line numbers will not be rendered.
         * Defaults to true.
         */
        lineNumbers?: any;
        /**
         * Should the corresponding line be selected when clicking on the line number?
         * Defaults to true.
         */
        selectOnLineNumbers?: boolean;
        /**
         * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
         * Defaults to 5.
         */
        lineNumbersMinChars?: number;
        /**
         * Enable the rendering of the glyph margin.
         * Defaults to false.
         */
        glyphMargin?: boolean;
        /**
         * The width reserved for line decorations (in px).
         * Line decorations are placed between line numbers and the editor content.
         * Defaults to 10.
         */
        lineDecorationsWidth?: number;
        /**
         * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
         * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
         * Defaults to 30 (px).
         */
        revealHorizontalRightPadding?: number;
        /**
         * Render the editor selection with rounded borders.
         * Defaults to true.
         */
        roundedSelection?: boolean;
        /**
         * Theme to be used for rendering. The current available themes are:
         * 'vs', 'vs-dark', 'monaco', 'eclipse', 'tomorrow-night', 'high-contrast-black' and 'high-contrast-white'
         * Defaults to 'vs'.
         */
        theme?: string;
        /**
         * Should the editor be read only.
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * Control the behavior and rendering of the scrollbars.
         */
        scrollbar?: IEditorScrollbarOptions;
        /**
         * The number of vertical lanes the overview ruler should render.
         * Defaults to 2.
         */
        overviewRulerLanes?: number;
        /**
         * Should the cursor be hidden in the overview ruler.
         * Defaults to false.
         */
        hideCursorInOverviewRuler?: boolean;
        /**
         * Enable that scrolling can go one screen size after the last line.
         * Defaults to true.
         */
        scrollBeyondLastLine?: boolean;
        /**
         * Enable that the editor will install an interval to check if its container dom node size has changed.
         * Enabling this might have a severe performance impact.
         * Defaults to false.
         */
        automaticLayout?: boolean;
        /**
         * Control the wrapping strategy of the editor.
         * Using -1 means no wrapping whatsoever.
         * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
         * Using a positive number means wrapping after a fixed number of characters.
         * Defaults to 300.
         */
        wrappingColumn?: number;
        /**
         * Configure word wrapping characters. A break will be introduced before these characters.
         * Defaults to '{([+'.
         */
        wordWrapBreakBeforeCharacters?: string;
        /**
         * Configure word wrapping characters. A break will be introduced after these characters.
         * Defaults to ' \t})]?|&,;'.
         */
        wordWrapBreakAfterCharacters?: string;
        /**
         * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
         * Defaults to '.'.
         */
        wordWrapBreakObtrusiveCharacters?: string;

        //	autoSize?:boolean;
        /**
         * Control what pressing Tab does.
         * If it is false, pressing Tab or Shift-Tab will be handled by the editor.
         * If it is true, pressing Tab or Shift-Tab will move the browser focus.
         * Defaults to false. 
         */
        tabFocusMode?: boolean;

        /**
         * Performance guard: Stop tokenizing a line after x characters.
         * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0. 
         * Use -1 to never stop tokenization.
         */
        stopLineTokenizationAfter?: number;
        /**
         * Performance guard: Stop rendering a line after x characters.
         * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
         * Use -1 to never stop rendering
         */
        stopRenderingLineAfter?: number;
        /**
         * Performance guard: Force viewport width wrapping if more than half of the
         * characters in a model are on lines of length >= `longLineBoundary`.
         * Defaults to 300.
         */
        longLineBoundary?: number;
        /**
         * Enable hover.
         * Defaults to true.
         */
        hover?: boolean;
        /**
         * Enable custom contextmenu.
         * Defaults to true.
         */
        contextmenu?: boolean;
        /**
         * Enable quick suggestions (shaddow suggestions)
         * Defaults to true.
         */
        quickSuggestions?: boolean;
        /**
         * Quick suggestions show delay (in ms)
         * Defaults to 500 (ms)
         */
        quickSuggestionsDelay?: number;
        /**
         * Render icons in suggestions box.
         * Defaults to true.
         */
        iconsInSuggestions?: boolean;
        /**
         * Enable auto closing brackets.
         * Defaults to true.
         */
        autoClosingBrackets?: boolean;
        /**
         * Enable format on type.
         * Defaults to false.
         */
        formatOnType?: boolean;
        /**
         * Enable the suggestion box to pop-up on trigger characters.
         * Defaults to true.
         */
        suggestOnTriggerCharacters?: boolean;
    }

    /**
     * Configuration options for the editor.
     */
    export interface IEditorOptions extends ICommonEditorOptions
    {
        /**
         * Tab size in spaces. This is used for rendering and for editing.
         * Defaults to 'auto', meaning the model attached to the editor will be scanned and this property will be guessed.
         */
        tabSize?: any;
        /**
         * Insert spaces instead of tabs when indenting or when auto-indenting.
         * Defaults to 'auto', meaning the model attached to the editor will be scanned and this property will be guessed.
         */
        insertSpaces?: any;
    }

    /**
     * Configuration options for the diff editor.
     */
    export interface IDiffEditorOptions extends IEditorOptions
    {
        /**
         * Allow the user to resize the diff editor split view.
         * Defaults to true.
         */
        enableSplitViewResizing?: boolean;
        /**
         * Render the differences in two side-by-side editors.
         * Defaults to true.
         */
        renderSideBySide?: boolean
    }

    /**
     * Internal indentation options (computed) for the editor.
     */
    export interface IInternalIndentationOptions
    {
        /**
         * Tab size in spaces. This is used for rendering and for editing.
         */
        tabSize: number;
        /**
         * Insert spaces instead of tabs when indenting or when auto-indenting.
         */
        insertSpaces: boolean;
    }

    /**
     * Internal configuration options (computed) for the editor.
     */
    export interface IInternalEditorOptions extends ICommonEditorOptions
    {
        /**
         * Computed width of the container of the editor in px.
         */
        observedOuterWidth: number;
        /**
         * Computed height of the container of the editor in px.
         */
        observedOuterHeight: number;
        /**
         * Computed line height (deduced from theme and CSS) in px.
         */
        lineHeight: number;
        /**
         * Computed page size (deduced from editor size) in lines.
         */
        pageSize: number;
        /**
         * Computed width of '|' (deduced from theme and CSS) in px.
         */
        thinnestCharacterWidth: number;
        /**
         * 
         */
        maxDigitWidth: number;
        /**
         * Computed string uniquely representing current font (deduced from theme and CSS).
         */
        font: string;
        /**
         * Computed font size.
         */
        fontSize: number;
        /**
         * Is the current model attached to the editor dominated by long lines?.
         * See `longLineBoundary` for an explanation.
         */
        isDominatedByLongLines: boolean;

        // --- ICommonEditorOptions are repeated here to force their presence (in implementation)

        lineNumbers: any;
        selectOnLineNumbers: boolean;
        lineNumbersMinChars: number;
        glyphMargin: boolean;
        lineDecorationsWidth: number;
        revealHorizontalRightPadding: number;
        roundedSelection: boolean;
        theme: string;
        readOnly: boolean;
        scrollbar: IEditorScrollbarOptions;
        overviewRulerLanes: number;
        hideCursorInOverviewRuler: boolean;
        scrollBeyondLastLine: boolean;
        automaticLayout: boolean;
        wrappingColumn: number;
        wordWrapBreakBeforeCharacters: string;
        wordWrapBreakAfterCharacters: string;
        wordWrapBreakObtrusiveCharacters: string;
        tabFocusMode: boolean;
        stopLineTokenizationAfter: number;
        stopRenderingLineAfter: number;
        longLineBoundary: number;
        hover: boolean;
        contextmenu: boolean;
        quickSuggestions: boolean;
        quickSuggestionsDelay: number;
        iconsInSuggestions: boolean;
        autoClosingBrackets: boolean;
        formatOnType: boolean;
        suggestOnTriggerCharacters: boolean;
    }

    /**
     * An event describing that the configuration of the editor has changed.
     */
    export interface IConfigurationChangedEvent
    {
        observedOuterWidth: boolean;
        observedOuterHeight: boolean;
        lineHeight: boolean;
        pageSize: boolean;
        thinnestCharacterWidth: boolean;
        maxDigitWidth: boolean;
        font: boolean;
        fontSize: boolean;
        isDominatedByLongLines: boolean;
        lineNumbers: boolean;
        selectOnLineNumbers: boolean;
        lineNumbersMinChars: boolean;
        glyphMargin: boolean;
        lineDecorationsWidth: boolean;
        revealHorizontalRightPadding: boolean;
        roundedSelection: boolean;
        theme: boolean;
        readOnly: boolean;
        scrollbar: boolean;
        overviewRulerLanes: boolean;
        hideCursorInOverviewRuler: boolean;
        scrollBeyondLastLine: boolean;
        automaticLayout: boolean;
        wrappingColumn: boolean;
        wordWrapBreakBeforeCharacters: boolean;
        wordWrapBreakAfterCharacters: boolean;
        wordWrapBreakObtrusiveCharacters: boolean;
        tabFocusMode: boolean;
        stopLineTokenizationAfter: boolean;
        stopRenderingLineAfter: boolean;
        longLineBoundary: boolean;
        hover: boolean;
        contextmenu: boolean;
        quickSuggestions: boolean;
        quickSuggestionsDelay: boolean;
        iconsInSuggestions: boolean;
        autoClosingBrackets: boolean;
        formatOnType: boolean;
        suggestOnTriggerCharacters: boolean;
    }

    /**
     * Vertical Lane in the overview ruler of the editor.
     */
    export enum OverviewRulerLane
    {
        Left = 1,
        Center = 2,
        Right = 4,
        Full = 7
    }

    /**
     * Options for rendering a model decoration in the overview ruler.
     */
    export interface IModelDecorationOverviewRulerOptions
    {
        /**
         * CSS color to render in the overview ruler.
         * e.g.: rgba(100, 100, 100, 0.5)
         */
        color: string;
        /**
         * The position in the overview ruler.
         */
        position: OverviewRulerLane;
    }

    /**
     * Options for a model decoration.
     */
    export interface IModelDecorationOptions
    {
        /**
         * Customize the growing behaviour of the decoration when typing at the edges of the decoration.
         * Defaults to TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges
         */
        stickiness?: TrackedRangeStickiness;
        /**
         * CSS class name describing the decoration.
         */
        className?: string;
        /**
         * Message to be rendered when hovering over the decoration.
         */
        hoverMessage?: string;
        /**
         * Array of IHTMLContentElements to render as the decoration message.
         */
        htmlMessage?: IHTMLContentElement[];
        /**
         * Should the decoration expand to encompass a whole line.
         */
        isWholeLine?: boolean;
        /**
         * @deprecated : Use `overviewRuler` instead
         */
        showInOverviewRuler?: string;
        /**
         * If set, render this decoration in the overview ruler.
         */
        overviewRuler?: IModelDecorationOverviewRulerOptions;
        /**
         * If set, the decoration will be rendered in the glyph margin with this CSS class name. 
         */
        glyphMarginClassName?: string;
        /**
         * If set, the decoration will be rendered in the lines decorations with this CSS class name.
         */
        linesDecorationsClassName?: string;
        /**
         * If set, the decoration will be rendered inline with the text with this CSS class name.
         * Please use this only for CSS rules that must impact the text. For example, use `className`
         * to have a background color decoration.
         */
        inlineClassName?: string;
    }

    /**
     * New model decorations.
     */
    export interface IModelDeltaDecoration
    {
        /**
         * Range that this decoration covers.
         */
        range: IRange;
        /**
         * Options associated with this decoration.
         */
        options: IModelDecorationOptions;
    }

    /**
     * A tracked range in the model.
     */
    export interface IModelTrackedRange
    {
        /**
         * Identifier for a tracked range
         */
        id: string;
        /**
         * Range that this tracked range covers
         */
        range: IRange;
    }

    /**
     * A decoration in the model.
     */
    export interface IModelDecoration
    {
        /**
         * Identifier for a decoration.
         */
        id: string;
        /**
         * Identifier for a decoration's owener.
         */
        ownerId: number;
        /**
         * Range that this decoration covers.
         */
        range: IRange;
        /**
         * Options associated with this decoration.
         */
        options: IModelDecorationOptions;
    }

    /**
     * An accessor that can add, change or remove model decorations.
     */
    export interface IModelDecorationsChangeAccessor
    {
        /**
         * Add a new decoration.
         * @param range Range that this decoration covers.
         * @param options Options associated with this decoration.
         * @return An unique identifier associated with this decoration.
         */
        addDecoration(range: IRange, options: IModelDecorationOptions): string;
        /**
         * Change the range that an existing decoration covers.
         * @param id The unique identifier associated with the decoration.
         * @param newRange The new range that this decoration covers.
         */
        changeDecoration(id: string, newRange: IRange): void;
        /**
         * Change the options associated with an existing decoration.
         * @param id The unique identifier associated with the decoration.
         * @param newOptions The new options associated with this decoration.
         */
        changeDecorationOptions(id: string, newOptions: IModelDecorationOptions): void;
        /**
         * Remove an existing decoration.
         * @param id The unique identifier associated with the decoration.
         */
        removeDecoration(id: string): void;
        /**
         * Perform a minimum ammount of operations, in order to transform the decorations
         * identified by `oldDecorations` to the decorations described by `newDecorations`
         * and returns the new identifiers associated with the resulting decorations.
         * 
         * @param oldDecorations Array containing previous decorations identifiers.
         * @param newDecorations Array describing what decorations should result after the call.
         * @return An array containing the new decorations identifiers.
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[]): string[];
    }

    /**
     * Word inside a model.
     */
    export interface IWordAtPosition
    {
        /**
         * The word.
         */
        word: string;
        /**
         * The column where the word starts.
         */
        startColumn: number;
        /**
         * The column where the word ends.
         */
        endColumn: number;
    }

    /**
     * Range of a word inside a model.
     */
    export interface IWordRange
    {
        /**
         * The column where the word starts.
         */
        start: number;
        /**
         * The column where the word ends.
         */
        end: number;
    }

    // TODO@Alex -> decide if the token iterator is public API.
    export interface ITokenInfo
    {
        token: IToken;
        lineNumber: number;
        startColumn: number;
        endColumn: number;
    }

    export interface ITokenIterator
    {
        hasNext(): boolean;
        next(): ITokenInfo;
        hasPrev(): boolean;
        prev(): ITokenInfo;
    }

    /**
     * Result of a deleteText operation.
     */
    export interface IDeleteTextResult
    {
        /**
         * The position where a theoretical edit cursor is after a `deleteText` call.
         */
        position: IEditorPosition;
        /**
         * The text that was deleted by a `deleteText` call.
         */
        deletedText: string;
    }

    /**
     * An accessor that allows for inserting or deleting text in a model.
     */
    export interface IModelChangeAccessor
    {
        /**
         * Insert text.
         * @param position The position where to insert the text.
         * @param text The text to insert.
         * @param forceMarkersStickToNextCharacter Push any markers present at `position`, irrespective of their glueing setting.
         * @return The position where a theoretical edit cursor is after the call.
         */
        insertText(position: IPosition, text: string, forceMarkersStickToNextCharacter?: boolean): IEditorPosition;
        /**
         * Delete text.
         * @param range The range to delete.
         */
        deleteText(range: IRange): IDeleteTextResult;
    }

    /**
     * End of line character preference.
     */
    export enum EndOfLinePreference
    {
        /**
         * Use the end of line character identified in the text buffer.
         */
        TextDefined,
        /**
         * Use line feed (\n) as the end of line character.
         */
        LF,
        /**
         * Use carriage return and line feed (\r\n) as the end of line character.
         */
        CRLF
    }

    /**
     * The result of a matchBracket operation.
     */
    export interface IMatchBracketResult
    {
        /**
         * The two ranges describing matching brackets, or null
         */
        brackets: IEditorRange[];
        /**
         * Indicates that the bracket match result is not accurate because the search
         * hit some untokenized lines.
         */
        isAccurate: boolean;
    }

    /**
     * A read-only line marker in the model.
     */
    export interface IReadOnlyLineMarker
    {
        id: string;
        column: number;
    }

    /**
     * And identifier for a single edit operation.
     */
    export interface ISingleEditOperationIdentifier
    {
        /**
         * Identifier major
         */
        major: number;
        /**
         * Identifier minor
         */
        minor: number;
    }

    /**
     * A builder and helper for edit operations for a command.
     */
    export interface IEditOperationBuilder
    {
        /**
         * Add a new edit operation (a replace operation).
         * @param range The range to replace (delete). May be empty to represent a simple insert.
         * @param text The text to replace with. May be null to represent a simple delete.
         */
        addEditOperation(range: IEditorRange, text: string): void;

        /**
         * Track `selection` when applying edit operations.
         * A best effort will be made to not grow/expand the selection.
         * An empty selection will clamp to a nearby character.
         * @param selection The selection to track.
         * @return A unique identifer.
         */
        trackSelection(selection: IEditorSelection): string;
    }

    /**
     * A helper for computing cursor state after a command.
     */
    export interface ICursorStateComputerData
    {
        /**
         * Get the inverse edit operations of the added edit operations.
         */
        getInverseEditOperations(): ISingleEditOperation[];
        /**
         * Get a previously tracked selection.
         * @param id The unique identifier returned by `trackSelection`.
         * @return The selection.
         */
        getTrackedSelection(id: string): IEditorSelection;
    }

    /**
     * A command that modifies text / cursor state on a model.
     */
    export interface ICommand
    {
        /**
         * Get the edit operations needed to execute this command.
         * @param model The model the command will execute on.
         * @param builder A helper to collect the needed edit operations and to track selections.
         */
        getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;
        /**
         * Compute the cursor state after the edit operations were applied.
         * @param model The model the commad has executed on.
         * @param helper A helper to get inverse edit operations and to get previously tracked selections.
         * @return The cursor state after the command executed.
         */
        computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): IEditorSelection;
    }

    /**
     * A single edit operation, that acts as a simple replace.
     * i.e. Replace text at `range` with `text` in model.
     */
    export interface ISingleEditOperation
    {
        /**
         * An identifier associated with this single edit operation.
         */
        identifier: ISingleEditOperationIdentifier;
        /**
         * The range to replace. This can be empty to emulate a simple insert.
         */
        range: IEditorRange;
        /**
         * The text to replace with. This can be null to emulate a simple delete.
         */
        text: string;
    }

    /**
     * A callback that can compute the cursor state after applying a series of edit operations.
     */
    export interface ICursorStateComputer
    {
        /**
         * A callback that can compute the resulting cursors state after some edit operations have been executed.
         */
        (inverseEditOperations: ISingleEditOperation[]): IEditorSelection[];
    }

    /**
     * A token on a line.
     */
    export interface ILineToken
    {
        startIndex: number;
        type: string;
    }

    /**
     * A list of tokens on a line.
     */
    export interface ILineTokens
    {

        /**
         * Get the actual tokens.
         */
        getTokens(): ILineToken[];

        /**
         * Get the length of the text described by these tokens.
         */
        getTextLength(): number;

        /**
         * Check if tokens have changed. This is called by the view to validate rendered lines
         * and decide which lines need re-rendering.
         */
        equals(other: ILineTokens): boolean;

        /**
         * Find the token containing offset `offset`.
         *    For example, with the following tokens [0, 5), [5, 9), [9, infinity) 
         *    Searching for 0, 1, 2, 3 or 4 will return 0.
         *    Searching for 5, 6, 7 or 8 will return 1.
         *    Searching for 9, 10, 11, ... will return 2. 
         * @param offset The search offset
         * @return The index of the token containing the offset.
         */
        findIndexOfOffset(offset: number): number;
    }

    /**
     * Result for a ITextModel.guessIndentation
     */
    export interface IGuessedIndentation
    {
        /**
         * If indentation is based on spaces (`insertSpaces` = true), then what is the number of spaces that make an indent?
         */
        tabSize: number;
        /**
         * Is indentation based on spaces?
         */
        insertSpaces: boolean;
    }

    /**
     * A textual read-only model.
     */
    export interface ITextModel
    {

        /**
         * Get the current version id of the model.
         * Anytime a change happens to the model (even undo/redo),
         * the version id is incremented.
         */
        getVersionId(): number;

        /**
         * Replace the entire text buffer value contained in this model.
         */
        setValue(newValue: string): void;

        /**
         * Get the text stored in this model.
         * @param eol The end of line character preference. Defaults to `EndOfLinePreference.TextDefined`.
         * @param preserverBOM Preserve a BOM character if it was detected when the model was constructed.
         * @return The text.
         */
        getValue(eol?: EndOfLinePreference, preserveBOM?: boolean): string;

        /**
         * Get the text in a certain range.
         * @param range The range describing what text to get.
         * @param eol The end of line character preference. This will only be used for multiline ranges. Defaults to `EndOfLinePreference.TextDefined`.
         * @return The text.
         */
        getValueInRange(range: IRange, eol?: EndOfLinePreference): string;

        /**
         * Splits characters in two buckets. First bucket (A) is of characters that
         * sit in lines with length < `longLineBoundary`. Second bucket (B) is of 
         * characters that sit in lines with length >= `longLineBoundary`.
         * If count(B) > count(A) return true. Returns false otherwise.
         */
        isDominatedByLongLines(longLineBoundary: number): boolean;

        /**
         * Guess the text indentation.
         * @param defaultTabSize The tab size to use if `insertSpaces` is false.
         * If `insertSpaces` is true, then `tabSize` is relevant.
         * If `insertSpaces` is false, then `tabSize` is `defaultTabSize`.
         */
        guessIndentation(defaultTabSize: number): IGuessedIndentation;

        /**
         * Get the number of lines in the model.
         */
        getLineCount(): number;

        /**
         * Get the text for a certain line.
         */
        getLineContent(lineNumber: number): string;

        /**
         * Get the end of line character predominantly used in the text buffer.
         * @return EOL char sequence (e.g.: '\n' or '\r\n').
         */
        getEOL(): string;

        /**
         * Get the maximum legal column for line at `lineNumber`
         */
        getLineMaxColumn(lineNumber: number): number;

        /**
         * Returns the column before the first non whitespace character for line at `lineNumber`.
         * Returns 0 if line is empty or contains only whitespace.
         */
        getLineFirstNonWhitespaceColumn(lineNumber: number): number;

        /**
         * Returns the column after the last non whitespace character for line at `lineNumber`.
         * Returns 0 if line is empty or contains only whitespace.
         */
        getLineLastNonWhitespaceColumn(lineNumber: number): number;

        /**
         * Create a valid position,
         */
        validatePosition(position: IPosition): IEditorPosition;

        /**
         * Create a valid range.
         */
        validateRange(range: IRange): IEditorRange;

        /**
         * Get a range covering the entire model
         */
        getFullModelRange(): IEditorRange;
    }

    /**
     * A model that is tokenized.
     */
    export interface ITokenizedModel extends ITextModel
    {

        /**
         * Set the value at which to stop tokenization.
         * The default is 10000.
         */
        setStopLineTokenizationAfter(stopLineTokenizationAfter: number): void;

        /**
         * Tokenize if necessary and get the tokens for the line `lineNumber`.
         * @param lineNumber The line number
         * @param inaccurateTokensAcceptable Are inaccurate tokens acceptable? Defaults to false
         */
        getLineTokens(lineNumber: number, inaccurateTokensAcceptable?: boolean): ILineTokens;

        /**
         * Tokenize if necessary and get the tokenization result for the line `lineNumber`, as returned by the language mode.
         */
        getRawLineTokens(lineNumber: number): ILineTokens;

        /*package*/_getInternalTokens(lineNumber: number): IToken[];

        /**
         * Replace the entire text buffer value contained in this model.
         * Optionally, the language mode of the model can be changed.
         * This call clears all of the undo / redo stack,
         * removes all decorations or tracked ranges, emits a
         * ModelContentChanged(ModelContentChangedFlush) event and 
         * unbinds the mirror model from the previous mode to the new
         * one if the mode has changed.
         */
        setValue(newValue: string, newMode?: IMode): void;

        /**
         * Get the current language mode associated with the model.
         */
        getMode(): IMode;

        /**
         * Set the current language mode associated with the model.
         */
        setMode(newMode: IMode): void;
        setMode(newModePromise: TPromise<IMode>): void;

        /**
         * Returns the true (inner-most) language mode at a given position.
         */
        getModeAtPosition(lineNumber: number, column: number): IMode;

        /**
         * Get the word under or besides `position`.
         * @param position The position to look for a word.
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return The word under or besides `position`. Might be null.
         */
        getWordAtPosition(position: IPosition, skipSyntaxTokens: boolean, inaccurateResultAcceptable?: boolean): IWordAtPosition;

        /**
         * Get the words on line `lineNumber`.
         * @param lineNumber The lineNumber
         * @param skipSyntaxTokens Ignore syntax tokens, as identified by the mode.
         * @return All the words on the line.
         */
        getWords(lineNumber: number, skipSyntaxTokens: boolean, inaccurateResultAcceptable?: boolean): IWordRange[];

        /**
         * Returns an iterator that can be used to read
         * next and previous tokens from the provided position.
         * The iterator is made available through the callback
         * function and can't be used afterwards.
         */
        tokenIterator(position: IPosition, callback: (it: ITokenIterator) => any): any;

        /**
         * Find the matching bracket of `tokenType` up, counting brackets.
         * @param tokenType The token type of the bracket we're searching for
         * @param position The position at which to start the search.
         * @return The range of the matching bracket, or null if the bracket match was not found.
         */
        findMatchingBracketUp(tokenType: string, position: IPosition): IEditorRange;

        /**
         * Given a `position`, if the position is on top or near a bracket,
         * find the matching bracket of that bracket and return the ranges of both brackets.
         * @param position The position at which to look for a bracket.
         */
        matchBracket(position: IPosition, inaccurateResultAcceptable?: boolean): IMatchBracketResult;
    }

    /**
     * A model that can track markers.
     */
    export interface ITextModelWithMarkers extends ITextModel
    {
        /*package*/_addMarker(lineNumber: number, column: number, stickToPreviousCharacter: boolean): string;
        /*package*/_changeMarker(id: string, newLineNumber: number, newColumn: number): void;
        /*package*/_changeMarkerStickiness(id: string, newStickToPreviousCharacter: boolean): void;
        /*package*/_getMarker(id: string): IPosition;
        /*package*/_removeMarker(id: string): void;
        /*package*/_getLineMarkers(lineNumber: number): IReadOnlyLineMarker[];
    }

    /**
     * A map of changed ranges used during the model internal processing
     */
    export interface IChangedTrackedRanges
    {
        [key: string]: IRange;
    }

    export enum TrackedRangeStickiness
    {
        AlwaysGrowsWhenTypingAtEdges = 0,
        NeverGrowsWhenTypingAtEdges = 1,
        GrowsOnlyWhenTypingBefore = 2,
        GrowsOnlyWhenTypingAfter = 3,
    }

    /**
     * A model that can track ranges.
     */
    export interface ITextModelWithTrackedRanges extends ITextModel
    {
        /**
         * Start tracking a range (across edit operations).
         * @param range The range to start tracking.
         * @param stickiness The behaviour when typing at the edges of the range.
         * @return A unique identifier for the tracked range.
         */
        addTrackedRange(range: IRange, stickiness: TrackedRangeStickiness): string;

        /**
         * Change the range of a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRange` call.
         * @param newRange The new range of the tracked range.
         */
        changeTrackedRange(id: string, newRange: IRange): void;

        /**
         * Change the stickiness (behaviour when typing at the edges of the range) for a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRange` call.
         * @param newStickiness The new behaviour when typing at the edges of the range.
         */
        changeTrackedRangeStickiness(id: string, newStickiness: TrackedRangeStickiness): void;

        /**
         * Remove a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRaneg` call.
         */
        removeTrackedRange(id: string): void;

        /**
         * Get the range of a tracked range.
         * @param id The id of the tracked range, as returned by a `addTrackedRaneg` call.
         */
        getTrackedRange(id: string): IEditorRange;

        /**
         * Gets all the tracked ranges for the lines between `startLineNumber` and `endLineNumber` as an array.
         * @param startLineNumber The start line number
         * @param endLineNumber The end line number
         * @return An array with the tracked ranges
         */
        getLinesTrackedRanges(startLineNumber: number, endLineNumber: number): IModelTrackedRange[];
    }

    /**
     * A model that can have decorations.
     */
    export interface ITextModelWithDecorations
    {
        /**
         * Change the decorations. The callback will be called with a change accessor
         * that becomes invalid as soon as the callback finishes executing.
         * This allows for all events to be queued up until the change
         * is completed. Returns whatever the callback returns.
         * @param ownerId Identifies the editor id in which these decorations should appear. If no `ownerId` is provided, the decorations will appear in all editors that attach this model.
         */
        changeDecorations(callback: (changeAccessor: IModelDecorationsChangeAccessor) => any, ownerId?: number): any;

        /**
         * Perform a minimum ammount of operations, in order to transform the decorations
         * identified by `oldDecorations` to the decorations described by `newDecorations`
         * and returns the new identifiers associated with the resulting decorations.
         * 
         * @param oldDecorations Array containing previous decorations identifiers.
         * @param newDecorations Array describing what decorations should result after the call.
         * @param ownerId Identifies the editor id in which these decorations should appear. If no `ownerId` is provided, the decorations will appear in all editors that attach this model.
         * @return An array containing the new decorations identifiers.
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[], ownerId?: number): string[];

        /**
         * Remove all decorations that have been added with this specific ownerId.
         * @param ownerId The owner id to search for.
         */
        removeAllDecorationsWithOwnerId(ownerId: number): void;

        /**
         * Get the options associated with a decoration.
         * @param id The decoration id.
         * @return The decoration options or null if the decoration was not found.
         */
        getDecorationOptions(id: string): IModelDecorationOptions;

        /**
         * Get the range associated with a decoration.
         * @param id The decoration id.
         * @return The decoration range or null if the decoration was not found.
         */
        getDecorationRange(id: string): IEditorRange;

        /**
         * Gets all the decorations for the line `lineNumber` as an array.
         * @param lineNumber The line number
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getLineDecorations(lineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

        /**
         * Gets all the decorations for the lines between `startLineNumber` and `endLineNumber` as an array.
         * @param startLineNumber The start line number
         * @param endLineNumber The end line number
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getLinesDecorations(startLineNumber: number, endLineNumber: number, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

        /**
         * Gets all the deocorations in a range as an array. Only `startLineNumber` and `endLineNumber` from `range` are used for filtering.
         * So for now it returns all the decorations on the same line as `range`.
         * @param range The range to search in
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         * @return An array with the decorations
         */
        getDecorationsInRange(range: IRange, ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];

        /**
         * Gets all the decorations as an array.
         * @param ownerId If set, it will ignore decorations belonging to other owners.
         * @param filterOutValidation If set, it will ignore decorations specific to validation (i.e. warnings, errors).
         */
        getAllDecorations(ownerId?: number, filterOutValidation?: boolean): IModelDecoration[];
    }

    /**
     * An editable text model.
     */
    export interface IEditableTextModel extends ITextModelWithMarkers
    {
        /**
         * Change (Edit) the model. The callback will called with a change accessor
         * that becomes invalid as soon as the callback finishes executing.
         * This allows for all events to be queued up until the change is completed.
         * Returns whatever the callback returns.
         */
        change(callback: (changeAccessor: IModelChangeAccessor) => any): any;

        /**
         * Push a stack element onto the undo stack. This acts as an undo/redo point.
         * The idea is to use `pushEditOperations` to edit the model and then to
         * `pushStackElement` to create an undo/redo stop point. 
         */
        pushStackElement(): void;

        /**
         * Push edit operations, basically editing the model. This is the preferred way
         * of editing the model. The edit operations will land on the undo stack.
         * @param beforeCursorState The cursor state before the edit operaions. This cursor state will be returned when `undo` or `redo` are invoked.
         * @param editOperations The edit operations.
         * @param cursorStateComputer A callback that can compute the resulting cursors state after the edit operations have been executed.
         * @return The cursor state returned by the `cursorStateComputer`.
         */
        pushEditOperations(beforeCursorState: IEditorSelection[], editOperations: ISingleEditOperation[], cursorStateComputer: ICursorStateComputer): IEditorSelection[];

        /**
         * Undo edit operations until the first previous stop point created by `pushStackElement`.
         * The inverse edit operations will be pushed on the redo stack.
         */
        undo(): IEditorSelection[];

        /**
         * Redo edit operations until the next stop point created by `pushStackElement`.
         * The inverse edit operations will be pushed on the undo stack.
         */
        redo(): IEditorSelection[];

        /**
         * Set an editable range on the model.
         */
        setEditableRange(range: IRange): void;

        /**
         * Check if the model has an editable range.
         */
        hasEditableRange(): boolean;

        /**
         * Get the editable range on the model.
         */
        getEditableRange(): IEditorRange;
    }

    /**
     * A model.
     */
    export interface IModel extends IEditableTextModel, ITextModelWithMarkers, ITokenizedModel, ITextModelWithTrackedRanges, ITextModelWithDecorations, IEventEmitter, IEditorModel
    {
        /**
         * A unique identifier associated with this model.
         */
        id: string;

        /**
         * Destroy this model. This will unbind the model from the mode
         * and make all necessary clean-up to release this object to the GC.
         */
        destroy(): void;

        /**
         * Set a property on the model. This property will be forwarded to the 
         * mirror model associated with this model. Please make sure that the
         * value can be serialized. If a property by the same name exists,
         * it will be overwritten.
         */
        setProperty(name: string, value: any): void;

        /**
         * Returns a property previously set on the model.
         * If the property is not defined, returns null.
         */
        getProperty(name: string): any;

        /**
         * Returns all properties set on the model.
         */
        getProperties(): { [name: string]: any; };

        /**
         * Gets the resource associated with this editor model.
         */
        getAssociatedResource(): any;//Network.URL;

        /**
         * Search the model.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchOnlyEditableRange Limit the searching to only search inside the editable range of the model.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @return The ranges where the matches are. It is empty if not matches have been found. 
         */
        findMatches(searchString: string, searchOnlyEditableRange: boolean, isRegex: boolean, matchCase: boolean, wholeWord: boolean): IEditorRange[];
        /**
         * Search the model.
         * @param searchString The string used to search. If it is a regular expression, set `isRegex` to true.
         * @param searchScope Limit the searching to only search inside this range.
         * @param isRegex Used to indicate that `searchString` is a regular expression.
         * @param matchCase Force the matching to match lower/upper case exactly.
         * @param wholeWord Force the matching to match entire words only.
         * @return The ranges where the matches are. It is empty if not matches have been found.
         */
        findMatches(searchString: string, searchScope: IRange, isRegex: boolean, matchCase: boolean, wholeWord: boolean): IEditorRange[];

        /**
         * Replace the entire text buffer value contained in this model.
         * Optionally, the language mode of the model can be changed.
         * This call clears all of the undo / redo stack,
         * removes all decorations or tracked ranges, emits a
         * ModelContentChanged(ModelContentChangedFlush) event and 
         * unbinds the mirror model from the previous mode to the new
         * one if the mode has changed.
         */
        setValue(newValue: string, newMode?: IMode): void;
    }

    /**
     * An event describing that the current mode associated with a model has changed.
     */
    export interface IModelModeChangedEvent
    {
        /**
         * Previous mode
         */
        oldMode: IMode;
        /**
         * New mode
         */
        newMode: IMode;
    }

    /**
     * An event describing a change in the text of a model.
     */
    export interface IModelContentChangedEvent
    {
        /**
         * The event type. It can be used to detect the actual event type:
         * 		Constants.EventType.ModelContentChangedFlush => IModelContentChangedFlushEvent
         * 		Constants.EventType.ModelContentChangedLinesDeleted => IModelContentChangedLineChangedEvent
         * 		Constants.EventType.ModelContentChangedLinesInserted => IModelContentChangedLinesDeletedEvent
         * 		Constants.EventType.ModelContentChangedLineChanged => IModelContentChangedLinesInsertedEvent
         */
        changeType: string;
        /**
         * The new version id the model has transitioned to.
         */
        versionId: number;
        /**
         * Flag that indicates that this event was generated while undoing.
         */
        isUndoing: boolean;
        /**
         * Flag that indicates that this event was generated while redoing.
         */
        isRedoing: boolean;
    }
    /**
     * An event describing that a model has been reset to a new value.
     */
    export interface IModelContentChangedFlushEvent extends IModelContentChangedEvent
    {
        /**
         * The new text content of the model.
         */
        detail: string;
    }
    /**
     * An event describing that a line has changed in a model.
     */
    export interface IModelContentChangedLineChangedEvent extends IModelContentChangedEvent
    {
        /**
         * The line that has changed.
         */
        lineNumber: number;
        /**
         * The new value of the line.
         */
        detail: string;
    }
    /**
     * An event describing that line(s) have been deleted in a model.
     */
    export interface IModelContentChangedLinesDeletedEvent extends IModelContentChangedEvent
    {
        /**
         * At what line the deletion began (inclusive).
         */
        fromLineNumber: number;
        /**
         * At what line the deletion stopped (inclusive).
         */
        toLineNumber: number;
    }
    /**
     * An event describing that line(s) have been inserted in a model.
     */
    export interface IModelContentChangedLinesInsertedEvent extends IModelContentChangedEvent
    {
        /**
         * Before what line did the insertion begin 
         */
        fromLineNumber: number;
        /**
         * `toLineNumber` - `fromLineNumber` + 1 denotes the number of lines that were inserted
         */
        toLineNumber: number;
        /**
         * The text that was inserted
         */
        detail: string;
    }
    /**
     * An event describing that model properties have changed.
     */
    export interface IModelPropertiesChangedEvent
    {
        /**
         * A map with all the properties of the model.
         */
        properties: {
            [key: string]: any;
        };
    }
    /**
     * Decoration data associated with a model decorations changed event.
     */
    export interface IModelDecorationsChangedEvent_DecorationData
    {
        id: string;
        ownerId: number;
        range: IRange;
        isForValidation: boolean;
        options: IModelDecorationOptions;
    }
    /**
     * An event describing that model decorations have changed.
     */
    export interface IModelDecorationsChangedEvent
    {
        /**
         * A summary with ids of decorations that have changed.
         */
        ids: string[];
        /**
         * Lists of details
         */
        addedOrChangedDecorations: IModelDecorationsChangedEvent_DecorationData[];
        removedDecorations: string[];
        oldOptions: { [decorationId: string]: IModelDecorationOptions; };
        oldRanges: { [decorationId: string]: IRange; };
    }
    /**
     * An event describing that a range of lines has been tokenized
     */
    export interface IModelTokensChangedEvent
    {
        /**
         * The start of the range (inclusive)
         */
        fromLineNumber: number;
        /**
         * The end of the range (inclusive)
         */
        toLineNumber: number;
    }
    /**
     * An event describing that the cursor position has changed.
     */
    export interface ICursorPositionChangedEvent
    {
        /**
         * Primary cursor's position.
         */
        position: IEditorPosition;
        /**
         * Primary cursor's view position
         */
        viewPosition: IEditorPosition;
        /**
         * Secondary cursors' position.
         */
        secondaryPositions: IEditorPosition[];
        /**
         * Secondary cursors' view position.
         */
        secondaryViewPositions: IEditorPosition[];
        /**
         * Reason.
         */
        reason: string;
        /**
         * Source of the call that caused the event.
         */
        source: string;
        /**
         * Is the primary cursor in the editable range?
         */
        isInEditableRange: boolean;
    }
    /**
     * An event describing that the cursor selection has changed.
     */
    export interface ICursorSelectionChangedEvent
    {
        /**
         * The primary selection.
         */
        selection: IEditorSelection;
        /**
         * The secondary selections.
         */
        secondarySelections: IEditorSelection[];
        /**
         * Source of the call that caused the event.
         */
        source: string;
        /**
         * Reason.
         */
        reason: string;
    }
    /**
     * An event describing a request to reveal a specific range in the view of the editor.
     */
    export interface ICursorRevealRangeEvent
    {
        /**
         * Range to be reavealed.
         */
        range: IEditorRange;
        /**
         * View range to be reavealed.
         */
        viewRange: IEditorRange;
        /**
         * Should the range be revealed in the center of the editor's viewport (vertically)?
         */
        revealVerticalInCenter: boolean;
        /**
         * If true: there should be a horizontal & vertical revealing
         * If false: there should be just a vertical revealing
         */
        revealHorizontal: boolean;
    }

    /**
     * A view zone is a full horizontal rectangle that 'pushes' text down.
     * The editor reserves space for view zones when rendering.
     */
    export interface IViewZone
    {
        /**
         * The line number after which this zone should appear.
         * Use 0 to place a view zone before the first line number.
         */
        afterLineNumber: number;
        /**
         * The column after which this zone should appear.
         * If not set, the maxLineColumn of `afterLineNumber` will be used.
         */
        afterColumn?: number;
        /**
         * Suppress mouse down events.
         * If set, the editor will attach a mouse down listener to the view zone and .preventDefault on it.
         * Defaults to false
         */
        suppressMouseDown?: boolean;
        /**
         * The height in lines of the view zone
         */
        heightInLines: number;
        /**
         * The dom node of the view zone
         */
        domNode: HTMLElement;
        /**
         * Callback which gives the relative top of the view zone as it appears (taking scrolling into account).
         */
        onDomNodeTop?: (top: number) => void;
        /**
         * Callback which gives the height in pixels of the view zone.
         */
        onComputedHeight?: (height: number) => void;
    }
    /**
     * An accessor that allows for zones to be added or removed.
     */
    export interface IViewZoneChangeAccessor
    {
        /**
         * Create a new view zone.
         * @param zone Zone to create
         * @return A unique identifier to the view zone.
         */
        addZone(zone: IViewZone): number;
        /**
         * Remove a zone
         * @param id A unique identifier to the view zone, as returned by the `addZone` call.
         */
        removeZone(id: number): void;
    }

    /**
     * A description for the overview ruler position.
     */
    export interface IOverviewRulerPosition
    {
        /**
         * Width of the overview ruler
         */
        width: number;
        /**
         * Height of the overview ruler
         */
        height: number;
        /**
         * Top position for the overview ruler
         */
        top: number;
        /**
         * Right position for the overview ruler
         */
        right: number;
    }
    /**
     * The internal layout details of the editor.
     */
    export interface IEditorLayoutInfo
    {
        /**
         * Full editor width.
         */
        width: number;
        /**
         * Full editor height.
         */
        height: number;

        /**
         * Left position for the glyph margin.
         */
        glyphMarginLeft: number;
        /**
         * The width of the glyph margin.
         */
        glyphMarginWidth: number;
        /**
         * The height of the glyph margin.
         */
        glyphMarginHeight: number;

        /**
         * Left position for the line numbers.
         */
        lineNumbersLeft: number;
        /**
         * The width of the line numbers.
         */
        lineNumbersWidth: number;
        /**
         * The height of the line numbers.
         */
        lineNumbersHeight: number;

        /**
         * Left position for the line decorations.
         */
        decorationsLeft: number;
        /**
         * The width of the line decorations.
         */
        decorationsWidth: number;
        /**
         * The height of the line decorations.
         */
        decorationsHeight: number;

        /**
         * Left position for the content (actual text)
         */
        contentLeft: number;
        /**
         * The width of the content (actual text)
         */
        contentWidth: number;
        /**
         * The height of the content (actual height)
         */
        contentHeight: number;

        /**
         * The width of the vertical scrollbar.
         */
        verticalScrollbarWidth: number;
        /**
         * The height of the horizontal scrollbar.
         */
        horizontalScrollbarHeight: number;

        /**
         * The position of the overview ruler.
         */
        overviewRuler: IOverviewRulerPosition;
    }

    /**
     * A positioning preference for rendering content widgets.
     */
    export enum ContentWidgetPositionPreference
    {
        /**
         * Place the content widget exactly at a position
         */
        EXACT,
        /**
         * Place the content widget above a position
         */
        ABOVE,
        /**
         * Place the content widget below a position
         */
        BELOW
    }
    /**
     * A position for rendering content widgets.
     */
    export interface IContentWidgetPosition
    {
        /**
         * Desired position for the content widget.
         * `preference` will also affect the placement.
         */
        position: IPosition;
        /**
         * Placement preference for position, in order of preference.
         */
        preference: ContentWidgetPositionPreference[];
    }
    /**
     * A content widget renders inline with the text and can be easily placed 'near' an editor position.
     */
    export interface IContentWidget
    {
        /**
         * Get a unique identifier of the content widget.
         */
        getId(): string;
        /**
         * Get the dom node of the content widget.
         */
        getDomNode(): HTMLElement;
        /**
         * Get the placement of the content widget.
         * If null is returned, the content widget will be placed off screen.
         */
        getPosition(): IContentWidgetPosition;
    }

    /**
     * A positioning preference for rendering overlay widgets.
     */
    export enum OverlayWidgetPositionPreference
    {
        /**
         * Position the overlay widget in the top right corner
         */
        TOP_RIGHT_CORNER,

        /**
         * Position the overlay widget in the bottom right corner
         */
        BOTTOM_RIGHT_CORNER,

        /**
         * Position the overlay widget in the top center
         */
        TOP_CENTER
    }
    /**
     * A position for rendering overlay widgets.
     */
    export interface IOverlayWidgetPosition
    {
        /**
         * The position preference for the overlay widget.
         */
        preference: OverlayWidgetPositionPreference;
    }
    /**
     * An overlay widgets renders on top of the text.
     */
    export interface IOverlayWidget
    {
        /**
         * Get a unique identifier of the overlay widget.
         */
        getId(): string;
        /**
         * Get the dom node of the overlay widget.
         */
        getDomNode(): HTMLElement;
        /**
         * Get the placement of the overlay widget.
         * If null is returned, the overlay widget is responsible to place itself.
         */
        getPosition(): IOverlayWidgetPosition;
    }

    /**
     * Options for creating the editor.
     */
    export interface ICodeEditorWidgetCreationOptions extends IEditorOptions
    {
        model?: IModel;
    }

    /**
     * An editor model.
     */
    export interface IEditorModel
    {
    }
    /**
     * An editor view state.
     */
    export interface IEditorViewState
    {
    }
    export interface IDimension
    {
        width: number;
        height: number;
    }
    /**
     * An editor.
     */
    export interface IEditor extends IEventEmitter
    {
        /**
         * Get the editor type. Current supported types:
         * 			Constants.EditorType.ICodeEditor => ICodeEditor;
         * 			Constants.EditorType.IDiffEditor => IDiffEditor;
         * This is to avoid an instanceof check
         */
        getEditorType(): string;

        /**
         * Destroy the editor.
         */
        destroy(): void;

        /**
         * Update the editor's options after the editor has been created.
         */
        updateOptions(newOptions: IEditorOptions): void;

        /**
         * Indicates that the editor becomes visible.
         */
        onVisible(): void;

        /**
         * Indicates that the editor becomes hidden.
         */
        onHide(): void;

        /**
         * Instructs the editor to remeasure its container. This method should
         * be called when the container of the editor gets resized.
         */
        layout(dimension?: IDimension): void;

        /**
         * Brings browser focus to the editor
         */
        focus(): void;

        /**
         * Returns true if this editor has keyboard focus.
         */
        isFocused(): boolean;

        /**
         * Returns all actions associated with this editor.
         */
        getActions(): any[]; //IAction[];

        /**
         * Saves current view state of the editor in a serializable object.
         */
        saveViewState(): IEditorViewState;

        /**
         * Restores the view state of the editor from a serializable object generated by `saveViewState`.
         */
        restoreViewState(state: IEditorViewState): void;

        /**
         * Returns the primary selection of the editor.
         */
        getSelection(): IEditorSelection;

        /**
         * Returns all the selections of the editor.
         */
        getSelections(): IEditorSelection[];

        /**
         * Gets the current model attached to this editor.
         */
        getModel(): IEditorModel;

        /**
         * Sets the current model attached to this editor.
         * If the previous model was created by the editor via the value key in the options
         * literal object, it will be destroyed. Otherwise, if the previous model was set
         * via setModel, or the model key in the options literal object, the previous model
         * will not be destroyed.
         * It is safe to call setModel(null) to simply detach the current model from the editor.
         */
        setModel(model: IEditorModel): void;
    }

    /**
     * A (serializable) state of the cursors.
     */
    export interface ICursorState
    {
        inSelectionMode: boolean;
        selectionStart: IPosition;
        position: IPosition;
    }
    /**
     * A (serializable) state of the view.
     */
    export interface IViewState
    {
        scrollTop: number;
        scrollLeft: number;
    }
    /**
     * A (serializable) state of the code editor.
     */
    export interface ICodeEditorViewState extends IEditorViewState
    {
        cursorState: ICursorState[];
        viewState: IViewState;
    }

    /**
     * Type of hit element with the mouse in the editor.
     */
    export enum MouseTargetType
    {
        /**
         * Mouse is on top of an unknown element.
         */
        UNKNOWN,
        /**
         * Mouse is on top of the textarea used for input.
         */
        TEXTAREA,
        /**
         * Mouse is on top of the glyph margin
         */
        GUTTER_GLYPH_MARGIN,
        /**
         * Mouse is on top of the line numbers
         */
        GUTTER_LINE_NUMBERS,
        /**
         * Mouse is on top of the line decorations
         */
        GUTTER_LINE_DECORATIONS,
        /**
         * Mouse is on top of the whitespace left in the gutter by a view zone.
         */
        GUTTER_VIEW_ZONE,
        /**
         * Mouse is on top of text in the content.
         */
        CONTENT_TEXT,
        /**
         * Mouse is on top of empty space in the content (e.g. after line text or below last line)
         */
        CONTENT_EMPTY,
        /**
         * Mouse is on top of a view zone in the content.
         */
        CONTENT_VIEW_ZONE,
        /**
         * Mouse is on top of a content widget.
         */
        CONTENT_WIDGET,
        /**
         * Mouse is on top of the decorations overview ruler.
         */
        OVERVIEW_RULER,
        /**
         * Mouse is on top of a scrollbar.
         */
        SCROLLBAR,
        /**
         * Mouse is on top of an overlay widget.
         */
        OVERLAY_WIDGET
    }

    /**
     * Target hit with the mouse in the editor.
     */
    export interface IMouseTarget
    {
        /**
         * The target element
         */
        element: Element;
        /**
         * The target type
         */
        type: MouseTargetType;
        /**
         * The 'approximate' editor position
         */
        position: IEditorPosition;
        /**
         * The 'approximate' editor range
         */
        range: IEditorRange;
        /**
         * Some extra detail.
         */
        detail: any;
    }
    /**
     * A mouse event originating from the editor.
     */
    export interface IMouseEvent
    {
        event: any;//Mouse.StandardMouseEvent;
        target: IMouseTarget;
    }
    /**
     * An editor contribution that gets created every time a new editor gets created and gets disposed when the editor gets disposed.
     */
    export interface IEditorContribution
    {
        /**
         * Get a unique identifier for this contribution.
         */
        getId(): string;
        /**
         * Dispose this contribution.
         */
        dispose(): void;
    }
    export interface ISimpleEditorContributionCtor extends IConstructorSignature1<ICodeEditor, IEditorContribution>
    {
    }
    export interface IEditorActionContributionCtor extends IConstructorSignature2<IEditorActionDescriptorData, ICodeEditor, IEditorContribution>
    {
    }
    /**
     * An editor contribution descriptor that will be used to construct editor contributions
     */
    export interface IEditorContributionDescriptor
    {
        /**
         * Create an instance of the contribution
         */
        createInstance(instantiationService: IInstantiationService, editor: ICodeEditor): IEditorContribution;
    }
    /**
     * Data associated with an editor action contribution
     */
    export interface IEditorActionDescriptorData
    {
        id: string;
        label: string;
        keybindings: any[];//IKeybinding[];
    }
    /**
     * A zone in the overview ruler
     */
    export interface IOverviewRulerZone
    {
        startLineNumber: number;
        endLineNumber: number;
        forceHeight?: number;
        color: string;
        position: OverviewRulerLane;
    }
    /**
     * An overview ruler
     */
    export interface IOverviewRuler
    {
        getDomNode(): HTMLElement;
        dispose(): void;
        setZones(zones: IOverviewRulerZone[]): void;
        setLayout(position: IOverviewRulerPosition): void;
    }
    /**
     * A rich code editor.
     */
    export interface ICodeEditor extends IEditor
    {

        /**
         * Type the getModel() of IEditor.
         */
        getModel(): IModel;

        /**
         * Returns the current editor's configuration
         */
        getConfiguration(): IInternalEditorOptions;

        /**
         * Returns the 'raw' editor's configuration, as it was applied over the defaults, but without any computed members.
         */
        getRawConfiguration(): IEditorOptions;

        /**
         * Computed indentation options.
         * If either one of the `tabSize` and `insertSpaces` options is set to 'auto', this is computed based on the current attached model.
         * Otherwise, they are equal to `tabSize` and `insertSpaces`.
         */
        getIndentationOptions(): IInternalIndentationOptions;

        /**
         * Normalize whitespace using the editor's whitespace specific settings
         */
        normalizeIndentation(str: string): string;

        /**
         * Get value of the current model attached to this editor.
         * @see IModel.getValue
         */
        getValue(options?: { preserveBOM: boolean; lineEnding: string; }): string;

        /**
         * Set the value of the current model attached to this editor.
         * @see IModel.setValue
         */
        setValue(newValue: string): void;

        /**
         * Returns the editor's dom node
         */
        getDomNode(): HTMLElement;

        /**
         * Returns the primary position of the cursor.
         */
        getPosition(): IEditorPosition;

        /**
         * Set the primary position of the cursor. This will remove any secondary cursors.
         * @param position New primary cursor's position
         * @param reveal Should move editor's viewport to reveal new position?
         * @param revealVerticalInCenter Should move editor's viewport to reveal new position in center (vertically)?
         * @param revealHorizontal Should move editor's viewport to reveal position horizontally?
         */
        setPosition(position: IPosition, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;

        /**
         * Scroll as necessary and reveal a position.
         * @param position The position to reveal
         * @param revealVerticalInCenter Should move editor's viewport to reveal position in center (vertically)?
         * @param revealHorizontal Should move editor's viewport to reveal position horizontally?
         */
        revealPosition(position: IPosition, revealVerticalInCenter: boolean, revealHorizontal: boolean): void;

        /**
         * Scroll as necessary and reveal a range.
         * @param range The range to reveal
         * @param revealVerticalInCenter Should move editor's viewport to reveal range in center (vertically)?
         * @param revealHorizontal Should move editor's viewport to reveal range horizontally?
         */
        revealRange(range: IRange, revealVerticalInCenter: boolean, revealHorizontal: boolean): void;

        /**
         * Set the primary selection of the editor. This will remove any secondary cursors.
         * @param selection The new selection
         * @param reveal Should move editor's viewport to reveal new selection?
         * @param revealVerticalInCenter Should move editor's viewport to reveal selection in center (vertically)?
         * @param revealHorizontal Should move editor's viewport to reveal selection horizontally?
         */
        setSelection(selection: IRange, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: IEditorRange, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: ISelection, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: IEditorSelection, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;

        /**
         * Set the selections for all the cursors of the editor.
         * Cursors will be removed or added, as necessary.
         */
        setSelections(selections: ISelection[]): void;

        /**
         * Change the scrollTop of the editor's viewport.
         */
        setScrollTop(newScrollTop: number): void;

        /**
         * Get the scrollTop of the editor's viewport.
         */
        getScrollTop(): number;

        /**
         * Change the scrollLeft of the editor's viewport.
         */
        setScrollLeft(newScrollLeft: number): void;
        /**
         * Get the scrollLeft of the editor's viewport.
         */
        getScrollLeft(): number;

        /**
         * Get an action that is a contribution to this editor.
         * @id Unique identifier of the contribution.
         * @return The action or null if action not found.
         */
        getAction(id: string): any;//Actions.IAction;

        /**
         * Get a contribution of this editor.
         * @id Unique identifier of the contribution.
         * @return The contribution or null if contribution not found.
         */
        getContribution(id: string): IEditorContribution;

        /**
         * Directly trigger a handler or an editor action.
         * @param source The source of the call.
         * @param handlerId The id of the handler or the id of a contribution.
         * @param payload Extra data to be sent to the handler.
         */
        trigger(source: string, handlerId: string, payload: any): void;

        /**
         * Execute a command on the editor.
         * @param source The source of the call.
         * @param command The command to execute
         */
        executeCommand(source: string, command: ICommand): boolean;

        /**
         * Execute multiple (concommitent) commands on the editor.
         * @param source The source of the call.
         * @param command The commands to execute
         */
        executeCommands(source: string, commands: ICommand[]): boolean;

        /**
         * Add a content widget. Widgets must have unique ids, otherwise they will be overwritten.
         */
        addContentWidget(widget: IContentWidget): void;
        /**
         * Layout/Reposition a content widget. This is a ping to the editor to call widget.getPosition()
         * and update appropiately.
         */
        layoutContentWidget(widget: IContentWidget): void;
        /**
         * Remove a content widget.
         */
        removeContentWidget(widget: IContentWidget): void;

        /**
         * Add an overlay widget. Widgets must have unique ids, otherwise they will be overwritten.
         */
        addOverlayWidget(widget: IOverlayWidget): void;
        /**
         * Layout/Reposition an overlay widget. This is a ping to the editor to call widget.getPosition()
         * and update appropiately.
         */
        layoutOverlayWidget(widget: IOverlayWidget): void;
        /**
         * Remove an overlay widget.
         */
        removeOverlayWidget(widget: IOverlayWidget): void;

        /**
         * Change the decorations. All decorations added through this changeAccessor
         * will get the ownerId of the editor (meaning they will not show up in other
         * editors).
         * @see IModel.changeDecorations
         */
        changeDecorations(callback: (changeAccessor: IModelDecorationsChangeAccessor) => any): any;

        /**
         * Get all the decorations on a line (filtering out decorations from other editors).
         */
        getLineDecorations(lineNumber: number): IModelDecoration[];

        /**
         * All decorations added through this call wii get the ownerId of this editor.
         * @see IModel.deltaDecorations
         */
        deltaDecorations(oldDecorations: string[], newDecorations: IModelDeltaDecoration[]): string[];

        /**
         * Change the view zones. View zones are lost when a new model is attached to the editor.
         */
        changeViewZones(callback: (accessor: IViewZoneChangeAccessor) => void): void;

        /**
         * This listener is notified when a keypress produces a visible character.
         * The callback should not do operations on the view, as the view might not be updated to reflect previous typed characters.
         * @param character Character to listen to.
         * @param callback Function to call when `character` is typed.
         */
        addTypingListener(character: string, callback: () => void): ListenerUnbind;

        /**
         * Get the horizontal position (left offset) for the column w.r.t to the beginning of the line.
         * This method works only if the line `lineNumber` is currently rendered (in the editor's viewport).
         * Use this method with caution.
         */
        getOffsetForColumn(lineNumber: number, column: number): number;

        /**
         * Get the vertical position (top offset) for the line w.r.t. to the first line.
         */
        getTopForLineNumber(lineNumber: number): number;

        /**
         * Get the visible position for `position`.
         * The result position takes scrolling into account and is relative to the top left corner of the editor.
         * Explanation 1: the results of this method will change for the same `position` if the user scrolls the editor.
         * Explanation 2: the results of this method will not change if the container of the editor gets repositioned.
         * Warning: the results of this method are innacurate for positions that are outside the current editor viewport.
         */
        getScrolledVisiblePosition(position: IPosition): { top: number; left: number; height: number; };

        /**
         * Get the layout info for the editor.
         */
        getLayoutInfo(): IEditorLayoutInfo;

        /**
         * Prevent the editor from sending a widgetFocusLost event,
         * set it in a state where it believes that focus is in one of its widgets.
         * Use this method with care and always add a matching `endForcedWidgetFocus`
         */
        beginForcedWidgetFocus(): void;

        /**
         * End the preventing of sending a widgetFocusLost event.
         */
        endForcedWidgetFocus(): void;
    }

    /**
     * A model for the diff editor.
     */
    export interface IDiffEditorModel extends IEditorModel
    {
        /**
         * Original model.
         */
        original: IModel;
        /**
         * Modified model.
         */
        modified: IModel;
    }
    /**
     * (Serializable) View state for the diff editor.
     */
    export interface IDiffEditorViewState extends IEditorViewState
    {
        original: ICodeEditorViewState;
        modified: ICodeEditorViewState;
    }
    /**
     * A change
     */
    export interface IChange
    {
        originalStartLineNumber: number;
        originalEndLineNumber: number;
        modifiedStartLineNumber: number;
        modifiedEndLineNumber: number;
    }
    /**
     * A character level change.
     */
    export interface ICharChange extends IChange
    {
        originalStartColumn: number;
        originalEndColumn: number;
        modifiedStartColumn: number;
        modifiedEndColumn: number;
    }
    /**
     * A line change
     */
    export interface ILineChange extends IChange
    {
        charChanges: ICharChange[];
    }
    /**
     * A rich diff editor.
     */
    export interface IDiffEditor extends IEditor
    {
        /**
         * Type the getModel() of IEditor.
         */
        getModel(): IDiffEditorModel;

        getLineChanges(): ILineChange[];

        getOriginalEditor(): ICodeEditor;
        getModifiedEditor(): ICodeEditor;

        /**
         * @see ICodeEditor.changeDecorations
         */
        changeDecorations(callback: (changeAccessor: IModelDecorationsChangeAccessor) => any): any;

        /**
         * @see ICodeEditor.getValue
         */
        getValue(options?: { preserveBOM: boolean; lineEnding: string; }): string;
        /**
         * @see ICodeEditor.getDomNode
         */
        getDomNode(): HTMLElement;
        /**
         * @see ICodeEditor.getPosition
         */
        getPosition(): IEditorPosition;
        /**
         * @see ICodeEditor.setPosition
         */
        setPosition(position: IPosition, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        /**
         * @see ICodeEditor.setSelection
         */
        setSelection(selection: IRange, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: IEditorRange, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: ISelection, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        setSelection(selection: IEditorSelection, reveal?: boolean, revealVerticalInCenter?: boolean, revealHorizontal?: boolean): void;
        /**
         * @see ICodeEditor.trigger
         */
        trigger(source: string, handlerId: string, payload: any): void;
    }


}
