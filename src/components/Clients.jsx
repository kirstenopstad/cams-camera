/* eslint-disable @next/next/no-img-element */
import clients from "@/data/clients";
import {v4} from "uuid";

export default function Clients() {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-10 m-4">
            {
                clients.map((client) => {
                    return (
                        <div className="w-20 h-auto" key={v4()}>
                            <div className="w-20 h-20 mb-2 bg-black rounded-full">
                                <img className="object-cover w-full h-full rounded-full" src={client.logo} alt={`${client.name}'s Logo`} />
                            </div>
                            <p className="pt-2 font-semibold text-center text-md">{client.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}