import {NextPageContext} from "next";
import {myFetch} from "../../api/myFetch";

export default function Vehicles({vehicles}: any) {
    return <div>Hello Vehicles {JSON.stringify(vehicles)}</div>
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
    const json = await myFetch('http://localhost:3000/api/vehicles', ctx);
    return {vehicles: json};
}
