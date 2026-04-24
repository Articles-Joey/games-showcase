import { Dropdown } from "react-bootstrap";
import { useFilterStore } from "../hooks/useFilterStore";

export default function FilterDropdowns() {

    const playerFilter = useFilterStore((state) => state.playerFilter);
    const setPlayerFilter = useFilterStore((state) => state.setPlayerFilter);
    const availabilityFilter = useFilterStore((state) => state.availabilityFilter);
    const setAvailabilityFilter = useFilterStore((state) => state.setAvailabilityFilter);
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    return (

        <>
            {/* Player Type */}
            <Dropdown className="dropdown-articles" drop={'down'}>

                <Dropdown.Toggle
                    variant="articles align-items-center d-flex "
                    disabled={search !== ''}
                >

                    <div>

                        <i className="fad fa-filter fa-lg me-2"></i>
                        {/* <i className="fad fa-sort-shapes-up fa-lg me-2"></i> */}

                        <span className='small me-2'>Type</span>

                        <span className='badge bg-dark shadow-articles me-1 d-none d-lg-inline-block'>
                            {playerFilter}
                        </span>

                    </div>

                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-articles">

                    <div className='small px-2 py-0 mb-0'>Player Type</div>

                    <Dropdown.Divider className="py-0 my-1" />

                    {['All', 'Single Player', 'Multiplayer'].map(item =>
                        <Dropdown.Item
                            key={item}
                            className={` ${playerFilter == item && 'active'}`}
                            onClick={() => {

                                setPlayerFilter(item)

                            }}
                        >

                            <span>{item}</span>

                        </Dropdown.Item>
                    )}

                </Dropdown.Menu>

            </Dropdown>

            {/* Availability Type */}
            <Dropdown className="dropdown-articles" drop={'down'}>

                <Dropdown.Toggle
                    variant="articles align-items-center d-flex "
                    disabled={search !== ''}
                >

                    <div>

                        {/* <i className="fad fa-filter"></i> */}
                        <i className="fad fa-sort-shapes-up fa-lg me-2"></i>

                        <span className='small me-2'>Status</span>

                        <span className='badge bg-dark shadow-articles me-1 d-none d-lg-inline-block'>
                            {availabilityFilter}
                        </span>

                    </div>

                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-articles">

                    <div className='small px-2 py-0 mb-0'>Availability Status</div>

                    <Dropdown.Divider className="py-0 my-1" />

                    {['All', 'Available', 'Upcoming'].map(item =>
                        <Dropdown.Item
                            key={item}
                            className={` ${availabilityFilter == item && 'active'}`}
                            onClick={() => {

                                setAvailabilityFilter(item)

                            }}
                        >

                            <span>{item}</span>

                        </Dropdown.Item>
                    )}

                    {/* {userReduxState?.roles?.isDev && <>
                        <hr />

                        <Dropdown.Item
                            key={"Developer Only"}
                            className={` ${availabilityFilter == "Developer Only" && 'active'}`}
                            onClick={() => {

                                setAvailabilityFilter("Developer Only")

                            }}
                        >

                            <span>Not Public</span>

                        </Dropdown.Item>
                    </>} */}

                </Dropdown.Menu>

            </Dropdown>
        </>

    )

}