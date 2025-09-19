const Cards = ({items}) => {

  return (
    <>
    <div className="text-3xl font-bold ml-52 mt-4 "><h1>Best Seller</h1></div>
    <div className="grid grid-cols-1  p-[30px] m-[10px]  sm:grid-cols-2 lg:grid-cols-4 cursor-pointer gap-4 hover:shadow-lg transition hover:border-[1px] rounded-xl ">
      {items.map((item, idx) => (
        <div
          key={idx}
          className=" overflow-hidden shadow-md bg-gray-50 p-2 hover:shadow-lg transition hover:border-[1px] rounded-xl "
        >     
          <div>
            <div  className="flex justify-center items-center pt-2 ">
            <img

              src={item.img}
              alt={item.title}
              className="w-56 h-56 object-cover rounded-xl "
            />
            </div>
         
          <div className=' flex justify-center '>
          <button className='mt-10  w-full px-[5px]  text-black border-[1px] hover:rounded-lg '>
             Buy Now
            </button>
            
            </div>
            </div>
          
          </div> 
        
        
      ))}
      </div>
      </>
  )
}

export default Cards
