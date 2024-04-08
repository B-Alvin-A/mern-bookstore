import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:7500/api/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Book deleted successfully...")
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to delete book!!!. Check console for details.")
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ?
        <Spinner />
        :
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <p className='text-lg text-gray-700'>
            Are you sure you want to delete this book?
          </p>
          <div className='flex justify-end mt-4'>
            <button
              className='p-2 bg-red-500 text-white mr-4'
              onClick={handleDeleteBook}
            >
              Delete
            </button>
            <button
              className='p-2 bg-gray-300 text-gray-700'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default DeleteBook;
