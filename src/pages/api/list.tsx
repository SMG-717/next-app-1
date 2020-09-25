import Link from 'next/link';
import {VehiclePerson} from "../../../api/VehiclePerson";

export interface ListProps {
    ownersList: VehiclePerson[] | undefined;
}

export default function List({ownersList}: ListProps) {
    return <div>
        {ownersList?.map(e => (
            <div>
                <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
                    <a>Navigate to {e.ownerName}'s {e.vehicle}</a>
                </Link>
            </div>
        ))}
    </div>
}


List.getInitialProps = async () => {
    const response = await fetch('http://localhost:5001');
    const ownersList: VehiclePerson[] | undefined = await response.json();
    return {ownersList: ownersList};
};