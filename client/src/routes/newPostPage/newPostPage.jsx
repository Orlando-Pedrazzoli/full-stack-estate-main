import { useState } from 'react';
import './newPostPage.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/UploadWidget';
import { useNavigate } from 'react-router-dom';

function NewPostPage() {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Cidades portuguesas principais
  const cities = [
    'Lisboa',
    'Porto',
    'Braga',
    'Coimbra',
    'Faro',
    'Setúbal',
    'Aveiro',
    'Évora',
    'Leiria',
    'Viseu',
    'Guimarães',
    'Cascais',
    'Vila Nova de Gaia',
    'Almada',
    'Funchal',
    'Sintra',
    'Odivelas',
    'Loures',
    'Matosinhos',
    'Gondomar',
    'Vila Franca de Xira',
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post('/posts', {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate('/' + res.data.id);
    } catch (err) {
      console.log(err);
      setError('Erro ao criar o anúncio. Tente novamente.');
    }
  };

  return (
    <div className='newPostPage'>
      <div className='formContainer'>
        <h1>Adicionar Novo Anúncio</h1>
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            {/* Informações Básicas */}
            <div className='section'>
              <h3>Informações Básicas</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='title'>Título do Anúncio</label>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    placeholder='Ex: Apartamento T2 no centro de Lisboa'
                    required
                  />
                </div>
                <div className='item'>
                  <label htmlFor='price'>Preço (€)</label>
                  <input
                    id='price'
                    name='price'
                    type='number'
                    placeholder='250000'
                    min='0'
                    required
                  />
                </div>
              </div>

              <div className='item description'>
                <label htmlFor='desc'>Descrição</label>
                <ReactQuill
                  theme='snow'
                  onChange={setValue}
                  value={value}
                  placeholder='Descreva as características do imóvel...'
                />
              </div>
            </div>

            {/* Localização */}
            <div className='section'>
              <h3>Localização</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='city'>Cidade</label>
                  <input
                    id='city'
                    name='city'
                    type='text'
                    placeholder='Selecione a cidade'
                    list='cities'
                    required
                  />
                  <datalist id='cities'>
                    {cities.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>
                <div className='item'>
                  <label htmlFor='address'>Morada</label>
                  <input
                    id='address'
                    name='address'
                    type='text'
                    placeholder='Rua, número, código postal'
                    required
                  />
                </div>
              </div>

              <div className='row'>
                <div className='item'>
                  <label htmlFor='latitude'>Latitude</label>
                  <input
                    id='latitude'
                    name='latitude'
                    type='text'
                    placeholder='38.7139'
                    step='any'
                  />
                </div>
                <div className='item'>
                  <label htmlFor='longitude'>Longitude</label>
                  <input
                    id='longitude'
                    name='longitude'
                    type='text'
                    placeholder='-9.1394'
                    step='any'
                  />
                </div>
              </div>
            </div>

            {/* Características do Imóvel */}
            <div className='section'>
              <h3>Características</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='type'>Tipo de Negócio</label>
                  <select name='type' required>
                    <option value='rent'>Arrendamento</option>
                    <option value='buy'>Venda</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='property'>Tipo de Imóvel</label>
                  <select name='property' required>
                    <option value='apartment'>Apartamento</option>
                    <option value='house'>Moradia</option>
                    <option value='condo'>Condomínio</option>
                    <option value='land'>Terreno</option>
                  </select>
                </div>
              </div>

              <div className='row'>
                <div className='item'>
                  <label htmlFor='bedroom'>Nº de Quartos</label>
                  <input
                    min={0}
                    id='bedroom'
                    name='bedroom'
                    type='number'
                    placeholder='2'
                    required
                  />
                </div>
                <div className='item'>
                  <label htmlFor='bathroom'>Nº de Casas de Banho</label>
                  <input
                    min={1}
                    id='bathroom'
                    name='bathroom'
                    type='number'
                    placeholder='1'
                    required
                  />
                </div>
              </div>

              <div className='item'>
                <label htmlFor='size'>Área Total (m²)</label>
                <input
                  min={0}
                  id='size'
                  name='size'
                  type='number'
                  placeholder='85'
                />
              </div>
            </div>

            {/* Políticas e Condições */}
            <div className='section'>
              <h3>Condições</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='utilities'>Despesas</label>
                  <select name='utilities'>
                    <option value='owner'>Incluídas no preço</option>
                    <option value='tenant'>Por conta do inquilino</option>
                    <option value='shared'>Partilhadas</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='pet'>Animais de Estimação</label>
                  <select name='pet'>
                    <option value='allowed'>Permitidos</option>
                    <option value='not-allowed'>Não Permitidos</option>
                  </select>
                </div>
              </div>

              <div className='item'>
                <label htmlFor='income'>Requisitos de Rendimento</label>
                <input
                  id='income'
                  name='income'
                  type='text'
                  placeholder='Ex: Rendimento mensal 3x superior à renda'
                />
              </div>
            </div>

            {/* Proximidades */}
            <div className='section'>
              <h3>Proximidades (metros)</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='school'>Escola</label>
                  <input
                    min={0}
                    id='school'
                    name='school'
                    type='number'
                    placeholder='500'
                  />
                </div>
                <div className='item'>
                  <label htmlFor='bus'>Paragem de Autocarro</label>
                  <input
                    min={0}
                    id='bus'
                    name='bus'
                    type='number'
                    placeholder='200'
                  />
                </div>
              </div>

              <div className='item'>
                <label htmlFor='restaurant'>Restaurante</label>
                <input
                  min={0}
                  id='restaurant'
                  name='restaurant'
                  type='number'
                  placeholder='300'
                />
              </div>
            </div>

            <button className='sendButton' type='submit'>
              Publicar Anúncio
            </button>
            {error && <span className='error'>{error}</span>}
          </form>
        </div>
      </div>

      <div className='sideContainer'>
        <h3>Fotografias do Imóvel</h3>
        <div className='imageGallery'>
          {images.map((image, index) => (
            <div key={index} className='imagePreview'>
              <img src={image} alt={`Foto ${index + 1}`} />
              <button
                type='button'
                onClick={() =>
                  setImages(prev => prev.filter((_, i) => i !== index))
                }
                className='removeImage'
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: 'lamadev',
            uploadPreset: 'estate',
            folder: 'posts',
          }}
          setState={setImages}
        />

        <div className='uploadTips'>
          <h4>Dicas para boas fotografias:</h4>
          <ul>
            <li>Use luz natural sempre que possível</li>
            <li>Tire fotos de todos os cómodos</li>
            <li>Inclua pelo menos uma foto externa</li>
            <li>Mantenha os espaços organizados</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
