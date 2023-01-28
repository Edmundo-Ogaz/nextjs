export default function Email() {
	console.log('Email')

  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')
  let data = {
      name: 'test',
      email: 'test',
      message: 'test'
    }
  fetch('/api/mailchimp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setBody('')
      }
    })
  }
  
    
  

  return (
    <>
        Email < input type='submit' onClick={(e)=>{handleSubmit(e)}}/>
      </>
    );
}
