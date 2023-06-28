import Image from 'next/image'
import React from 'react'
import bg from '../../../public/images/backgroundVote.png'

function Vote() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            marginTop: '206px',

            alignItems: 'center',
            display: 'flex',
            height: '473px',
            width: '855px',
            borderRadius: '20px',
            border: '1px',
            background: 'linear-gradient(90deg, #7B3AFD 63%, #5700E5 100%)',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ fontSize: '48px', marginTop: '50px' }}>Vote</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '701px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '701px',
                height: '110px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <Image src="/images/start.png" width="14px" height="13px" />
                <h1>Start date: 29/06/2023</h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <Image src="/images/start.png" width="14px" height="13px" />
                <h1>End date: 30/06/2023</h1>
              </div>
            </div>

            <h1>
              Requested from Kols and the Trendy Defi community development team, as well as the upcoming BTC
              Availability period. The show at Trendy Defi has reached nearly 1000 members who have joined Pool Trendy
              Defi. We will conduct voting on the issue of TREND tokens based on the votes of the members. If there is a
              51% Consensus Rate. Token Trend will be released in July 2023 during the voting period from June 29 to
              June 30, 2023. All methods of conducting the contest will be based on a majority decision.
            </h1>
          </div>

          <button
            style={{ background: '#FFFFFF', width: '161px', height: '41px', borderRadius: '20px', marginTop: '70px' }}
            type="button"
          >
            <h1 style={{ color: '#7A42F1' }}>Vote</h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Vote
