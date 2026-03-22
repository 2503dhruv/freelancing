import { useState, useEffect } from 'react';
import { productsApi, categoriesApi, slidesApi, contactApi, api } from '../services/api.js';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [slides, setSlides] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal
  const [modalType, setModalType] = useState(''); // 'product', 'category', 'slide'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [p, c, s, cont] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll(),
        slidesApi.getAll(),
        contactApi.getAll()
      ]);
      setProducts(p);
      setCategories(c);
      setSlides(s);
      setContacts(cont);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (type, item = null) => {
    setModalType(type);
    if (item) {
      const data = {};
      if (type === 'product') {
        data.title = item.title;
        data.image = item.image;
        data.category = item.category?._id || item.category || '';
        data.description = item.description || '';
      } else if (type === 'category') {
        data.name = item.name;
        data.image = item.image;
        data.order = item.order || 0;
      } else if (type === 'slide') {
        data.title = item.title;
        data.text = item.text;
        data.image = item.image;
        data.order = item.order || 0;
      }
      setFormData(data);
      setEditingId(item._id);
    } else {
      setFormData({});
      setEditingId(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let path;
      if (modalType === 'product') {
        path = editingId ? `/products/${editingId}` : '/products';
        await (editingId ? api.put(path, formData) : api.post(path, formData));
      } else if (modalType === 'category') {
        path = editingId ? `/categories/${editingId}` : '/categories';
        await (editingId ? api.put(path, formData) : api.post(path, formData));
      } else if (modalType === 'slide') {
        path = editingId ? `/slides/${editingId}` : '/slides';
        await (editingId ? api.put(path, formData) : api.post(path, formData));
      }
      setModalType('');
      loadData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleToggle = async (id) => {
    const product = products.find(p => p._id === id);
    try {
      await api.put(`/products/${id}`, { hidden: !product.hidden });
      loadData();
    } catch (err) {
      alert(`Toggle error: ${err.message}`);
    }
  };

  const handleDelete = async (path) => {
    if (confirm('Delete?')) {
      try {
        await api.delete(path);
        loadData();
      } catch (err) {
        alert(`Delete error: ${err.message}`);
      }
    }
  };

  const TabButton = ({ tab, label }) => (
    <button className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
      {label} ({tab === 'products' ? products.length : tab === 'categories' ? categories.length : tab === 'slides' ? slides.length : contacts.length})
    </button>
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <div className="tabs">
          <TabButton tab="products" label="Products" />
          <TabButton tab="categories" label="Categories" />
          <TabButton tab="slides" label="Slides" />
          <TabButton tab="contacts" label="Contacts" />
        </div>
      </header>

      <div className="tab-content">
        {activeTab === 'products' && (
          <section>
            <h2>Products</h2>
            <button className="add-btn" onClick={() => openForm('product')}>+ Add Product</button>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Hidden</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p.title}</td>
                    <td>{p.category?.name}</td>
                    <td>
                      <label className="toggle">
                        <input type="checkbox" checked={!!p.hidden} onChange={() => handleToggle(p._id)} />
                        <span className="slider"></span>
                      </label>
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => openForm('product', p)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(`/products/${p._id}`)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'categories' && (
          <section>
            <h2>Categories</h2>
            <button className="add-btn" onClick={() => openForm('category')}>+ Add Category</button>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td><img src={c.image} alt="" width="50" /></td>
                    <td>{c.order}</td>
                    <td>
                      <button className="edit-btn" onClick={() => openForm('category', c)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(`/categories/${c._id}`)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'slides' && (
          <section>
            <h2>Slides</h2>
            <button className="add-btn" onClick={() => openForm('slide')}>+ Add Slide</button>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Text</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.map(s => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>{s.text?.slice(0,50)}...</td>
                    <td>{s.order}</td>
                    <td>
                      <button className="edit-btn" onClick={() => openForm('slide', s)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(`/slides/${s._id}`)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'contacts' && (
          <section>
            <h2>Contact Messages ({contacts.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td>{c.message?.slice(0,50)}...</td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? `Edit ${modalType}` : `Add New ${modalType}`}</h3>
            <form onSubmit={handleFormSubmit}>
              {modalType === 'product' && (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Image URL *</label>
                    <input type="url" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                      <option value="">Select...</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" />
                  </div>
                </>
              )}
              {modalType === 'category' && (
                <>
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Image URL *</label>
                    <input type="url" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Order</label>
                    <input type="number" value={formData.order || 0} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
                  </div>
                </>
              )}
              {modalType === 'slide' && (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Text</label>
                    <textarea value={formData.text || ''} onChange={(e) => setFormData({...formData, text: e.target.value})} rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Image URL *</label>
                    <input type="url" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Order</label>
                    <input type="number" value={formData.order || 0} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
                  </div>
                </>
              )}
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setModalType('')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

