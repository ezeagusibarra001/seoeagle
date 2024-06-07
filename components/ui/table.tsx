interface TableData {
  key: string;
  content: React.ReactNode[];
}

interface TableType {
  title?: string;
  description?: string;
  cols: string[];
  data?: TableData[];
  noData?: string;
  callBack?: (key: string) => void;
  filters?: React.ReactNode;
  add?: React.ReactNode;
}

export default function Table({
  title,
  description,
  cols,
  data,
  noData = "Nada por aqui...",
  filters,
  callBack,
  add,
}: TableType) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold leading-6 text-violet">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray capitalize">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{add}</div>
      </div>
      <div className="flex gap-4 my-4 flex-wrap">{filters}</div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {cols.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {col}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">CTA</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((info) => (
                    <tr key={info.key}>
                      {info.content.map((content, index) => (
                        <td
                          key={index}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {content}
                        </td>
                      ))}
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {callBack && (
                          <button
                            onClick={() => callBack(info.key)}
                            className="text-violet underline hover:bg-violet hover:text-white rounded-sm p-2"
                          >
                            Más info
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data ||
                (data?.length === 0 && (
                  <div className="text-center flex justify-center items-center w-full h-[calc(100vh-20rem)]">
                    <p className="text-lg">{noData}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
