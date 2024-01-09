import React from 'react'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {

//  const navItems = [
//         {
//           category: "Home",
//           url: "/",
//         },
//         {
//           category: "Best Selling",
//           url: "/best-selling",
//         },
//         {
//           category: "Products",
//           url: "/products",
//         },
//         {
//           category: "Events",
//           url: "/events",
//         },
//         {
//           category: "FAQ",
//           url: "/faq",
//         },
//       ];
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
        {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                        {i.category}
                    </Link>
                </div>
            ))
        }
        {/* <div className='flex justify-between'>
            <Link to={"/"}
            className={`${active ===  1 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
                Home
            </Link>
            <Link to={"/best-selling"}
            className={`${active ===  2 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
                Best Seeling
            </Link>
            <Link to={"/products"}
            className={`${active ===  3 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
                Products
            </Link>
            <Link to={"/events"}
            className={`${active ===  4 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
                Events
            </Link>
            <Link to={"/faq"}
            className={`${active ===  5 ? "text-[#17dd1f]" :  "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
                Faq
            </Link>
        </div> */}
    </div>
  )
}

export default Navbar