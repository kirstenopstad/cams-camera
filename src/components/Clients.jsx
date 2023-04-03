import clients from "@/data/clients"
import {v4} from "uuid";

export default function Clients() {
    return (
        <div>
            {
                clients.map((client) => {
                    return (
                        <div key={v4()}>
                            <p>{client.name}</p>
                            <img src={client.logo} alt={`${client.name}'s Logo`} />
                        </div>
                    )
                })
            }
        </div>
    )
}