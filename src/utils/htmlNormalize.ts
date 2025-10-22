export type NormalizeOptions = {
  promoteFirstRowToThead: boolean; // 첫 행을 thead로 올릴지
  defaultCellStyle: string; // 셀 기본 스타일
  tableStyle: string; // 테이블 기본 스타일
};

const DEFAULTS: NormalizeOptions = {
  promoteFirstRowToThead: false,
  defaultCellStyle: "border:1px solid #ccc; padding:6px;",
  tableStyle: "border-collapse:collapse; width:100%",
};

export function normalizeQuillBetterTable(
  inputHtml: string,
  opts?: Partial<NormalizeOptions>
): string {
  const opt = { ...DEFAULTS, ...(opts ?? {}) };

  const parser = new DOMParser();
  const doc = parser.parseFromString(inputHtml, "text/html");

  // 임시 태그 제거 (<temporary class="ql-table-temporary" ...>)
  doc
    .querySelectorAll("temporary.ql-table-temporary")
    .forEach((tmp) => tmp.remove());

  // ql-table-better 테이블만 정규화
  const tables = doc.querySelectorAll<HTMLTableElement>(
    "table.ql-table-better, table[data-ql-table-better]"
  );
  tables.forEach((table) => {
    // table 기본 스타일 세팅
    table.setAttribute("style", opt.tableStyle);

    // tbody/thead 재구성 옵션
    const rows: HTMLTableRowElement[] = Array.from(
      table.querySelectorAll("tr")
    );
    if (rows.length === 0) return;

    // 필요 시 thead 승격
    if (opt.promoteFirstRowToThead) {
      let thead = table.querySelector("thead");
      if (!thead) {
        thead = doc.createElement("thead");
        table.insertBefore(thead, table.firstChild);
      }
      const firstRow = rows[0];
      // th로 변환
      const thRow = doc.createElement("tr");
      Array.from(firstRow.cells).forEach((td) => {
        const th = doc.createElement("th");
        th.innerHTML = innerCellHtml(td);
        // colspan/rowspan 유지
        copySpan(td, th);
        th.setAttribute("style", opt.defaultCellStyle);
        thRow.appendChild(th);
      });
      thead.appendChild(thRow);
      firstRow.remove();
    }

    // tbody 보장
    let tbody = table.querySelector("tbody");
    if (!tbody) {
      tbody = doc.createElement("tbody");
      table.appendChild(tbody);
    }

    // 모든 행/셀 정규화
    Array.from(table.querySelectorAll("tr")).forEach((tr) => {
      // thead로 올린 첫 행은 이미 제거했을 수 있음
      if (!tr.isConnected) return;

      Array.from(tr.cells).forEach((cell) => {
        // 내부 p.ql-table-block 등을 벗겨내고 순수 내용만 남김
        const html = innerCellHtml(cell);
        cell.innerHTML = html;

        // colspan/rowspan 유지
        copySpan(cell, cell);

        // 스타일 부여(있는 경우 유지)
        const prevStyle = cell.getAttribute("style");
        cell.setAttribute("style", mergeStyle(prevStyle, opt.defaultCellStyle));

        // ql- 접두 클래스 및 data-* 제거
        stripQlAttrs(cell);
      });

      // tr 자체의 ql-* 클래스/속성 제거
      stripQlAttrs(tr);
      // tbody 안으로 강제 편입(혹시 밖에 있으면)
      if (tr.parentElement?.tagName.toLowerCase() !== "tbody") {
        tbody.appendChild(tr);
      }
    });

    // 마지막으로 table의 클래스/데이터 속성 제거
    stripQlAttrs(table);
  });

  return doc.body.innerHTML;
}

// <td><p class="ql-table-block"> ... </p></td> -> 내부 HTML만 추출
function innerCellHtml(cell: HTMLTableCellElement): string {
  const pBlocks = cell.querySelectorAll("p.ql-table-block");
  if (pBlocks.length === 0) {
    return cell.innerHTML; // 이미 순수 내용
  }
  let combined = "";
  pBlocks.forEach((p, idx) => {
    combined += p.innerHTML;
    if (idx !== pBlocks.length - 1) combined += "<br/>";
  });
  return combined || "&nbsp;";
}

function stripQlAttrs(el: Element) {
  // class에서 ql-* 제거
  if (el.classList.length) {
    const kept = Array.from(el.classList).filter((c) => !c.startsWith("ql-"));
    el.setAttribute("class", kept.join(" "));
    if (kept.length === 0) el.removeAttribute("class");
  }
  // data-* 제거
  Array.from(el.attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) el.removeAttribute(attr.name);
  });
}

function copySpan(fromCell: HTMLTableCellElement, toCell: HTMLElement) {
  const cs = fromCell.getAttribute("colspan");
  const rs = fromCell.getAttribute("rowspan");
  if (cs) toCell.setAttribute("colspan", cs);
  if (rs) toCell.setAttribute("rowspan", rs);
}

// 기존 style에 기본 셀 스타일을 덧씌우되, 중복 속성은 뒤쪽이 우선
function mergeStyle(prev: string | null, add: string): string {
  if (!prev) return add;
  const map: Record<string, string> = {};
  const apply = (s: string) =>
    s
      .split(";")
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const [k, v] = pair.split(":").map((y) => y.trim());
        if (k) map[k] = v ?? "";
      });
  apply(prev);
  apply(add);
  return Object.entries(map)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");
}
