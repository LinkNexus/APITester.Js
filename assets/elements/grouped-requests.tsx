import type Request from "#models/Request";
import { AbstractCustomElement } from "@/helpers/custom-elements";
import { MouseEventHandler, ReactNode, useState } from "react";

export default class GroupedRequests extends AbstractCustomElement {
    Element({ requests }: { requests: string }): ReactNode {
        const [groupedRequests, setGroupedRequests] = useState<Record<string, Request[]>>(JSON.parse(requests));

        const deleteRequest: MouseEventHandler<HTMLButtonElement> = (e) => {
            const requestId = e.currentTarget.dataset.requestId;
            if (!requestId) return;

            fetch(`/requests/${requestId}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        const updatedRequests = Object.entries(groupedRequests).reduce((acc, [date, requests]) => {
                            const filteredRequests = requests.filter((request) => request.id !== Number(requestId));
                            if (filteredRequests.length > 0) {
                                acc[date] = filteredRequests;
                            }
                            return acc;
                        }, {} as Record<string, Request[]>);

                        setGroupedRequests(updatedRequests);
                    }
                })
                .catch((error) => {
                    console.error("Error deleting request:", error);
                });
        }

        return (
            <div className="flex flex-col gap-8 w-full">
                {Object.entries(groupedRequests).map(([date, requests]) => (
                    <div className="w-full" key={date}>
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold">
                                {requests.length} Request{requests.length !== 1 && "s"} on
                                <span className="text-primary">
                                    {" "}
                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })},
                                    {" "}
                                    {new Date(date).toLocaleDateString('en-US', { month: 'long' })}{" "}
                                    {new Date(date).toLocaleDateString('en-US', { day: '2-digit' })},
                                    {" "}
                                    {new Date(date).toLocaleDateString('en-US', { year: 'numeric' })}
                                </span>
                            </h2>
                            <hr />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {requests.map((request) => (
                                <div
                                    className="bg-accent-2 not-last-of-type:w-full p-4 shadow-lg hover:shadow-xl rounded-lg border border-primary transition-shadow duration-300"
                                    key={request.id}
                                >
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <span className="text-lg font-semibold">Request Type:</span>
                                            <span className="text-gray-500 block">{request.requestType}</span>
                                        </div>
                                        <div>
                                            <span className="text-lg font-semibold">Request URL:</span>
                                            <span
                                                className="text-gray-500 block overflow-hidden text-ellipsis whitespace-nowrap max-h-6"
                                                title={request.url}
                                            >
                                                {request.url}
                                            </span>
                                        </div>
                                        {request.method != "undefined" && (
                                            <div>
                                                <span className="text-lg font-semibold">Method:</span>
                                                <span className="text-gray-500 block">{request.method}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-2 mt-5 my-auto">
                                        <a
                                            href={`/requests/${request.id}`}
                                            className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-primary rounded-full clickable shadow-md hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </a>
                                        <button data-request-id={request.id} onClick={deleteRequest} className="flex items-center justify-center w-10 h-10 bg-red-700 hover:bg-red-500 rounded-full clickable shadow-md hover:shadow-lg transition-shadow duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}