export function buildSampleHtml(): string {
  const today = new Date().toISOString().slice(0, 10);
  const topics = ["Architecture", "Performance", "Security", "UX", "Testing"];
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return `
    <h2>${pick(topics)} Brief — ${today}</h2>
    <p>Hello <b>TagWeaver</b> team,</p>
    <p>We are evaluating <i>editor pipelines</i> for storing <u>HTML</u> into CLOB.
       Please review the <span style="color:#2a7">key points</span> below.</p>
    <ul>
      <li>Round-trip: Editor → HTML → DB → Editor</li>
      <li>Sanitization: DOMPurify in viewer</li>
      <li>Legacy tags: allow or normalize <code>&lt;font&gt;</code></li>
    </ul>
    <table style="border-collapse:collapse; width:100%">
      <thead>
        <tr>
          <th style="border:1px solid #ccc; padding:4px">Item</th>
          <th style="border:1px solid #ccc; padding:4px">Owner</th>
          <th style="border:1px solid #ccc; padding:4px">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #ccc; padding:4px">Schema & Styles</td>
          <td style="border:1px solid #ccc; padding:4px">FE</td>
          <td style="border:1px solid #ccc; padding:4px">In progress</td>
        </tr>
        <tr>
          <td style="border:1px solid #ccc; padding:4px">XSS Policy</td>
          <td style="border:1px solid #ccc; padding:4px">Infra</td>
          <td style="border:1px solid #ccc; padding:4px">Planned</td>
        </tr>
      </tbody>
    </table>
    <p>Regards,<br/><span style="font-weight:600">TagWeaver Bot</span></p>
  `;
}
