export function ResponseHeaders({ headers }: { headers: Headers }) {
    // const fakeHeaders = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer your-token-here',
    //     'Accept': 'application/json',
    //     'X-Request-ID': '12345',
    //     'X-Api-Version': '1.0',
    //     'Cache-Control': 'no-cache',
    //     'Pragma': 'no-cache',
    //     'User-Agent': 'MyApp/1.0',
    //     'X-Client-Platform': 'web',
    //     'X-Custom-Header': 'custom-value'
    // };

    // for (const [key, value] of Object.entries(fakeHeaders)) {
    //     headers.append(key, value);
    // }

    return (
        <div id="response-headers-section" className="special-container">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-primary uppercase border-b border-dashed border-primary">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-r border-dashed border-primary">
                                Header
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(headers.entries()).map(([key, value], i, arr) => (
                            <tr key={`header-${i}`} className={(i < arr.length - 1 ? 'border-b border-dashed border-primary ' : "") + "hover:bg-theme-secondary"}>
                                <td className="px-6 py-4 border-r border-primary dashed-borders">
                                    {key}
                                </td>
                                <td className="px-6 py-4 border-r border-primary dashed-borders">
                                    {value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}