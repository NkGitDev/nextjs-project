'use client';    // this line is used to make "Client Side Component"
export default function Info(){

    // in NextJs by default all the component are "Server Side Component" 
    console.log('This is component')
    return(
        <div>
            {/* <h1>This is Info Component</h1>
            
            <button className="px-3 py-2 rounded text-white bg-blue-500">Click Me</button> */}
        </div>
    )
}