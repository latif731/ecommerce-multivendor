import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { categoriesData } from '../../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import {toast} from "react-toastify"
import { createProduct } from '../../redux/actions/product'
import { FaTimes } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { server } from '../../server'
import axios from 'axios'
import { getAllProductsShop } from '../../redux/actions/product'



const CreateEvents = () => {   
  console.log("Komponen CreateEvents dirender"); 
    const { seller } = useSelector((state) =>  state.seller)
    // console.log(seller._id)
    const {products, isLoading} = useSelector((state) => state.products  )
    console.log("ini product id",products?.length > 0 ? products[0]._id : "Tidak ada product")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState()
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStockPrice] = useState()
    const [image, setImage] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [imageUrl2, setImageUrl2] = useState([])
    console.log("imageUrl2", imageUrl2)
    // console.log("image files:", image)
    const [startDate, setStartDate] = useState(null) 
    const [endDate, setEndDate] = useState(null)
    const [productEvent, setproductEvent] = useState({_id:''})
    const [uploadedImages, setUploadedImages] = useState([]);
    // console.log("uploadedImage", uploadedImages)
    const [productId, setProductId] = useState('')
    console.log("product id", productId)
    // const [selectedProductImages, setSelectedProductImages] = useState([])
    // const [previewImages, setPreviewImages] = useState([{}]);

    // const [productEvent, setProductEvent] = useState({})
    // console.log("productEvent",productEvent)
    // console.log("image", productEvent.imageUrl)
    // console.log(image)

    useEffect(() => {
      if (productEvent && productEvent.imageUrl) {
        setImageUrl(productEvent.imageUrl.map((image) => image.secure_url) || []);
      }
    }, [productEvent]);

    useEffect(() => {
      if (seller && seller._id) {
        dispatch(getAllProductsShop(seller._id));
      }
    }, [dispatch, seller]);
  


        const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value)
        const minEndDate = new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000)
        setStartDate(startDate)
        setEndDate(null)
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0,5)
    }

    const handleSelected = (e) => {
      e.preventDefault();
    
      // Find the selected product from the products array
      const productEventId = e.target.value;
      // console.log("product id", productEventId)
      const productEvent = products.find((product) => product._id === productEventId);
      // console.log("memilih product",productEvent)
      if (productEvent) {
        // Update the form state with the selected product details
        setName(productEvent.name || '');
        setDescription(productEvent.description || '');
        setCategory(productEvent.category || '');
        setTags(productEvent.tags || '');
        setOriginalPrice(productEvent.originalPrice || '');
        setDiscountPrice(productEvent.discountPrice || '');
        setStockPrice(productEvent.stock || '');
        setproductEvent(productEvent._id)
        setProductId(productEvent._id || '')
        // setSelectedProductImages(productEvent.imageUrl || []);
        // setproductEvent(productEvent);
        // setImage(productEvent.imageUrl || []);
        // setSelectedProductImages(productEvent.imageUrl.secure_url || []);
        // setImageUrl(productEvent.imageUrl || [])
        // setImageUrl(productEvent.imageUrl.map(image => image.secure_url) || []);
      
        if (productEvent && productEvent.imageUrl) {
          const formattedImages = productEvent.imageUrl.map((image) => ({
            secure_url: image?.secure_url,
            public_id: image?.public_id,
          }));
          setImageUrl2(formattedImages);
        } else {
          console.log('No images associated with the selected product');
          // Lakukan tindakan lain, misalnya menggunakan gambar default atau memberi peringatan
        }
        // setImage(productEvent.imageUrl[0].secure_url || []);
        // setImage(Array.isArray(productEvent.imageUrl) ? productEvent.imageUrl : []);
      }
    };


    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value)
        setEndDate(endDate)
    } 

    const today = new Date().toISOString().slice(0,10)

    const minEndDate = startDate ? new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0,5) : today;

    const onSelectedFile = (e) => {
        const selectedFiles = e.target.files;
        console.log("selected files", selectedFiles);
        if (selectedFiles?.length > 0) {
          const selectedFilesArray = Array.from(selectedFiles);
          console.log("selectedFilesArray", selectedFilesArray);
          // setPreviewImages((prevImages) => [...prevImages, ...selectedFilesArray]);
          setImage((previousImage) => previousImage.concat(selectedFilesArray));
          // setImage((prevImages) => [...prevImages, ...selectedFilesArray]);
          
          // const formattedImages = selectedFilesArray.map((file) => ({
          //   secure_url: URL.createObjectURL(file), // Anda mungkin perlu menyesuaikan ini berdasarkan logika aktual Anda
          //   public_id: productEvent?.imageUrl[0]?.public_id  || `product/${file.name}`, // Menyesuaikan public_id dengan file name atau ID unik lainnya
          // }));
          // console.log("format image secure_url dan public_id",formattedImages)
          // setproductEvent((prevProductEvent) => ({
          //   ...prevProductEvent,
          //   imageUrl: formattedImages // Gabungkasn URL gambar menjadi satu string
          // }));
          if(productEvent && productEvent.imageUrl){
            const formattedImages = selectedFilesArray.map((file) => ({
              secure_url: URL.createObjectURL(file), // Anda mungkin perlu menyesuaikan ini berdasarkan logika aktual Anda
              public_id: productEvent?.imageUrl[0]?.public_id  || `product/${file.name}`, // Menyesuaikan public_id dengan file name atau ID unik lainnya
            }));
            console.log("format image secure_url dan public_id",formattedImages)
            setproductEvent((prevProductEvent) => ({
              ...prevProductEvent,
              imageUrl: formattedImages // Gabungkasn URL gambar menjadi satu string
            }));
          }

          // if (selectedProductImages.length > 0) {
          //   const selectedImagesArray = selectedProductImages.map((image) => ({
          //     secure_url: image,
          //   }));
          //   setImageUrl(selectedImagesArray);
          // }

          // setSelectedProductImages((prevImages) => [...prevImages, ...selectedFilesArray]);
          // setUploadedImages((prevImages) => [...prevImages, ...selectedFilesArray]);
        }

        // if (productEvent._id) {
        //   const productImages = products.find((product) => product._id === productEvent._id)?.images || [];
        //   setSelectedProductImages(productImages);
        // } else {
        //   // Jika user mengunggah gambar eksternal, atur selectedProductImages menjadi array kosong
        //   setSelectedProductImages([]);
        // }
    
        e.target.value = "";

        // setSelectedProductImages([])
      };
    
      function deleteHandler(selectImage) {
        setImage(image.filter((e) => e !== selectImage));
      }
    
      // const resetForm = () => {
      //   setName("");
      //   setDescription("");
      //   setCategory("");
      //   setTags("");
      //   setOriginalPrice("");
      //   setDiscountPrice("");
      //   setStockPrice("");
      //   setImage([]);
      // };
      useEffect(() => {
        if (products && products.length > 0) {
          // Assuming you want the _id of the first product in the array
          const productId = products[0]._id;
          setProductId(productId);
        }
      },[products])
    
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
        newForm.append("productEvent", JSON.stringify(productEvent));
        // console.log("productEvent", productEvent)
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("productId", productId || products._id || '');
        // console.log("ini adalah productEvent id", productEvent._id)
        newForm.append("shopId", seller._id);
        newForm.append("imageUrl", JSON.stringify(imageUrl))
        newForm.append("imageUrl2", JSON.stringify(imageUrl2))
        newForm.append("start_date", startDate?.toISOString())
        newForm.append("finish_date", endDate?.toISOString())

        console.log("Form Data:", [...newForm.entries()]);
        // console.log([...newForm.entries()]); 
        axios.post(`http://localhost:5000/api/v2/event/create-event`,newForm, config)
        .then((res) => {
          // console.log(res)
          setName("");
          setDescription("");
          setCategory("");
          setTags("");
          setOriginalPrice("");
          setDiscountPrice("");
          setStockPrice("");
          setImage([]);
          setStartDate(new Date());
          setEndDate(new Date());
        }).catch((error) => {
          console.error("Axios Error", error);
          console.error("Error Response", error.response);
          console.error("Request Config", error.config);
        })
    }

  return (
          <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
        <h5 className='text-[30px] font-poppins text-center'>
            Create Events
        </h5>
        {/* create events form */}
        <form onSubmit={handleSubmit}>
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
                placeholder='Enter your event product name...'
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
                placeholder='Enter your event product descriptions...'
                ></textarea>
            </div>
            <br/>
            <div>
                <label className='pb-2'>
                   Select your product  <span className='text-red-500'>*</span>
                </label>
                <select
                className='w-full mt-2 border h-[35px] rounded-[5px]'
                value={productEvent._id}
                onChange={handleSelected}
                >   
                    <option value="">Choose a product</option>
                    {
                        products && products.map((i) => (
                            <option
                            value={i._id}
                            key={i._id}
                            >
                                {i.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label className='pb-2'>
                   Category  <span className='text-red-500'>*</span>
                </label>
                <select
                className='w-full mt-2 border h-[35px] rounded-[5px]'
                value={category}
                // onChange={handleSelected}
                onChange={(e) => setCategory(e.target.value)}
                >   
                    <option value="Chose a category">Choose a category</option>
                    {  
                        categoriesData && categoriesData.map((i) => (
                            <option
                            value={i.category}
                            key={i.category}
                            >
                                {i.category}
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
                name="descriptions" 
                value={tags}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setTags(e.target.value)}
                placeholder='Enter your event product tags...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                    Original Price <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="price" 
                value={originalPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setOriginalPrice(e.target.value)}
                placeholder='Enter your event product price...'
                />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Price (With Discount) <span className='text-red-500'>*</span>
                </label>
                <input 
                type='number' 
                name="price" 
                value={discountPrice}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={(e) =>  
                setDiscountPrice(e.target.value)}
                placeholder='Enter your event product discount price...'
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
                placeholder='Enter your event product discount price...'
                 />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Event Start Date <span className='text-red-500'>*</span>
                </label>
                <input 
                type='date' 
                name="price"
                id='start-date' 
                value={startDate ? startDate.toISOString().slice(0,10) : ""}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={handleStartDateChange}
                min={today}
                placeholder='Enter your event product discount price...'
                 />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Event End Date <span className='text-red-500'>*</span>
                </label>
                <input 
                type='date' 
                name="price"
                id='end-date' 
                value={endDate ? endDate.toISOString().slice(0,10) : ""}
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' 
                onChange={handleEndDateChange}
                min={minEndDate} 
                placeholder='Enter your event product discount price...'
                 />
            </div>
            <br/>
            <div>
            <label className='pb-2'>
                 Upload Image <span className='text-red-500'>*</span>
                </label>
                <input 
                type='file' 
                name=""
                id='upload' 
                className='hidden'
                multiple 
                onChange={onSelectedFile}
                placeholder='Enter your event product discount price...'
                />
              <div className="w-full flex items-center flex-wrap">
              <label htmlFor='upload'>
                    <AiOutlinePlusCircle
                    size={30}
                    className={`${imageUrl2?.length ?'hidden' :  'mt-3'}`}
                    // className='mt-3'
                    color='#555'
                    />
                </label>
                {  imageUrl2?.length > 0 &&
                  imageUrl2?.map((selectImage, index) => (
                    <div key={index} className='relative'>
                      <img
                      src={selectImage.secure_url}
                      // src={selectImage instanceof File ? URL.createObjectURL(selectImage) : selectImage}
                      // src={typeof selectImage === 'string' ? selectImage : URL.createObjectURL(selectImage)}
                      // src={selected instanceof File ? URL.createObjectURL(selectImage) : selectImage}
                      height="200"
                      alt={`product-${index}`}
                      className='h-[120px] w-[120px] object-cover m-2'
                      />
                    </div>
                  ))
                }
               
                {
              image?.map((selectImage, index) => {
                return (
                  <div key={index} className='relative'>
                    <img
                      // src={URL.createObjectURL(selectImage)}
                      src={selectImage instanceof File ? URL.createObjectURL(selectImage) : selectImage}
                      height="200"
                      alt={`upload-${index}`}
                      className='h-[120px] w-[120px] object-cover m-2'
                    />
                    <button onClick={() => deleteHandler(selectImage)}
                    className={`absolute z-10 bottom-1 right-1`}
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

export default CreateEvents