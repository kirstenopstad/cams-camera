import clients from "@/data/clients";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {v4} from "uuid";

export default function Clients() {
    return (
        <div className="space-y-1 m-2">
            {
                clients.map((client) => {
                    return (
                        <div className="card w-1/2 md:w-1/4 2 max-w-[250px] bg-light" key={v4()}>
                            <div className="card-body relative p-2">
                                <img className="object-fill w-1/3 inline mb-1 mr-2 aspect-square" src={client.logo} alt={`${client.name}'s Logo`}/>
                                <p className="text-center inline ml-4 pl-6 mt-4 border-s border-black font-semibold">{client.name}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}