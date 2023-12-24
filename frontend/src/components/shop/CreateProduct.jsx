import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import {toast} from "react-toastify"
import { createProduct } from '../../redux/actions/product'
import { FaTimes } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { server } from '../../server'
import axios from 'axios'



const CreateProduct = () => {   
    const { seller } = useSelector((state) =>  state.seller)
    console.log(seller._id)
    const {products, isLoading} = useSelector((state) => state.products || {} )
  console.log("ini product",products)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState()
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStockPrice] = useState()
    const [image, setImage] = useState([])
    console.log(image)

    // useEffect(() => {
    //     if(error){
    //         toast.error(error);
    //     }
    //     if(success){
    //         toast.success("Product created successfully");
    //         navigate("/dashboard");
    //         window.location.reload();
    //     }
    // }, [dispatch, error, success])
    

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const validImageTypes = ['image/jpeg', 'image/png']; // Add more valid types if needed
    
    //     setImages([]);
    
    //     files.forEach((file) => {
    //         if (validImageTypes.includes(file.type)) {
    //             const reader = new FileReader();
    
    //             reader.onload = () => {
    //                 if (reader.readyState === 2) {
    //                     setImages((old) => [...old, file]); // Store the actual file object
    //                 }
    //             };
    //             reader.readAsDataURL(file);
    //         } else {
    //             // Handle invalid file type
    //             console.error(`Invalid file type: ${file.type}`);
    //             // You may show a message or perform other actions for invalid files
    //         }
    //     });
    // };

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    
    //     setImages([]);
    
    //     files.forEach((file) => {
    //       const reader = new FileReader();
    
    //       reader.onload = () => {
    //         if (reader.readyState === 2) {
    //           setImages((old) => [...old, reader.result]);
    //         }
    //       };
    //       reader.readAsDataURL(file);
    //     });
    //   };

    const onSelectedFile = (e) => {
        const selectedFiles = e.target.files;
        console.log(selectedFiles);
        if (selectedFiles.length > 0) {
          const selectedFilesArray = Array.from(selectedFiles);
          console.log("selectedFilesArray", selectedFilesArray);
          setImage((previousImage) => previousImage.concat(selectedFilesArray));
        }
    
        e.target.value = "";
      };
    
      function deleteHandler(selectImage) {
        setImage(image.filter((e) => e !== selectImage));
      }
    
      const resetForm = () => {
        setName("");
        setDescription("");
        setCategory("");
        setTags("");
        setOriginalPrice("");
        setDiscountPrice("");
        setStockPrice("");
        setImage([]);
      };
      
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const newForm = new FormData()
        image.forEach((file, index) => {
            newForm.append(`image-${index + 1}`, file);
          });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);
        console.log([...newForm.entries()]); 
        axios.post(`http://localhost:5000/api/v2/product/create-product`,newForm, config)
        .then((res) => {
          console.log(res)
          setName("");
          setDescription("");
          setCategory("");
          setTags("");
          setOriginalPrice("");
          setDiscountPrice("");
          setStockPrice("");
          setImage([]);
        }).catch((error) => {
          console.error("Axios Error", error);
          console.error("Error Response", error.response);
          console.error("Request Config", error.config);
        })
        // try{
        //   // dispatch(createProduct(newForm))
        //   resetForm()
        //   console.log(newForm)
        // }catch(error){
        //   console.error("Axios Error", error);
        //   console.error("Error Response", error.response);
        //   console.error("Request Config", error.response);
        // }
      //   try {
      //     const result = await axios.post(
      //       `http://localhost:5000/api/v2/product/create-product`,
      //       newForm,
      //       {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       }
      //     );
      //     resetForm()
  
      //     console.log(result.data);
      //     // Handle success, show a success message, etc.
      // } catch (error) {
      //     console.error("Axios Error", error);
      //     console.error("Error Response", error.response);
      //     console.error("Request Config", error.config);
      //     // Handle error, show an error message, etc.
      // }
        // console.log(newForm)
    }

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
        <h5 className='text-[30px] font-poppins text-center'>
            Create Product
        </h5>
        {/* create product form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <br/>
            <div>
                <label className='pb-2'>
                    Name <span className='text-red-500'>*</span>
                </label>
                <input 
                type='text' 
                name="name" 
                value={name}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setName(e.target.value)}
                placeholder='Enter your product name...'
                />
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                    Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                cols="30"
                required
                rows="8"
                type='text' 
                name="descriptions" 
                value={description}
                className='mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setDescription(e.target.value)}
                placeholder='Enter your product descriptions...'
                ></textarea>
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                   Category  <span className='text-red-500'>*</span>
                </label>
                <select
                className='w-full mt-2 border h-[35px] rounded-[5px]'
                value={category}
                name='category'
                // placeholder='chose a category...'
                onChange={(e) => setCategory(e.target.value)}
                >   
                    <option value="Chose a category">Choose a category</option>
                    {
                        categoriesData && categoriesData.map((i) => (
                            <option
                            value={i.title}
                            key={i.title}
                            >
                                {i.title}
                            </option>
                        ))
                    }
                </select>
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                    Tags <span className='text-red-500'>*</span>
                </label>
                <input 
                type='text' 
                name="tags" 
                value={tags}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setTags(e.target.value)}
                placeholder='Enter your product tags...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                    Original Price <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="originalPrice" 
                value={originalPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setOriginalPrice(e.target.value)}
                placeholder='Enter your product price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Price (With Discount) <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="discountPrice" 
                value={discountPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setDiscountPrice(e.target.value)}
                placeholder='Enter your product discount price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Product Stock <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="stock" 
                value={stock}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setStockPrice(e.target.value)}
                placeholder='Enter your product discount price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Upload Image <span className='text-red-500'>*</span>
                </label>
                <input 
                type='file' 
                // name=""
                id='upload' 
                className='hidden'
                multiple 
                onChange={onSelectedFile}
                placeholder='Enter your product discount price...'
                />
              <div className="w-full flex items-center flex-wrap">
              <label htmlFor='upload'>
                    <AiOutlinePlusCircle
                    size={30}
                    className='mt-3'
                    color='#555'
                    
                    />
                </label>
                {
                // Array.isArray(images) && images.map((file) => (
                // <img src={URL.createObjectURL(file)} key={file.name} alt="" className='h-[120px] w-[120px] object-cover m-2'/>
                // ))
                }
                  {image &&
              image.map((selectImage, index) => {
                return (
                  <div key={index} className='relative'>
                    <img
                      src={URL.createObjectURL(selectImage)}
                      height="200"
                      alt={`upload-${index}`}
                      className='h-[120px] w-[120px] object-cover m-2'
                    />
                    <button onClick={() => deleteHandler(selectImage)}
                    className='absolute z-10 bottom-1 right-1'
                    >
                      <FaTimes
                    //   size={10}
                      color='white'
                      className='bg-red-500 rounded-full w-6 h-6'
                      />
                    </button>
                    {/* <p>{index + 1}</p> */}
                  </div>
                );
              })}



              </div>
              <br/>
              <div>
                <input type='submit' value="Create"
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
        </form>
    </div>
  )
}

