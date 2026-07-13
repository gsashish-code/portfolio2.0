import { PROFILE_FIELDS } from '#database'

/** about://me — the same bio fields the terminal's `whoami` command prints. */
function AboutMe() {
  return (
    <div className="mx-auto max-w-md px-8 py-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl dark:bg-white/10">
        🧑‍💻
      </div>
      <dl className="space-y-3 text-left">
        {PROFILE_FIELDS.map((field) => (
          <div key={field.label} className="flex justify-between gap-4">
            <dt className="text-sm text-gray-500 dark:text-gray-400">
              {field.label}
            </dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default AboutMe
