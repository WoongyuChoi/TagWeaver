declare module "@toast-ui/editor" {
  import Editor from "@toast-ui/editor/dist/toastui-editor";
  import type { EditorOptions as _EditorOptions } from "@toast-ui/editor/types/editor";
  import type { EventMap as _EventMap } from "@toast-ui/editor/types/event";
  export default Editor;
  export type EditorOptions = _EditorOptions;
  export type EventMap = _EventMap;
}

declare module "@toast-ui/editor/dist/toastui-editor-viewer" {
  const Viewer: any;
  export default Viewer;
  export interface ViewerOptions {
    el: HTMLElement;
    initialValue?: string;
    usageStatistics?: boolean;
  }
}
