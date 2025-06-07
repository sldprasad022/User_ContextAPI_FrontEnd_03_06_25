// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const TotalProductsImagesSkeleton = () => {

//     const [allProducts, setAllProducts] = useState([]);

//     const [loading, setLoading] = useState(false);


//     useEffect(()=>{
//         ftechAllProducts();
//     },[]);


//     const ftechAllProducts = async ()=>{
//         setLoading(true);
//         try
//         {
//             const response = await axios.get(`https://fakestoreapi.com/products`);
//             console.log(response.data);
//             setAllProducts(response.data);
//         }
//         catch (error)
//         {
//             console.log(error);
//         }
//         finally
//         {
//             setLoading(false);
//         }
//     }

//     if(loading) <Skeleton height={200} width={200} />

// console.log(allProducts);
//   return (
//     <div className='my-4 '>
//         <h1 className='text-center text-red-800'>Total Products</h1>
//         <div className='grid lg:grid-cols-4 gap-8'>
//             {
//                 allProducts.map((eachProduct)=>{
//                     return(
//                         <div key={eachProduct.id} className='p-4 flex flex-col gap-4 shadow-xl rounded-xl'>
//                             <h1 className='text-xl text-center'>{eachProduct.title}</h1>
//                             <img src={eachProduct.image} alt='image' className='h-[280px]'/>
//                             <h1 className='text-lg text-center'>{eachProduct.description}</h1>
//                         </div>
//                     )    
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default TotalProductsImagesSkeleton



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const TotalProductsImagesSkeleton = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const fetchAllProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://fakestoreapi.com/products`);
//       setAllProducts(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='my-4'>
//       <h1 className='text-center text-red-800 text-2xl font-bold mb-4'>Total Products</h1>
//       <div className='grid lg:grid-cols-4 gap-8'>
//         {loading ? Array.from({ length: 8 }).map((_, idx) => (
//               <div key={idx} className='p-4 flex flex-col gap-4 shadow-xl rounded-xl'>
//                 <Skeleton height={24} width={`100%`} />
//                 <Skeleton height={280} />
//                 <Skeleton count={2} />
//               </div>
//             ))
//           : allProducts.map((eachProduct) => (
//               <div key={eachProduct.id} className='p-4 flex flex-col gap-4 shadow-xl rounded-xl'>
//                 <h1 className='text-xl text-center'>{eachProduct.title}</h1>
//                 <img src={eachProduct.image} alt='product' className='h-[280px] object-contain' />
//                 <h1 className='text-lg text-center'>{eachProduct.description}</h1>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default TotalProductsImagesSkeleton;


import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TotalProductsImagesSkeleton = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom skeleton component (optional, reusable)
  const ProductSkeletonCard = () => (
    <div className='p-4 flex flex-col gap-4 shadow-xl rounded-xl'>
      <Skeleton height={24} width='80%' baseColor="#e0e0e0" highlightColor="#f5f5f5" />
      <Skeleton height={280} baseColor="#d8d8d8" highlightColor="#ecebeb" />
      <Skeleton count={2} width='100%' baseColor="#e0e0e0" highlightColor="#f5f5f5" />
    </div>
  );

  return (
    <div className='my-4'>
      <h1 className='text-center text-red-800 text-2xl font-bold mb-4'>Total Products</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-8'>
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => <ProductSkeletonCard key={idx} />)
          : allProducts.map((product) => (
              <div key={product.id} className='p-4 flex flex-col gap-4 shadow-xl rounded-xl'>
                <h1 className='text-xl font-semibold text-center'>{product.title}</h1>
                <img
                  src={product.image}
                  alt='product'
                  className='h-[280px] object-contain rounded-md'
                />
                <p className='text-sm text-gray-600 text-center line-clamp-3'>
                  {product.description}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TotalProductsImagesSkeleton;

