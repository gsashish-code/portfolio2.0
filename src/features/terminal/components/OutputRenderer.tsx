import type { OutputLine } from '../types'

function OutputLineView({ line }: { line: OutputLine }) {
  switch (line.type) {
    case 'command':
      return (
        <p>
          <span className="text-[#8e8e93]">{line.prompt} </span>
          <span>{line.input}</span>
        </p>
      )

    case 'text':
      return (
        <p
          className={`whitespace-pre-line ${line.tone === 'muted' ? 'text-[#8e8e93]' : ''}`}
        >
          {line.content}
        </p>
      )

    case 'success':
      return <p className="text-[#32d74b]">✓ {line.content}</p>

    case 'error':
      return <p className="text-[#ff6b6b]">✗ {line.content}</p>

    case 'link':
      return (
        <a
          href={line.href}
          target="_blank"
          rel="noreferrer"
          className="text-[#0a84ff] underline"
        >
          {line.label}
        </a>
      )

    case 'table':
      return (
        <table className="my-1 w-full border-collapse text-left">
          <thead>
            <tr className="text-[#8e8e93]">
              <th className="pr-8 pb-1 font-normal">{line.headers[0]}</th>
              <th className="pb-1 font-normal">{line.headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            {line.rows.map((row) => (
              <tr key={row.cells[0]}>
                <td className="pr-8 align-top">
                  {row.ok !== undefined && (
                    <span
                      className={row.ok ? 'text-[#32d74b]' : 'text-[#ff6b6b]'}
                    >
                      {row.ok ? '✓ ' : '✗ '}
                    </span>
                  )}
                  {row.cells[0]}
                </td>
                <td className="align-top">{row.cells[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )

    case 'profile':
      return (
        <div className="my-1 flex gap-4">
          <span className="text-3xl leading-none">{line.avatar}</span>
          <dl className="space-y-0.5">
            {line.fields.map((field) => (
              <div key={field.label} className="flex gap-2">
                <dt className="w-20 shrink-0 text-[#8e8e93]">{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
  }
}

function OutputRenderer({ lines }: { lines: OutputLine[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <OutputLineView key={index} line={line} />
      ))}
    </>
  )
}

export default OutputRenderer
