import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import UploadImage from './UploadImage';

const categories = [
  { label: "Select Category", value: "" },
  { label: "Panjabi", value: "panjabi" },
  { label: "T-shirts", value: "tshirts" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];

const colorsList = ["Black", "Red", "Gold", "Blue", "Silver", "Beige", "Green", "White", "Pink", "Purple"];
const sizeList = ["XS", "S", "M", "L", "XL", "XXL" , "36" , "38" , "40" , "42" , "44" , "46" , "48" , "50" , "52" ];

const AddProduct = () => {
  const { user } = useSelector(state => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    oldPrice: '',
    stock: '',
   // colors: [], // Store multiple colors
    size: [], // Store multiple colors
  });

  const [images, setImages] = useState([]); // Stores multiple image URLs
 // const [selectedColors, setSelectedColors] = useState([]); // Store selected colors
  const [selectedSize, setSelectedSize] = useState([]); // Store selected colors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const [AddProduct] = useAddProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.price || !product.oldPrice || selectedColors.length === 0 || !product.description) {
      alert('Please fill in all fields.');
      return;
    }

    if (images.length < 4) {
      alert('Please upload at least 4 images.');
      return;
    }

    try {
     // await AddProduct({ ...product, colors: selectedColors , size: selectedSize , images, author: user?._id }).unwrap();
      await AddProduct({ ...product, size: selectedSize , images, author: user?._id }).unwrap();
      alert('Product added successfully!');
      setProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        oldPrice: '',
       // colors: [],
        size: []

      });
      setImages([]); 
     // setSelectedColors([]);
      setSelectedSize([]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Remove selected color
  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
  };
  // Handle size selection
  const handleSizeSelect = (size) => {
    if (!selectedSize.includes(size)) {
      setSelectedSize([...selectedSize, size]);
    }
  };

  // Remove selected size
  const removeSize = (size) => {
    setSelectedSize(selectedSize.filter(s => s !== size));
  };

  return (
    <div className='container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>

        <TextInput
          type="text"
          label='Product Name'
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

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
        </div>*/}

        {/* Selected Colors Preview
        {selectedColors.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedColors.map((color, index) => (
              <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                <span className="mr-2">{color}</span>
                <button className="text-red-500" onClick={() => removeColor(color)}>
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
                <button className="text-red-500" onClick={() => removeSize(size)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <TextInput
          type="number"
          label='Price'
          name="price"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />
        
        <TextInput
          type="number"
          label='Old Price'
          name="oldPrice"
          placeholder="50"
          value={product.oldPrice}
          onChange={handleChange}
        />
        <TextInput
          type="number"
          label='stock'
          name="stock"
          placeholder="50"
          value={product.stock}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <UploadImage setImages={setImages} />

        {/* Description */}
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
          <textarea
            name="description"
            id="description"
            rows="6"
            value={product.description}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button className='w-full' type='submit'>Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
