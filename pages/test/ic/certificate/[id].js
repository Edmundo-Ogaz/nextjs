import Head from "next/head";

export default function Certificate({user, date, score, level, correct, wrong, omitted}) {
	console.log('Certificate')

  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          rel="stylesheet" 
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" 
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" 
          crossOrigin="anonymous"
        />
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://edmundoogaz.pythonanywhere.com/static/IC/certificate.css"
        />
      </Head>
    <div className="horizontal">
      <div id="certificate-body">
        <div id="info_sup" className="horizontal">
            <div id="logo" className="full_center">
                <a>Aquí va un logo</a>
            </div>
            <div id="personal_info" className="full_center">
                <div className="full_container full_center">
                    <div className="info_col vertical">
                        <ul className="data">
                            <li>Nombre: {user} </li>
                            <li>RUN: 00.000.000-0</li>
                            <li>Edad: 00</li>
                            <li>Sexo: N/I</li>
                            <li>Ciudad: P/D</li>
                        </ul>
                    </div>
                    <div className="info_col vertical">
                        <ul className="data">
                            <li>Rendido: {date} </li>
                            <li>Válido hasta: P/D</li>
                            <li>Estado: --- </li>
                            <li>Lugar de rendición: Online</li>
                            <li>Cod: --- </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="graph_cont">
            <canvas id="scoreGraph" className="mid-floater" aria-label="Ariagraph" role="img"></canvas>
            <div className="pseudo-mid-floater">
                <div id="puntaje" >
                    <div className="bignum" style={{textAlign: 'center'}}>
                        {score}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {level}
                    </div>
                </div>
                <div>
                <table>
                  <tbody>
                    <tr>
                        <td className="middle">Buenas</td>
                        <td> {correct} </td>
                    </tr>
                    <tr>
                        <td className="middle">Malas</td>
                        <td> {wrong} </td>
                    </tr>
                    <tr>
                        <td className="middle">Omitidas</td>
                        <td> {omitted} </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </div>
            <div className="bottom-floater">
                TEST IC <br/> Test diseñado para medir la eficiencia en el trabajo bajo presión, la reacción ante instrucciones complejas y la tolerancia a la frustración. Se evalua entre 1 y 6 puntos, obteniendo mayor puntaje en cuanto muestre mejor desempeño ante los retos enfrentados.
            </div>
        </div>

        <div id="info_inf">
            <div className="full_container" id="puntajes">
                    <table>
                      <thead>
                        <tr>
                            <th>Puntaje</th>
                            <th>Nivel</th>
                            <th className="bigth">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td className="middle">1</td>
                            <td className="middle">Bajo</td>
                            <td>Dificultad de comprensión de instrucciones elevada, o poco manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">2</td>
                            <td className="middle">Medio Bajo</td>
                            <td>Dificultad de comprensión de instrucciones moderada, o poco manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">3</td>
                            <td className="middle">Medio</td>
                            <td>Presenta problemas leves de comprensión de instrucciones o manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">4</td>
                            <td className="middle">Medio Alto</td>
                            <td>Muestra comprensión de instrucciones y manejo de presión moderado.</td>
                        </tr>
                        <tr>
                            <td className="middle">5</td>
                            <td className="middle">Alto</td>
                            <td>Maneja instrucciones complejas con eficiencia y mantiene el control bajo presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">6</td>
                            <td className="middle">Muy Alto</td>
                            <td>Maneja instrucciones complejas sin difucultades y mantiene el control bajo presión.</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
        </div>
      </div>
      <div className='fixed btnDwn'>
          <a href='#'><i className="fas fa-file-download"></i></a>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps({params}) {
  try {
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    console.log('getServerSideProps');
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/ic/${id}`
    console.log('getServerSideProps', URL);
    const testPortulant = await fetch(URL)
    .then(testPortulant => testPortulant.json())
    console.log('getServerSideProps', testPortulant);
    return { 
      props: { 
        user: 'Tester 1', 
        date: 'Jan. 19, 2023, 9:52 p.m.',
        score: '1', 
        level: 'Nivel Bajo',
        correct: '0', 
        wrong: '19', 
        omitted: '19'
      } 
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}