import React, { useState } from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/styles'
import ProfileContent from '../components/Profile/ProfileContent'
import ProfileSidebar from '../components/Profile/ProfileSidebar'

const ProfilePage = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
        <Header/>
        <div
        className={`${styles.section} flex bg-[#f5f5f5] py-10`}
        >   
            <div className='w-[335px]'>
                <ProfileSidebar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active}/>
        </div>
    </div>
  )
}

export default ProfilePage