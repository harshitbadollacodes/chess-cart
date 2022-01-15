// import "../Components/Sort.css";
import { useProductContext } from "../../../context/ProductsContext"

export const Filter = () => {
        
    const { state, dispatch } = useProductContext();

    return (
        <div>
            <div className="flex-col gap sort-options">
                <label>
                    <input type="checkbox" checked={state.filter} onChange={() => dispatch({type: "FILTER"})}/> Include only in stock
                </label>

                <label>
                    <input type="checkbox" checked={state.fastDelivery} onChange={() => dispatch({type: "FAST_DELIVERY"})} /> Include only fast delivery
                </label>
            </div>
        </div>
      );
}