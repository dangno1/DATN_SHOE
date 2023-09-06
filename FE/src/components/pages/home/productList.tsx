import React from 'react'
import { BsBagPlus } from 'react-icons/bs'

const ProductList = () => {
  return (
    
    <>
 
  <div className="text-center p-10">
    <h1 className="font-bold text-4xl mb-4">Responsive Product card grid</h1>
    <h1 className="text-3xl">Tailwind CSS</h1>
  </div>
  {/* ✅ Grid Section - Starts Here 👇 */}
  <section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >
    {/*   ✅ Product card 1 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 1 - Ends Here  */}
    {/*   ✅ Product card 2 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 2- Ends Here  */}
    {/*   ✅ Product card 3 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 3 - Ends Here  */}
    {/*   ✅ Product card 4 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 4 - Ends Here  */}
    {/*   ✅ Product card 5 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 5 - Ends Here  */}
    {/*   ✅ Product card 6 - Starts Here 👇 */}
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              $149
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            <div className="ml-auto font-bold text-2xl">
            <BsBagPlus/>
            </div>
          </div>
        </div>
      </a>
    </div>
    {/*   🛑 Product card 6 - Ends Here  */}
  </section>
  {/* 🛑 Grid Section - Ends Here */}


</>

  )
}

export default ProductList