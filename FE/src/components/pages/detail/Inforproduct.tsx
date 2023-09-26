import { useState }  from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Inforproduct = () => {
    const [images, setImages] = useState({
        img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
      });
    const [activeImg, setActiveImage] = useState(images.img1);
    const [amount, setAmount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(''); // Bước 1: Trạng thái kích cỡ giày
    const availableSizes = ['VN 40', 'VN 41', 'VN 42', 'VN 43', 'VN 44', 'VN 45', 'VN 46'];
  return (
    <div>
              <div className='max-w-screen-xl mx-auto flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
          <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
          <div className='flex flex-row p-3 justify-between h-24'>
            <img src={images.img1} alt="" className='w-24 h-24  rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
            <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
            <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
            <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
          </div>
        </div>
        {/* THÔNG TIN */}
        <div className='flex flex-col gap-4 lg:w-2/4'>
          <div>
            <span className=' text-violet-600 font-semibold'>Giày Sneaker Đặc Biệt</span>
            <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
          </div>
          <p className='text-gray-700'>
            Với khả năng giảm chấn đáng kinh ngạc để hỗ trợ bạn trong mọi kilomet của bạn, Invincible 3 mang đến sự thoải mái tối đa dưới bàn chân để giúp bạn đạt hiệu suất tốt nhất hôm nay, ngày mai và xa hơn. Mẫu giày này với độ đàn hồi và hỗ trợ tuyệt vời, được thiết kế để mang lại hiệu suất tốt nhất trên các tuyến đường yêu thích của bạn và mang đầy năng lượng sau mỗi chuyến chạy, chờ đợi chạy tiếp theo.
          </p>
          <h6 className='text-2xl font-semibold'>$ 199.00</h6>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-600 font-semibold'>Chọn Kích Cỡ:</span>
            <div className='flex flex-row '>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`w-16 h-10 text-sm mr-3 rounded-md border ${selectedSize === size ? 'bg-gray-200' : 'bg-white'
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold">Chọn Màu:</span>
            <div className="flex flex-row space-x-3">
              <button className="w-8 h-8 bg-red-500 rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-white border rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-black rounded-full shadow-xl color-button"></button>
              <button className="w-8 h-8 bg-blue-400 rounded-full shadow-xl color-button"></button>
            </div>
          </div>

          <div className='flex flex-row items-center gap-12'>
            <div className='flex flex-row items-center'>
              <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
              <span className='py-4 px-6 rounded-lg'>{amount}</span>
              <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
            </div>

          </div>
          
          <div>
            <button className='bg-violet-800 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-full h-full flex items-center space-x-2'><span><AiOutlineShoppingCart /> </span><span>Thêm vào Giỏ Hàng</span>  </button>
          </div>
        </div>



      </div>
  
    </div>
  )
}

export default Inforproduct