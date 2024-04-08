import { Routes, Route } from 'react-router-dom';
import { Home,CreateBook,EditBook,DeleteBook,ShowBook } from './pages'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}