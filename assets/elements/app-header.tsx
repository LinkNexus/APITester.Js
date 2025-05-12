import { useEffect, useRef, useState } from "react";
import { AbstractCustomElement } from "@/helpers/custom-elements";

export default class AppHeader extends AbstractCustomElement {
    getTagName() {
        return "app-header";
    }

    Element() {
        const subMenuRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLHeadingElement>(null);
        function toggleMenu() {
            subMenuRef.current?.classList.toggle("hidden");
            subMenuRef.current?.classList.toggle("block");
        }

        useEffect(() => {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 0) {
                    headerRef.current?.classList.add("bg-black");
                } else {
                    headerRef.current?.classList.remove("bg-black");
                }
            })
        }, []);

        function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
            if (event.key === "Enter") {
                event.preventDefault();
                const $form = event.currentTarget.closest("form");
                $form?.submit();
            }
        }

        return (
            <header ref={headerRef} className="w-full sticky top-0 z-[5] overflow-y-auto">
                <div className="flex px-3 py-3 md:px-8 items-center justify-between gap-x-6 mb-5">
                    <div className="flex items-center flex-wrap gap-x-2 lg:ml-4">
                        <img className="w-12" src="/logo.png" alt="Logo" />
                        <span className="h-fit text-xl inline-block font-semibold">ApiTester.Js</span>
                    </div>

                    <form action="/search" method="POST" className="mx-auto hidden lg:block w-[40%]">
                        <input name="query" onKeyDown={handleSearch} type="search" className="w-full" placeholder="Search..." />
                    </form>

                    <div className="flex h-full w-fit items-center gap-x-6">
                        <div className="hover:bg-primary focus:bg-primary p-2 rounded clickable lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>

                        <nav>
                            <ul className="hidden md:flex h-full items-center gap-x-3">
                                <li>
                                    <a href="/" className="hover:text-primary-light">Create</a>
                                </li>
                                <li>
                                    <a href="/collections" className="hover:text-primary-light">Collections</a>
                                </li>
                                <li>
                                    <a href="/requests" className="hover:text-primary-light">History</a>
                                </li>
                                <li>
                                    <a href="/requests/import" className="hover:text-primary-light">Import</a>
                                </li>
                            </ul>

                            <div className="hover:bg-primary focus:bg-primary p-2 rounded clickable md:hidden" onClick={toggleMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="w-full hidden" ref={subMenuRef}>
                    <a href="/" className="bg-secondary w-full flex p-3 hover:bg-primary">
                        Create
                    </a>
                    <a href="/collections" className="bg-secondary w-full flex p-3 hover:bg-primary">
                        Collections
                    </a>
                    <a href="/requests" className="bg-secondary w-full flex p-3 hover:bg-primary">
                        History
                    </a>
                    <a href="/requests/import" className="bg-secondary w-full flex p-3 hover:bg-primary">
                        Import
                    </a>
                </div>
            </header>
        );
    }
}