import { useState } from 'react'
import { WiredCard, WiredButton } from 'wired-elements-react'
import squirt from './assets/squirt.png'
import blanket from './assets/blanket.png'
import explode from './assets/explode.gif'
import hearts from './assets/hearts.gif'
import xs1 from './assets/xs1.jpg'
import xs2 from './assets/xs2.jpg'
import xs3 from './assets/xs3.jpg'  
import './App.css'

function App() {
  const [message, setMessage] = useState(0)
  const [position, setPosition] = useState({ x: '47%', y: '15%' })
  const [teleportCount, setTeleportCount] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [showBlanket, setShowBlanket] = useState(false)
  const [saidNo, setNo] = useState(false)
  const [saidYes, setYes] = useState(false)
  const [showHeartsGif, setShowHeartsGif] = useState(false)
  const [xsImages, setXsImages] = useState([]) // Track xs images positions

  const messages = [
    "hi xam!",
    "i love you so freaking much and every day with you is such a blessing",
    "what the freak where did squirt come from",
    "wait he's running away!! catch him!",
    "oh wait he got sleepy, time to for him to lay",
    "click on him to tuck him in",
    "now that he's asleep...",
    "i have a question for you",
    "will you be my valentine?!!!? 😁",
    "say no again and squirt's gonna get it",
    "this is your last warning.",
    "look what you've done. time to say yes now!"
  ]

  const clickYes = () => {
    setYes(true);
    explodeHearts(); // Show hearts gif when "Yes" is clicked
    generateXsImages(); // Generate random xs images
  }

  const onClick = () => {
    if (teleportCount < 5 && message === 3){
      return
    }
    setMessage(message + 1)
    if (message === 2) {
      teleportSquirt();
    }
  }

  const clickNo = () => {
    setMessage(message + 1)
    if (message >= 10){
      setNo(true);
    }
  }

  const teleportSquirt = () => {
    if (teleportCount === 0) {
      setPosition({ x: '10%', y: '25%' });
      setTeleportCount(teleportCount + 1);
    }
    else if (teleportCount < 5) {
      const randomX = Math.random() * 80 + '%';
      const randomY = Math.random() * 80 + '%';
      setPosition({ x: randomX, y: randomY });
      setTeleportCount(teleportCount + 1);
    } else if (teleportCount === 5) {
      setPosition({  x: '47%', y: '15%' });
      setTeleportCount(teleportCount + 1);
      rotateSquirt();
      setMessage(message + 1);
    }
  }

  const rotateSquirt = () => {
    if (rotation === 0) {
      setRotation(prevRotation => prevRotation + 90);
    }
    else {
      setShowBlanket(true);
      setMessage(message + 1);
    }
  }

  const explodeHearts = () => {
    setShowHeartsGif(true);

  }

  const generateXsImages = () => {
    const newXsImages = [xs1, xs2, xs3].map((src) => ({
      id: Math.random(),
      src,
      x: Math.random() * 80 + '%', // Random X position
      y: Math.random() * 80 + '%', // Random Y position
      animationDelay: `${Math.random() * 0.5}s`, // Slight delay for animation
    }));
    setXsImages(newXsImages);
  }

  return (
    <>
    {
      !saidYes ? (
        <div className='bg-custom w-screen h-screen flex justify-center items-center relative'>
          <WiredCard className='p-8 cursor-pointer gloria bg-white w-1/3 h-1/3 flex flex-col justify-center items-center ' elevation={5}>
            <h1 onClick={onClick} className='text-3xl mb-10 text-center'>{messages[message]}</h1>
            {
              message < 8 ? (
                <h2 className='text-sm text-center'>click on text to continue</h2>
              )
              :
              (
                <div className='flex justify-center items-center space-x-4'>
                  <WiredButton onClick={clickYes}>YES</WiredButton>
                  {
                    !saidNo ? (
                      <WiredButton onClick={clickNo}>NO</WiredButton>
                    )
                    :
                    (
                      <WiredButton onClick={clickYes}>EXTRA YES</WiredButton>
                    )
                  }
                </div>
              )
            }
          </WiredCard>
          {message >= 2 && (
              <img 
                src={squirt} 
                alt='squirt' 
                className='w-32 h-32 absolute transition-all duration-300 cursor-pointer' 
                style={{ left: position.x, top: position.y , transform: `rotate(${rotation}deg)`}}
                onMouseEnter={teleportSquirt} 
                onClick={rotateSquirt}
              />
          )}
          {
            showBlanket && (
              <img 
              src={blanket} 
              alt='blanket' 
              className='w-36 h-24 absolute transition-all duration-300' 
              style={{ left: '44%', top: '17%' , transform: `rotate(${rotation}deg)`}}
            />
            )
          }
          {
            saidNo && (
            <img 
              src={explode} 
              alt='explode' 
              className='w-60 h-40 absolute transition-all duration-300' 
              style={{ left: '44%', top: '13%'}}
            />
            )
          }
        </div>
      )
      : (
        <div className='bg-custom w-screen h-screen flex justify-center items-center'>
          <WiredCard className='p-8 cursor-pointer gloria bg-white w-1/3 h-1/3 flex flex-col justify-center items-center ' elevation={5}>
            <h1 className='text-3xl mb-10 text-center'>YAY I LOVE YOU SO MUCH XAM!!!! EXPECT GIFTS SOON! 😁😁😁😁</h1>
          </WiredCard>
          {showHeartsGif && (
            <img
              src={hearts}
              alt="Hearts"
              className="absolute w-full h-full animate-pulse"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />
          )}
          {xsImages.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt="Xs Image"
              className="absolute transition-all duration-300"
              style={{
                left: image.x,
                top: image.y,
                animationDelay: image.animationDelay,
                width: '15%', // Adjust size as needed
                height: '30%', // Adjust size as needed
              }}
            />
          ))}
        </div>
      )
    }
    </>
  )
}

export default App
