import { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import SearchForm from '../components/Searchbar/Searchbar';
import style from '../components/app.module.css';
import { searchImages } from '../services/api';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImg = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL('');
    setTags('');
    setShowModal(false);
  };

  return (
    <div className={style.App}>
      <h1 className={style.Title}>React homework</h1>
      <SearchForm onSubmit={onSearchImages} />
      <ImageGallery items={items} showImg={showImg} />
      {error && <p>ERROR</p>}
      {loading && <Loader />}
      {Boolean(items.length) && <Button onClick={loadMore} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags}></img>
        </Modal>
      )}
    </div>
  );
};

export default App;
