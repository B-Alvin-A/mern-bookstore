import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [numberInStock, setNumberInStock] = useState(0);
  const [dailyRentalRate, setDailyRentalRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:7500/api/books/${id}`)
      .then(res => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setCategoryId(book.category._id);
        setCategoryName(book.category.name);
        setNumberInStock(book.numberInStock);
        setDailyRentalRate(book.dailyRentalRate);
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        alert('An error happened. Please Chack console');
        console.error('Error fetching book details:', error);
      });

    axios.get('http://localhost:7500/api/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [id]);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      categoryId,
      numberInStock,
      dailyRentalRate
    };
    setLoading(true);
    axios
      .put(`http://localhost:7500/api/books/${id}`, data)
      .then(() => {
        setLoading(false);
        toast.success("Book editted successfully...")
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Book edit failed. Check console for details")
        console.log(error);
      });
  }
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value={categoryId}>{categoryName}</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Number In Stock</label>
          <input
            type='number'
            value={numberInStock}
            onChange={(e) => setNumberInStock(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Daily Rental Rate</label>
          <input
            type='number'
            value={dailyRentalRate}
            onChange={(e) => setDailyRentalRate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook;
