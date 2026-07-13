import { locations } from '#database'

/** about://projects — the same project folders Finder's Work location lists. */
function AboutProjects() {
  const projects = locations.work.children

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h2 className="mb-6 text-lg font-bold text-[#ff375f]">Projects</h2>
      <ul className="space-y-6">
        {projects.map((project) => {
          const readme = project.children.find(
            (child) => child.fileType === 'txt',
          )
          const site = project.children.find(
            (child) => child.fileType === 'url',
          )

          return (
            <li key={project.id}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                📁 {project.name}
              </h3>
              {readme?.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {readme.description[0]}
                </p>
              )}
              {site?.href && (
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View live site &rsaquo;
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AboutProjects
