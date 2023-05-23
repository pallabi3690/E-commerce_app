import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="px-2 py-1 bg-gray-100 min-h-screen">
      <header className="bg-white px-4 py-3 shadow">
        <h3 className="text-2xl font-bold">Shopping Cart</h3>
        <nav className="flex gap-x-4 mt-2">
          <Link
            to="/new"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            Create Product
          </Link>
          <Link
            to="/list"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            List
          </Link>
        </nav>
      </header>
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
}


// import { Outlet } from 'react-router'
// import { Link } from 'react-router-dom'
// export default function Layout() {
//   return (
//     <div className='px-2 py-1' >
//       <header>
//         <h3>Shopping-Cart</h3>
//         <nav className='flex gap-x-4' > <Link to="/new">Create Product</Link> <Link to="/list">List</Link> </nav>
//       </header>
//       <main className='' > <Outlet /> </main>
//     </div>
//   )
// }