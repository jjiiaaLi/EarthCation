
const LOAD_BOOKINGS='bookings/LOAD_BOOKINGS'


const loadBookings=(bookings)=>({
    type:LOAD_BOOKINGS,
    bookings:bookings
})


export const postABooking=(user_id,destination,lodging,activities,start_date,end_date)=>async(dispatch)=>{
    console.log(
      user_id,
      destination,
      lodging,
      activities,
      start_date,
      end_date
    );
    const res = await fetch("/api/bookings/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
          user_id,
          destination,
          lodging,
          activities,
          start_date,
          end_date
      })
    });
    if(res.ok){
        const data= await res.json();
        dispatch(loadBookings(data))
    }
}

export default function bookingsReducer(state={},action){
    let newState={}
    switch(action.type){
        case LOAD_BOOKINGS:
            action.bookings.bookings.forEach(booking=>{
                newState[booking.id]=booking
            })
            return newState
        default:
            return state
    }
}