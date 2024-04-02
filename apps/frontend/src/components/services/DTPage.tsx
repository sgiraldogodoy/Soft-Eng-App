import { Request, columns } from "./DTColumns"
import { DataTable } from "./DataTable"
import {useState, useEffect} from "react";

async function getData(): Promise<Request[]> {
    // Fetch data from your API here.
    return [
        {
            requester: "Dr. Amari",
            location: "Patient Wing",
            notes: 'Patient has requested "Carnations", to be delivered to Room 105. They have attached the following message: "Get Well Soon Grandpa!"',
        },
        {
            requester: "Dr. Bill",
            location: "Entrance",
            notes: 'Patient has requested "Tulips", to be delivered to Room 106. They have attached the following message: "Get Well Soon Grandma!"',
        },
        {
            requester: "Dr. Amari",
            location: "Patient Wing",
            notes: 'Patient has requested "Lavenders", to be delivered to Room 102. They have attached the following message: "Get Well Soon Mother!"',
        },
        {
            requester: "Dr. Reynolds",
            location: "75 Lobby",
            notes: 'Patient has requested "Rosemary", to be delivered to Room 205. They have attached the following message: "Get Well Soon Father!"',
        },
        {
            requester: "Dr. Woods",
            location: "Neuroscience Waiting Room",
            notes: 'Patient has requested "Daffodils", to be delivered to Room 302. They have attached the following message: "Get Well Soon Son!"',
        },
        {
            requester: "Dr. Bill",
            location: "Cafe",
            notes: 'Patient has requested "Poppies", to be delivered to Room 104. They have attached the following message: "Get Well Soon Daughter!"',
        },
        {
            requester: "Dr. Amari",
            location: "Patient Wing",
            notes: 'Patient has requested "Roses", to be delivered to Room 102. They have attached the following message: "Get Well Soon Sister!"',
        },
        // ...
    ]
}

export default function RequestTable() {
    const [data, setData] = useState<Request[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const requestData = await getData();
                setData(requestData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
