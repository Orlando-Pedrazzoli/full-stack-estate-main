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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // ✅ Concelhos e freguesias principais apenas de Lisboa, Sintra, Almada e Mafra
  const cities = [
    // Concelho de Lisboa
    'Lisboa',
    'Amadora',
    'Odivelas',
    'Loures',
    'Oeiras',
    'Cascais',
    'Vila Franca de Xira',

    // Concelho de Sintra (freguesias mais conhecidas)
    'Sintra',
    'Algueirão–Mem Martins',
    'Queluz',
    'Cacém',
    'Rio de Mouro',
    'Massamá',
    'Belas',
    'Agualva',
    'Mira-Sintra',
    'Colares',
    'São João das Lampas',
    'Terrugem',

    // Concelho de Almada
    'Almada',
    'Costa da Caparica',
    'Charneca de Caparica',
    'Sobreda',
    'Laranjeiro',
    'Feijó',
    'Cacilhas',
    'Pragal',
    'Trafaria',

    // Concelho de Mafra
    'Mafra',
    'Ericeira',
    'Malveira',
    'Venda do Pinheiro',
    'Carvoeira',
    'Encarnação',
    'Santo Isidoro',
    'Azueira',
    'Igreja Nova',
    'Cheleiros',
    'Milharado',
    'Sobral da Abelheira',
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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
          // Converter coordenadas para números (serão convertidas para string no controller)
          latitude: inputs.latitude ? parseFloat(inputs.latitude) : null,
          longitude: inputs.longitude ? parseFloat(inputs.longitude) : null,
          images: images,
        },
        postDetail: {
          desc: value,
          condition: inputs.condition, // ← ADICIONADO
          energy: inputs.energy, // ← ADICIONADO
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size) || null,
          school: parseInt(inputs.school) || null,
          bus: parseInt(inputs.bus) || null,
          restaurant: parseInt(inputs.restaurant) || null,
        },
      });

      // 🔍 LOGS PARA DEBUG
      console.log('📦 Resposta completa:', res);
      console.log('📦 res.data:', res.data);
      console.log('📦 res.data.post:', res.data.post);
      console.log('📦 ID do post:', res.data.post?.id);

      // 🎯 CORREÇÃO: O ID está dentro de res.data.post.id
      const postId = res.data.post?.id;

      if (postId) {
        console.log('✅ Redirecionando para:', `/post/${postId}`);
        navigate(`/post/${postId}`);
      } else {
        console.error('❌ ID não encontrado na resposta');
        console.error('Estrutura da resposta:', res.data);
        setError(
          'Post criado com sucesso, mas houve um problema no redirecionamento.'
        );

        // Fallback: redirecionar para lista de posts
        navigate('/profile');
      }
    } catch (err) {
      console.error('💥 Erro ao criar post:', err);
      setError('Erro ao criar o anúncio. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='newPostPage'>
      <div className='formContainer'>
        <h1>Criar Novo Anúncio</h1>
        <div className='wrapper'>
          <form onSubmit={handleSubmit} id='newPostForm'>
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
                  <label htmlFor='latitude'>Latitude (opcional)</label>
                  <input
                    id='latitude'
                    name='latitude'
                    type='text'
                    placeholder='38.7139'
                    step='any'
                  />
                </div>
                <div className='item'>
                  <label htmlFor='longitude'>Longitude (opcional)</label>
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
                    <option value=''>Selecione...</option>
                    <option value='rent'>Arrendamento</option>
                    <option value='buy'>Venda</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='property'>Tipo de Imóvel</label>
                  <select name='property' required>
                    <option value=''>Selecione...</option>
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

              <div className='row'>
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
            </div>

            {/* Políticas e Condições */}
            <div className='section'>
              <h3>Condições</h3>
              <div className='row'>
                <div className='item'>
                  <label htmlFor='condition'>Condição do imóvel</label>
                  <select name='condition'>
                    <option value='Novo'>Novo</option>
                    <option value='Usado'>Usado</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='energy'>Certificado energético</label>
                  <select name='energy'>
                    <option value='A+'>A+</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='B-'>B-</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    <option value='E'>E</option>
                    <option value='F'>F</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='utilities'>Despesas</label>
                  <select name='utilities'>
                    <option value='Incluídas no preço'>
                      Incluídas no preço
                    </option>
                    <option value='Por conta do locatário'>
                      Por conta do locatário
                    </option>
                    <option value='Partilhadas'>Partilhadas</option>
                    <option value='Não se aplica'>Não se aplica</option>
                  </select>
                </div>
                <div className='item'>
                  <label htmlFor='pet'>Animais de Estimação</label>
                  <select name='pet'>
                    <option value='Permitidos'>Permitidos</option>
                    <option value='Não Permitidos'>Não Permitidos</option>
                    <option value='Não se aplica'>Não se aplica</option>
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

              <div className='row'>
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
            </div>

            {error && <div className='error'>{error}</div>}
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

        <button
          className='publishButton'
          type='submit'
          form='newPostForm'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
        </button>
      </div>
    </div>
  );
}

export default NewPostPage;
