const initState = {
    totalcustomer : 0,
    totalOpenAr: 0,
    days_past_duedate:0,
    openinvoice:0,
    invoicedata: [],
}

const myReducer = (state=initState, action)=> {
    switch(action.type) {
        case "FETCH_CUSTOMER":
            return {
                ...state,
                totalcustomer:action.payload,
            }
        case "FETCH_OPENAR":
            return {
                ...state,
                totalOpenAr:action.payload,
            }
        case "FETCH_DAYS_PAST":
            return {
                ...state,
                days_past_duedate:action.payload,
            }

        case "FETCH_OPEN_INVOICE":
            return {
                ...state,
                openinvoice:action.payload,
            }  

        case "FETCH_INVOICE_DATA":
            return {
                ...state,
                invoicedata:action.payload,
            }   
        default:
            return state;
    }
}

export default myReducer