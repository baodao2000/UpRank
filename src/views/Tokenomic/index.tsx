import Image from 'next/image'
import React from 'react'

function Tokenomic() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #9E86FF 0%, #2B0864 111.24%)',
        gap: '10px',
        height: '100%',
      }}
    >
      <div
        style={
          {
            //   boxShadow: '0px 4px 20px 0px rgba(255, 255, 255, 0.36)',
          }
        }
      >
        <h1
          style={{
            marginTop: '70px',
            fontFamily: 'Raleway,sans-serif',
            fontSize: '48px',
            fontWeight: 800,
            textAlign: 'center',
            color: '#95FFEC',
            textShadow: '1px 1px 6px #95FFEC',
            letterSpacing: '0.04em',
          }}
        >
          Release TREND Token
        </h1>
      </div>

      <div
        style={{
          width: '350px',
          height: '70px',
          borderRadius: '8px',
          padding: '24px 32px 24px 32px',
          gap: '4px',
          boxShadow: '0px 4px 12px 0px #FFFFFF4F inset',
          background:
            'linear-gradient(89.91deg, rgba(147, 255, 229, 0.06) -10.22%, rgba(230, 255, 251, 0.215) 24.44%, rgba(114, 255, 237, 0.175) 58.18%, rgba(183, 255, 248, 0.295) 81.81%, rgba(87, 255, 244, 0.27) 105.99%)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins,sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '22px',
          }}
        >
          Supply: 21,000,000 TREND
        </h1>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Image src="/images/tokenomic.png" alt="tokenomic" width={1500} height={600} />
      </div>
    </div>
  )
}

export default Tokenomic
