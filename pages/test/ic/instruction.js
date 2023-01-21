import Link from 'next/link'

import styles from './instruction.module.css';

export default function Instruction({postulantId, companyId}) {
	console.log('Instruction')

  return (
      <div className={styles.instruction}>
        <h1 className={styles.instruction__title}>TEST IC</h1>
        <p className={styles['instruction__indication-1']}>Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.</p>
        <hr></hr>
        <p>Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!</p>
        <a 
          className={[styles.instruction__button, styles['instruction__button--lg'], styles['instruction__button--warning']].join(" ")} 
          role="button">Ir a la prueba
          </a>
          <Link
          href={{
            pathname: '/test/ic',
            query: { postulant: postulantId, company: companyId },
          }}
          role="button"
          className={[styles.instruction__button, styles['instruction__button--lg'], styles['instruction__button--warning']].join(" ")} 
        >
          Ir a la prueba
        </Link>
      </div>
  );
}

export async function getServerSideProps({query}) {
  try {
    console.log('getServerSideProps', query.postulant, query.company);
    if (isNaN(query.postulant) || isNaN(query.company)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests-postulants?postulant=${query.postulant}&company=${query.company}&state=${process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID}`
    console.log('getServerSideProps', URL);
    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    console.log('getServerSideProps', testsPortulants);
    if (!Array.isArray(testsPortulants) || testsPortulants.length !== 1) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    return {
      props: {
        postulantId: testsPortulants[0].postulant, 
        companyId: testsPortulants[0].company
      },
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