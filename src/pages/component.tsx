import { RecentEvents } from "../components/v2/RecentEvents/RecentEvents";
import { dummyEvents } from "../utils/types/events";

export const ComponentPage = () => {

    return (
        <div className={`p-8 w-screen max-w-screen mx-auto border-2 border-amber-400 my-auto`}>
            <RecentEvents events={dummyEvents} />
        </div>
    )
}
export default ComponentPage;
