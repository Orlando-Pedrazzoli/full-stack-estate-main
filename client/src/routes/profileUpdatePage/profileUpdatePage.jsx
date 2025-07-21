import { useContext, useState } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate('/profile');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profileUpdatePage'>
      <div className='container'>
        <div className='pageHeader'>
          <button
            className='backButton'
            onClick={() => navigate('/profile')}
            type='button'
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
              <path
                d='M19 12H5M12 19l-7-7 7-7'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Voltar ao Perfil
          </button>
          <h1>Atualizar Perfil</h1>
          <p>Atualize as suas informações pessoais</p>
        </div>

        <div className='content'>
          <div className='formContainer'>
            <div className='formCard'>
              <div className='formHeader'>
                <h2>Informações Pessoais</h2>
                <p>Mantenha os seus dados sempre atualizados</p>
              </div>

              <form onSubmit={handleSubmit} className='updateForm'>
                <div className='formGroup'>
                  <label htmlFor='username'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <circle
                        cx='12'
                        cy='7'
                        r='4'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Nome de Utilizador
                  </label>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    defaultValue={currentUser.username}
                    placeholder='Digite o seu nome de utilizador'
                    required
                  />
                </div>

                <div className='formGroup'>
                  <label htmlFor='email'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <polyline
                        points='22,6 12,13 2,6'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Email
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    defaultValue={currentUser.email}
                    placeholder='Digite o seu email'
                    required
                  />
                </div>

                <div className='formGroup'>
                  <label htmlFor='password'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                      <rect
                        x='3'
                        y='11'
                        width='18'
                        height='11'
                        rx='2'
                        ry='2'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <circle
                        cx='12'
                        cy='16'
                        r='1'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M7 11V7a5 5 0 0 1 10 0v4'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Nova Palavra-passe
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Digite uma nova palavra-passe (opcional)'
                  />
                  <small className='fieldHint'>
                    Deixe em branco se não desejar alterar a palavra-passe
                  </small>
                </div>

                {error && (
                  <div className='errorMessage'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                      <circle
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <line
                        x1='15'
                        y1='9'
                        x2='9'
                        y2='15'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <line
                        x1='9'
                        y1='9'
                        x2='15'
                        y2='15'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    {error}
                  </div>
                )}

                <div className='formActions'>
                  <button
                    type='button'
                    className='cancelButton'
                    onClick={() => navigate('/profile')}
                  >
                    Cancelar
                  </button>
                  <button
                    type='submit'
                    className='submitButton'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className='spinner'></div>
                        Atualizando...
                      </>
                    ) : (
                      <>
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                        </svg>
                        Guardar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='avatarContainer'>
            <div className='avatarCard'>
              <div className='avatarHeader'>
                <h3>Foto de Perfil</h3>
                <p>Escolha uma imagem que o represente</p>
              </div>

              <div className='avatarPreview'>
                <div className='avatarImageContainer'>
                  <img
                    src={avatar[0] || currentUser.avatar || '/noavatar.jpg'}
                    alt='Avatar do utilizador'
                    className='avatarImage'
                  />
                  <div className='avatarOverlay'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <circle
                        cx='12'
                        cy='13'
                        r='4'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className='uploadSection'>
                <UploadWidget
                  uwConfig={{
                    cloudName: 'lamadev',
                    uploadPreset: 'estate',
                    multiple: false,
                    maxImageFileSize: 2000000,
                    folder: 'avatars',
                  }}
                  setState={setAvatar}
                />

                <div className='uploadTips'>
                  <h4>Dicas para uma boa foto:</h4>
                  <ul>
                    <li>Use uma imagem quadrada de pelo menos 200x200px</li>
                    <li>Certifique-se de que o seu rosto está bem visível</li>
                    <li>Evite fundos muito escuros ou confusos</li>
                    <li>Tamanho máximo: 2MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
