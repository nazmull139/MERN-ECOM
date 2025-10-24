import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toggleSize } from "@/redux/features/button/sizeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import { useFetchProductByIdQuery, useUpdateProductMutation } from "../../../../redux/features/products/productsApi";
import SelectInput from "../addProduct/SelectInput";
import TextInput from "../addProduct/TextInput";
import UploadImage from "../addProduct/UploadImage";

const categories = [
    { label: "Select Category", value: "" },
    { label: "Panjabi", value: "panjabi" },
    { label: "T-Shirts", value: "tshirts" },
    { label: "Jewellery", value: "jewellery" },
    { label: "Cosmetics", value: "cosmetics" },
];

const colorsList = ["Black", "Red", "Gold", "Blue", "Silver", "Beige", "Green", "White", "Pink", "Purple"];
const sizeList = ["XS", "S", "M", "L", "XL", "XXL" , "36" , "38" , "40" , "42" , "44" , "46" , "48" , "50" , "52" ];

const UpdateProduct = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { data, isLoading: isProductLoading, error, refetch } = useFetchProductByIdQuery(id);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [selectedSize, setSelectedSize] = useState([]); 
   // const [selectedColors, setSelectedColors] = useState([]);
    const [newImage, setNewImage] = useState([]);
    const [addDisableSize, setAddDisableSize] = useState([]);

    const dispatch = useDispatch();

   

    

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
      //  colors: [],
        size: [],
        disabledSizes: [],
    });

   

    const productData = data?.product || {};
    //const { name, category, colors, stock, size, description, images, price } = productData || {};
    const { name, category, stock, size ,disabledSizes, description, images, price } = productData || {};

    //console.log(productData)
    //const disabledSizes = productData.disabledSizes
    //console.log(" disable sizes",disabledSizes)



    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || "",
                category: category || "",
                description: description || "",
                price: price || "",
                stock: stock || "",
               // colors: colors || [],
                size: size || [],
                images: images || [],
                disabledSizes: disabledSizes || [],
            });
           
            setSelectedSize(size || []); 
            setNewImage(images || []); 
            setAddDisableSize(disabledSizes || []);
        }
    }, [productData]);

    console.log("add disable sizes",addDisableSize)
    console.log("da disable sizes",productData.disabledSizes)

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    //console.log(product)
   // console.log(newImage)

{/*
    const handleColorSelect = (color) => {
        if (!selectedColors.includes(color)) {
            const updatedColors = [...selectedColors, color];
            setSelectedColors(updatedColors);
            setProduct((prev) => ({ ...prev, colors: updatedColors }));
        }
    };

    const removeColor = (color) => {
        const updatedColors = selectedColors.filter((c) => c !== color);
        setSelectedColors(updatedColors);
        setProduct((prev) => ({ ...prev, colors: updatedColors }));
    };*/}

    const handleSizeSelect = (size) => {
        if (!selectedSize.includes(size)) {
            const updatedSize = [...selectedSize, size];
            setSelectedSize(updatedSize);
            setProduct((prev) => ({ ...prev, size: updatedSize }));
        }
      };
    
      // Remove selected size
      const removeSize = (size) => {
        const updatedSize = selectedSize.filter((s) => s !== size);
        setSelectedSize(updatedSize);
        setProduct((prev) => ({ ...prev, size: updatedSize }));
      };
    


    if (isProductLoading) return <Loading />;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newImage.length < 4) {
            alert('Please upload at least 4 images.');
            return;
          }
    
        const updatedProduct = {
            ...product,
           // colors: selectedColors,
            size: selectedSize,
            disabledSizes: addDisableSize,
            images: newImage.length > 0 ? [...newImage] : product.images, // Correctly merge images
            author: user?._id,
        };
    
        try {
            await updateProduct({ id, ...updatedProduct }).unwrap();
            alert("Product updated successfully!");
            await refetch();
            navigate("/dashboard/manage-products");
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };
    
 
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <TextInput label="Product Name" name="name" placeholder="Ex: Diamond Earrings" value={product.name} onChange={handleChange} />

                {/* Category */}
                <SelectInput label="Category" name="category" value={product.category} onChange={handleChange} options={categories} />

                {/* Multi-Color Selection
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Colors:</label>
                    <Select onValueChange={handleColorSelect}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Choose a color" />
                        </SelectTrigger>
                        <SelectContent>
                            {colorsList.map((color, index) => (
                                <SelectItem key={index} value={color}>
                                    {color}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Selected Colors Preview //



                {selectedColors.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedColors.map((color, index) => (
                            <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                                <span className="mr-2">{color}</span>
                                <button className="text-red-500" type="button" onClick={() => removeColor(color)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )} */}
    
        

                     {/* Size Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Select Size:</label>
                          <Select onValueChange={handleSizeSelect}>
                            <SelectTrigger className="w-full mt-2">
                              <SelectValue placeholder="Choose a size" />
                            </SelectTrigger>
                            <SelectContent>
                              {sizeList.map((size, index) => (
                                <SelectItem key={index} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                
                        {/*Size Preview */}
                        {selectedSize.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selectedSize.map((size, index) => (
                              <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                                <span className="mr-2">{size}</span>
                                <button type="button" className="text-red-500" onClick={() => removeSize(size)}>
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}



             <div>
                {productData.size.map(sizes => (
                    <button
                    type="button"
                    key={sizes}
                    className={`px-3 py-1 mr-3 border ${addDisableSize.includes(sizes) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => {
                        dispatch(toggleSize({ productId: id, size: sizes }));
                        
                        // Update the local state manually
                        setAddDisableSize((prev) =>
                            prev.includes(sizes) ? prev.filter((s) => s !== sizes) : [...prev, sizes]
                        );
                    }}
                >
                    {addDisableSize.includes(sizes) ? `Enable ${sizes}` : `Disable ${sizes}`}
                    </button>
                ))}


                {productData.disabledSizes.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Disabled Sizes:</h3>
                        <div className="flex flex-wrap gap-2">
                            {addDisableSize.map((size) => (
                                <div key={size} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                                    <span className="mr-2">{size}</span>
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => {
                                            dispatch(toggleSize({ productId: id, size }));
                                            setAddDisableSize((prev) => prev.filter((s) => s !== size));
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                 ))}
        </div>
    </div>
)}
            </div>

                


                {/* Price */}
                <TextInput label="Price" name="price" type="number" placeholder="50" value={product.price} onChange={handleChange} />
                <TextInput
                    type="number"
                    label='Old Price'
                    name="oldPrice"
                    placeholder="50"
                    value={product.oldPrice}
                    onChange={handleChange}
                    />

                {/* size */}
                <TextInput label="Stock" name="stock" type="number" placeholder="50" value={product.stock} onChange={handleChange} />

                {/* Image Upload */}
                <UploadImage setImages={setNewImage} />

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder="Write a product description"
                        onChange={handleChange}
                        className="add-product-InputCSS"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="add-product-btn">
                        Update
                    </button>
                </div>
            </form>


               
        </div>
    );
};

export default UpdateProduct;
