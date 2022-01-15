import { useProductContext } from "../../../context/ProductsContext";
import "./DesktopSortFilter.css";

export const DesktopSortFilterOptions = () => {
    const { state, dispatch } = useProductContext();

    return (
        <div className="desktop-only sort-filter-desktop">
            <div className="fixed-sidebar">
                <div className="flex-col gap">    
                    <h1>Sort</h1>
                    <label>
                        <input type="radio" name="sort" onClick={() => dispatch({type: "SORT", payload: "LOW_TO_HIGH"})}/> Low to high
                    </label>
                    
                    <label>
                        <input type="radio" name="sort" onClick={() => dispatch({type: "SORT", payload: "HIGH_TO_LOW"})} /> High to Low
                    </label>
                </div>

                <div className="flex-col gap m1">
                    <h1>Filter</h1>
                    <label>
                        <input type="checkbox" checked={state.filter} onChange={() => dispatch({type: "FILTER"})}/> Include only in stock
                    </label>

                    <label>
                        <input type="checkbox" checked={state.fastDelivery} onChange={() => dispatch({type: "FAST_DELIVERY"})} /> Include only fast delivery
                    </label>
                </div>
            </div>
        </div>
        
    );
}
