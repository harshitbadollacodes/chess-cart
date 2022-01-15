import "./Sort.css";
import { useProductContext } from "../../../context/ProductsContext";

export const Sort = () => {

    const { dispatch } = useProductContext();

    return (
        <div>
            <div className="flex-col gap filter-options">
                <label>
                    <input type="radio" name="sort" onClick={() => dispatch({type: "SORT", payload: "LOW_TO_HIGH"})}/> Low to high
                </label>
                
                <label>
                    <input type="radio" name="sort" onClick={() => dispatch({type: "SORT", payload: "HIGH_TO_LOW"})} /> High to Low
                </label>
            </div>
        </div>
      );
}