export default CreateProduct





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const CreateProduct = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [image, setImage] = useState([]);
//   console.log("image", image);

//   const onSelectedFile = (e) => {
//     const selectedFiles = e.target.files;
//     console.log(selectedFiles);
//     if (selectedFiles.length > 0) {
//       const selectedFilesArray = Array.from(selectedFiles);
//       console.log("selectedFilesArray", selectedFilesArray);
//       setImage((previousImage) => previousImage.concat(selectedFilesArray));
//     }

//     e.target.value = "";
//   };

//   function deleteHandler(selectImage) {
//     setImage(image.filter((e) => e !== selectImage));
//   }

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("category", category);

//     image.forEach((file, index) => {
//       formData.append(`image-${index + 1}`, file);
//     });

//     try {
//       const result = await axios.post(
//         "http://localhost:5000/api/v2/product/create-product",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(result.data);
//       // Handle success, show a success message, etc.
//     } catch (error) {
//       console.error("Axios Error", error);
//       console.error("Error Response", error.response);
//       console.error("Request Config", error.response);
//       // Handle error, show an error message, etc.
//     }
//   };

//   return (
//     <>
//       <div className="container custom_class">
//         <h2 className="signup_title ">CREATE PRODUCT</h2>
//         <form
//           className="col-sm-6 offset-3 pt-5 signup_form"
//           encType="multipart/form-data"
//           onSubmit={submitForm}
//         >
//           {/* ... your other form inputs ... */}

//           <label>
//             + Add Images
//             <br />
//             <span>up to 10 images</span>
//             <input
//               type="file"
//               name="image"
//               onChange={onSelectedFile}
//               multiple
//               accept="image/png , image/jpeg, image/webp"
//             />
//           </label>
//           <br />

//           {image.length > 0 && (
//             <button className="upload-btn" type="submit">
//               CREATE {image.length === 1 ? "" : "S"}
//             </button>
//           )}

//           <div className="images">
//             {image &&
//               image.map((selectImage, index) => {
//                 return (
//                   <div key={index} className="image">
//                     <img
//                       src={URL.createObjectURL(selectImage)}
//                       height="200"
//                       alt={`upload-${index}`}
//                     />
//                     <button onClick={() => deleteHandler(selectImage)}>
//                       delete image
//                     </button>
//                     <p>{index + 1}</p>
//                   </div>
//                 );
//               })}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CreateProduct;
