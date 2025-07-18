import { useState } from 'react';
import './contact.scss';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(
        'Mensagem enviada com sucesso! Entrarei em contacto consigo brevemente.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: '',
        budget: '',
      });
    }, 2000);
  };

  return (
    <div className='contactPage'>
      {/* Hero Section */}
      <div className='hero'>
        <div className='heroContent'>
          <h1>Entre em Contacto</h1>
          <p>
            Estou aqui para o acompanhar em todas as suas necessidades
            imobiliárias. Vamos encontrar juntos a solução perfeita.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='content'>
        <div className='container'>
          {/* Contact Grid */}
          <div className='contactGrid'>
            {/* Contact Information */}
            <div className='contactInfo'>
              <h2>Informações de Contacto</h2>
              <p className='contactDescription'>
                Disponível para reuniões presenciais, videochamadas ou contacto
                telefónico. Escolha a forma que for mais conveniente para si.
              </p>

              <div className='infoCards'>
                <div className='infoCard'>
                  <div className='iconContainer'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <div className='details'>
                    <h3>Telefone</h3>
                    <p>+351 912 799 356</p>
                    <span>Disponível das 9h às 19h</span>
                  </div>
                </div>

                <div className='infoCard'>
                  <div className='iconContainer'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
                  </div>
                  <div className='details'>
                    <h3>Email</h3>
                    <p>raquelperez@century.pt</p>
                    <span>Resposta em 24 horas</span>
                  </div>
                </div>

                <div className='infoCard'>
                  <div className='iconContainer'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <circle
                        cx='12'
                        cy='10'
                        r='3'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                  </div>
                  <div className='details'>
                    <h3>Escritório Century 21</h3>
                    <p>
                      Praceta Professor Alfredo de Sousa, 7D
                      <br />
                      1495-072, Oeiras
                    </p>
                    <span>Segunda a Sexta: 10h-19h</span>
                  </div>
                </div>

                <div className='infoCard'>
                  <div className='iconContainer'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <circle
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M2 12h20'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                  </div>
                  <div className='details'>
                    <h3>Redes Sociais</h3>
                    <div className='socialLinks'>
                      <a
                        href='https://www.facebook.com/profile.php?id=61550820177225#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='socialLink facebook'
                      >
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <span>Facebook</span>
                      </a>
                      <a
                        href='https://www.instagram.com/raquelperez.pt/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='socialLink instagram'
                      >
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <rect
                            x='2'
                            y='2'
                            width='20'
                            height='20'
                            rx='5'
                            ry='5'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <path
                            d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='17.5'
                            y1='6.5'
                            x2='17.51'
                            y2='6.5'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                        </svg>
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='contactForm'>
              <h2>Envie uma Mensagem</h2>
              <p className='formDescription'>
                Preencha o formulário abaixo e entrarei em contacto consigo no
                prazo máximo de 24 horas.
              </p>

              {submitMessage && (
                <div className='successMessage'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M22 11.08V12a10 10 0 11-5.93-9.14'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <polyline
                      points='22,4 12,14.01 9,11.01'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className='formGrid'>
                  <div className='formGroup'>
                    <label htmlFor='name'>Nome Completo *</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='O seu nome completo'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='email'>Email *</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='o.seu.email@exemplo.com'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='phone'>Telefone</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='+351 9XX XXX XXX'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='subject'>Assunto *</label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value=''>Selecione o assunto</option>
                      <option value='compra'>Quero Comprar</option>
                      <option value='venda'>Quero Vender</option>
                      <option value='arrendamento'>Arrendamento</option>
                      <option value='avaliacao'>Avaliação Gratuita</option>
                      <option value='investimento'>
                        Consultoria de Investimento
                      </option>
                      <option value='outro'>Outro</option>
                    </select>
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='propertyType'>Tipo de Imóvel</label>
                    <select
                      id='propertyType'
                      name='propertyType'
                      value={formData.propertyType}
                      onChange={handleChange}
                    >
                      <option value=''>Selecione o tipo</option>
                      <option value='apartamento'>Apartamento</option>
                      <option value='moradia'>Moradia</option>
                      <option value='terreno'>Terreno</option>
                      <option value='comercial'>Espaço Comercial</option>
                      <option value='escritorio'>Escritório</option>
                      <option value='armazem'>Armazém</option>
                    </select>
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='budget'>Orçamento (€)</label>
                    <select
                      id='budget'
                      name='budget'
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value=''>Selecione a faixa</option>
                      <option value='ate-150k'>Até 150.000€</option>
                      <option value='150k-300k'>150.000€ - 300.000€</option>
                      <option value='300k-500k'>300.000€ - 500.000€</option>
                      <option value='500k-750k'>500.000€ - 750.000€</option>
                      <option value='750k-1m'>750.000€ - 1.000.000€</option>
                      <option value='acima-1m'>Acima de 1.000.000€</option>
                    </select>
                  </div>
                </div>

                <div className='formGroup fullWidth'>
                  <label htmlFor='message'>Mensagem *</label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows='5'
                    placeholder='Descreva em detalhe o que procura ou pretende vender/arrendar. Inclua localização preferida, características específicas, prazos, etc.'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='submitButton'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className='submitting'>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <circle
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path
                          d='M12 6v6l4 2'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      A enviar...
                    </span>
                  ) : (
                    <span>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <line
                          x1='22'
                          y1='2'
                          x2='11'
                          y2='13'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <polygon
                          points='22,2 15,22 11,13 2,9 22,2'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Enviar Mensagem
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className='mapSection'>
            <h2>Localização do Escritório</h2>
            <div className='mapWrapper'>
              <div className='mapContainer'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.265961594952!2d-9.3982128!3d38.7041916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ec45adccf22cb%3A0x4364b141b9062b85!2sAv.%20S%C3%A3o%20Pedro%201%2C%202765-446%20Estoril!5e0!3m2!1spt-PT!2spt!4v1721134000000'
                  width='100%'
                  height='400'
                  style={{ border: 0 }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Localização do Escritório Century 21'
                ></iframe>
              </div>

              <div className='directions'>
                <h3>Como Chegar</h3>
                <div className='transportGrid'>
                  <div className='transport'>
                    <div className='transportIcon'>🚆</div>
                    <div className='transportInfo'>
                      <strong>Comboio</strong>
                      <p>
                        Estação Estoril (Linha de Cascais)
                        <br />5 minutos a pé
                      </p>
                    </div>
                  </div>

                  <div className='transport'>
                    <div className='transportIcon'>🚌</div>
                    <div className='transportInfo'>
                      <strong>Autocarro</strong>
                      <p>
                        Linhas 418, 427
                        <br />
                        Paragem próxima
                      </p>
                    </div>
                  </div>

                  <div className='transport'>
                    <div className='transportIcon'>🚗</div>
                    <div className='transportInfo'>
                      <strong>Carro</strong>
                      <p>
                        Estacionamento gratuito
                        <br />
                        Casino Estoril ou Praia do Tamariz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
