import Editor, { EditorOptions, EventMap } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export interface EventMapping {
  onLoad?: EventMap["load"];
  onChange?: EventMap["change"];
  onCaretChange?: EventMap["caretChange"];
  onFocus?: EventMap["focus"];
  onBlur?: EventMap["blur"];
  onKeydown?: EventMap["keydown"];
  onKeyup?: EventMap["keyup"];
  onBeforePreviewRender?: EventMap["beforePreviewRender"];
  onBeforeConvertWysiwygToMarkdown?: EventMap["beforeConvertWysiwygToMarkdown"];
}

export type TuiEditorProps = Omit<
  EditorOptions,
  "el" | "events" | "usageStatistics"
> &
  EventMapping & { usageStatistics?: boolean };

export type TuiEditorHandle = { getInstance: () => Editor | null };

type TuiEventName = Extract<keyof EventMap, string>;

const TuiEditor = forwardRef<TuiEditorHandle, TuiEditorProps>((props, ref) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const instRef = useRef<Editor | null>(null);

  const { handlers, options } = useMemo(() => {
    const allKeys = Object.keys(props) as (keyof TuiEditorProps)[];
    const handlerKeys = allKeys.filter(
      (k) =>
        /^on[A-Z]/.test(String(k)) &&
        typeof props[k as keyof EventMapping] === "function"
    ) as (keyof EventMapping)[];
    const handlers = handlerKeys.reduce<Partial<EventMapping>>((acc, k) => {
      acc[k] = props[k] as any;
      return acc;
    }, {});
    const options: EditorOptions = {
      ...(props as Omit<TuiEditorProps, keyof EventMapping>),
    } as any;
    handlerKeys.forEach((k) => delete (options as any)[k]);
    return { handlers, options };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useImperativeHandle(ref, () => ({ getInstance: () => instRef.current }), []);

  useEffect(() => {
    if (!elRef.current) return;
    instRef.current = new Editor({
      ...options,
      el: elRef.current,
      usageStatistics: props.usageStatistics ?? false,
      events: getInitEvents(handlers),
    });
    handlers.onLoad?.(null as any);
    return () => {
      instRef.current?.destroy();
      instRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inst = instRef.current;
    if (!inst) return;

    if (props.height) {
      const h =
        typeof props.height === "number" ? `${props.height}px` : props.height;
      inst.setHeight(h);
    }
    if (props.previewStyle) inst.changePreviewStyle(props.previewStyle);

    // rebind handlers
    bindEventHandlers(inst, handlers);
  }, [
    props.height,
    props.previewStyle,
    handlers.onLoad,
    handlers.onChange,
    handlers.onCaretChange,
    handlers.onFocus,
    handlers.onBlur,
    handlers.onKeydown,
    handlers.onKeyup,
    handlers.onBeforePreviewRender,
    handlers.onBeforeConvertWysiwygToMarkdown,
  ]);

  return (
    <div
      ref={elRef}
      style={{ width: "100%", height: props.height ?? "100%" }}
    />
  );
});

export default TuiEditor;

/* ---------------- helpers ---------------- */

function getBindingEventNamesFromHandlers(h: Partial<EventMapping>) {
  return Object.keys(h).filter((k) =>
    /^on[A-Z]/.test(k)
  ) as (keyof EventMapping)[];
}

function mapOnXxxToEventName(key: keyof EventMapping): TuiEventName {
  const s = String(key);
  return (s.slice(2, 3).toLowerCase() + s.slice(3)) as TuiEventName; // onChange -> change
}

function bindEventHandlers(editor: Editor, handlers: Partial<EventMapping>) {
  getBindingEventNamesFromHandlers(handlers).forEach((key) => {
    const ev = mapOnXxxToEventName(key);
    editor.off(ev);
    editor.on(ev, (handlers as any)[key]);
  });
}

function getInitEvents(handlers: Partial<EventMapping>) {
  const entries = getBindingEventNamesFromHandlers(handlers).map((key) => {
    const ev = mapOnXxxToEventName(key);
    return [ev, (handlers as any)[key]] as const;
  });

  return entries.reduce<Record<TuiEventName, EventMap[TuiEventName]>>(
    (acc, [ev, fn]) => {
      (acc as any)[ev] = fn;
      return acc;
    },
    {} as any
  );
}
