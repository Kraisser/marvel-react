import errorImg from './404Error.png';

export default function ErrorMessage() {
  return (
    <img src={errorImg} alt="Error"
      style={{
        width: '100%'
      }}/>
  )
}