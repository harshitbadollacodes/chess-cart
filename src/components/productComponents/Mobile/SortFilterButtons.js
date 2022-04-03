import "./SortFilterButtons.css";
import { useState } from "react";
import { Sort } from "./Sort"
import { Filter } from "./Filter"

export const SortFilterButtons = () => {

    const [display, setDisplay] = useState({
        sort: false,
        filter: false
    });

    return (
        <div className="m3 hide-on-mobile">
            <div className="flex-row flex-all-center p1 sort-filter-btn">
                <button 
                    onClick={() => setDisplay({...display, sort: !display.sort, filter: false})} 
                    className="text-s text-uppercase sortBtn"
                >
                    Sort
                </button>
                <button 
                    onClick={() => setDisplay({...display, filter: !display.filter, sort: false})} 
                    className="text-s text-uppercase filterBtn"
                >
                    Filter
                </button>
            </div>

            { display.sort === true && <Sort/> }
            { display.filter === true && <Filter/> }

        </div>
    );
}