import { useFetch } from "../hooks/useFetch"
import { useCounter } from "../hooks/useCounter";
import { Quote, Loading } from "./";


export const MultipleCustomHooks = () => {
    const { counter, increment } = useCounter(1);

    const { data, isLoading, hasError} = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes/${counter}`)
    
    const { author, quote } = !!data && data[0];

    return (
        <>
            <h1>Breaking Bad Quotes</h1>
            
            <hr />

            {
                isLoading 
                    ?   <Loading />
                    :   <Quote author={author} quote={quote} />        
            }

            <button 
                className="btn btn-primary"
                onClick={ () => increment() }
                disabled={isLoading}
            >
                More quotes
            </button>
        </>
    )
}
