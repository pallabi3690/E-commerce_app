import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import RichText from '../../components/RichText';
import Button from '../../components/Button';
import { addProduct, Product } from '../../services/productService';
import { QueryKeys } from '../../services/queryKeys';
import { useNavigate } from 'react-router';
import { ErrorMessage } from '@hookform/error-message';

const categories = ['Select products', 'Category 1', 'Category 2', 'Category 3'];

const ProductForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, setValue, getValues, setError, reset, control, formState: { errors } } = useForm<Product>();
  const [url, setUrl] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.products());
      navigate("/list");
    },
    onError: (err) => {
      console.log({ err });
    }
  });

  const handleFormSubmit = (data: Product) => {
    // Perform your form submission logic here
    mutation.mutate(data);
  };

  const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageString = await getBase64(files[0]);
      if (typeof imageString === 'string') {
        setValue('image', imageString);
        setUrl(imageString);
      }
    }
  };
  const descriptionRef = register('description', { required: true });
  const resetForm = ()=>{
    reset()
    setUrl('')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl text-center mb-4">Product Form</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                {...register('title', { required: 'Title Required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <ErrorMessage errors={errors} name="title" render={(error) => <p className="text-red-500">{error.message}</p>} />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                id="price"
                type="number"
                {...register('price', { required: 'Price Required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <ErrorMessage errors={errors} name="price" render={(error) => <p className="text-red-500">{error.message}</p>} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ErrorMessage errors={errors} name="category" render={(error) => <p className="text-red-500">{error.message}</p>} />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <Controller
              control={control}
              name={descriptionRef.name}
              rules={{ required: 'Description Required' }}
              defaultValue={getValues('description')}
              render={({ field: { onChange, value } }) => {
                return <RichText value={value} onChange={onChange} />;
              }}
            />
            <ErrorMessage errors={errors} name="description" render={(error) => <p className="text-red-500">{error.message}</p>} />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Image
            </label>
            {url ? (
              <div className="relative">
                <div
                  className="absolute top-2 left-2 cursor-pointer p-1 rounded-sm hover:bg-gray-100"
                  onClick={() => {
                    setUrl('');
                    setValue('image', '');
                  }}
                >
                  X
                </div>
                <img src={url} alt="Product" className="w-32 h-32 object-cover rounded" />
              </div>
            ) : (
              <input
                type="file"
                id="image"
                {...register('image', { required: 'Image Required' })}
                onChange={handleFileChange}
                className="w-full"
              />
            )}
            <ErrorMessage errors={errors} name="image" render={(error) => <p className="text-red-500">{error.message}</p>} />
          </div>

          <div className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isLoading}
              className="py-2 px-4 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
            >
              {mutation.isLoading ? 'Saving...' : 'Submit'}
            </Button>
            <Button
              type="reset"
              className="py-2 px-4 text-gray-400 rounded-md focus:outline-none hover:bg-gray-600 ml-2"
              onClick={resetForm}
            >
              {'Reset'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProductForm;
