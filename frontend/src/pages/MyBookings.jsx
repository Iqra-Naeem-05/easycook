// // import React, { useEffect, useState } from 'react';
// // import axios from "../api/axiosConfig";
// // // import axios from 'axios';
// // import BookingCard from '../components/UserBookings/BookingCard';
// // import { useLocation } from 'react-router-dom';
// // // import BookingFilterBar from '../components/UserBookings/BookingFilterBar';
// // import BookingFilterBar from '../components/UserBookings/BookingFilterBar'
// // import {FaSpinner } from "react-icons/fa";

// // const MyBookings = () => {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const location = useLocation();
// //   const [successMessage, setSuccessMessage] = useState('');


// //   const [filters, setFilters] = useState({ status: '', type: '', slot: '', is_paid: '' });

// //   const filteredBookings = bookings.filter((booking) => {
// //     const matchesStatus = filters.status ? booking.status === filters.status : true;
// //     const matchesType = filters.type ? booking.booking_type === filters.type : true;
// //     const matchesSlot = filters.slot ? booking.slot_display.toLowerCase() === filters.slot : true;
// //     let matchesPayment = true;
// //     if (filters.is_paid === "True") {
// //       matchesPayment = booking.is_paid === true && booking.status === "completed";
// //     } else if (filters.is_paid === "False") {
// //       matchesPayment = booking.is_paid === false && (booking.status === "confirmed" || booking.status === "completed");
// //     }
// //     return matchesStatus && matchesType && matchesSlot && matchesPayment;
// //   });


// //   useEffect(() => {
// //     // Scroll to top on load
// //     window.scrollTo(0, 0);

// //     // If there is a message from navigation, set it
// //     if (location.state?.successMessage) {
// //       setSuccessMessage(location.state.successMessage);

// //       // Optional: clear the message after a delay
// //       const timer = setTimeout(() => setSuccessMessage(''), 8000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [location.state]);

// //   useEffect(() => {

// //     const fetchBookings = async () => {
// //       try {
// //         const response = await axios.get('/my-bookings/');
// //         console.log('response.data', response.data)

// //         if (Array.isArray(response.data)) {
// //           setBookings(response.data);
// //         } else {
// //           console.error('Unexpected bookings response:', response.data);
// //           setBookings([]); // fallback to empty array if not array
// //         }
// //       } catch (error) {
// //         console.error('Failed to fetch bookings:', error);
// //         setBookings([]); // fallback if error
// //         } finally {
// //           setLoading(false);
// //         }
// //     };

// //     fetchBookings();
// //   }, []);

// //   if (loading) {
// //           return (
// //               <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// //                   <FaSpinner className="spinner-icon fs-1 text-navyBlue" />
// //               </div>
// //           );
// //       }

// //   // if (loading) return <p>Loading...</p>;

// //   if (bookings.length === 0) return <p>No bookings found.</p>;

// //   return (
// //     <>
// //       {successMessage && (
// //         <div className="alert alert-success" role="alert">
// //           {successMessage}
// //         </div>
// //       )}

// //       <div className='mt-4'>
// //         <BookingFilterBar filters={filters} onFilterChange={setFilters} />
// //       </div>

// //       <div className="container row g-3 mx-auto">

// //         <h2 className=' text-brown'>My Bookings:</h2>
// //         {filteredBookings.length === 0 ? (
// //           //  <div className="col-12">
// //            <div className="text-center">
// //              No bookings match the selected filters.
// //            {/* </div> */}
// //          </div>
// //         ) : (
// //           filteredBookings.map((booking) => (
// //             <div className="col-sm-6 col-md-4 col-lg-3" key={booking.id}>
// //               <BookingCard booking={booking} />
// //             </div>
// //           ))
// //         )}

// //       </div>
// //     </>
// //   );
// // };

// // export default MyBookings;

// import React, { useEffect, useState } from 'react';
// import axios from "../api/axiosConfig";
// import BookingCard from '../components/UserBookings/BookingCard';
// import { useLocation } from 'react-router-dom';
// import BookingFilterBar from '../components/UserBookings/BookingFilterBar';
// import { FaSpinner } from "react-icons/fa";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [nextPage, setNextPage] = useState(null);
//   const [previousPage, setPreviousPage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPageUrl, setCurrentPageUrl] = useState('/my-bookings/');

//   const location = useLocation();
//   const [successMessage, setSuccessMessage] = useState('');

//   const [filters, setFilters] = useState({ status: '', type: '', slot: '', is_paid: '' });

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesStatus = filters.status ? booking.status === filters.status : true;
//     const matchesType = filters.type ? booking.booking_type === filters.type : true;
//     const matchesSlot = filters.slot ? booking.slot_display.toLowerCase() === filters.slot : true;
//     let matchesPayment = true;
//     if (filters.is_paid === "True") {
//       matchesPayment = booking.is_paid === true && booking.status === "completed";
//     } else if (filters.is_paid === "False") {
//       matchesPayment = booking.is_paid === false && (booking.status === "confirmed" || booking.status === "completed");
//     }
//     return matchesStatus && matchesType && matchesSlot && matchesPayment;
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (location.state?.successMessage) {
//       setSuccessMessage(location.state.successMessage);
//       const timer = setTimeout(() => setSuccessMessage(''), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [location.state]);

//   const fetchBookings = async (url = '/my-bookings/') => {
//     setLoading(true);
//     try {
//       const response = await axios.get(url);
//       setBookings(response.data.results);
//       setNextPage(response.data.next);
//       setPreviousPage(response.data.previous);
//       setCurrentPageUrl(url);
//     } catch (error) {
//       console.error('Failed to fetch bookings:', error);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleNext = () => {
//     if (nextPage) fetchBookings(nextPage);
//   };

//   const handlePrevious = () => {
//     if (previousPage) fetchBookings(previousPage);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//         <FaSpinner className="spinner-icon fs-1 text-navyBlue" />
//       </div>
//     );
//   }

//   if (bookings.length === 0) return <p>No bookings found.</p>;

//   return (
//     <>
//       {successMessage && (
//         <div className="alert alert-success" role="alert">
//           {successMessage}
//         </div>
//       )}

//       <div className='mt-4'>
//         <BookingFilterBar filters={filters} onFilterChange={setFilters} />
//       </div>

//       <div className="container row g-3 mx-auto">
//         <h2 className='text-brown'>My Bookings:</h2>

//         {filteredBookings.length === 0 ? (
//           <div className="text-center col-12">
//             No bookings match the selected filters.
//           </div>
//         ) : (
//           filteredBookings.map((booking) => (
//             <div className="col-sm-6 col-md-4 col-lg-3" key={booking.id}>
//               <BookingCard booking={booking} />
//             </div>
//           ))
//         )}
//       </div>

//       <div className="d-flex justify-content-center gap-3 align-items-center mt-4 container">
//         <button
//           className="btn btn-outline-primary"
//           onClick={handlePrevious}
//           disabled={!previousPage}
//         >
//           Previous
//         </button>
//         <button
//           className="btn btn-outline-primary"
//           onClick={handleNext}
//           disabled={!nextPage}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default MyBookings;

import React, { useEffect, useState } from 'react';
import axios from "../api/axiosConfig";
import BookingCard from '../components/UserBookings/BookingCard';
import { useLocation } from 'react-router-dom';
import BookingFilterBar from '../components/UserBookings/BookingFilterBar';
import { FaSpinner } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  const [filters, setFilters] = useState({ status: '', type: '', slot: '', is_paid: '' });

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filters.status ? booking.status === filters.status : true;
    const matchesType = filters.type ? booking.booking_type === filters.type : true;
    const matchesSlot = filters.slot ? booking.slot_display.toLowerCase() === filters.slot : true;
    let matchesPayment = true;
    if (filters.is_paid === "True") {
      matchesPayment = booking.is_paid === true && booking.status === "completed";
    } else if (filters.is_paid === "False") {
      matchesPayment = booking.is_paid === false && (booking.status === "confirmed" || booking.status === "completed");
    }
    return matchesStatus && matchesType && matchesSlot && matchesPayment;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => setSuccessMessage(''), 8000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const fetchBookings = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/my-bookings/?page=${pageNum}`);
      setBookings(response.data.results);
      setCount(response.data.count);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setBookings([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const totalPages = Math.ceil(count / 8);

  const handleNext = () => {
    if (page < totalPages) fetchBookings(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) fetchBookings(page - 1);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <FaSpinner className="spinner-icon fs-1 text-navyBlue" />
      </div>
    );
  }

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className='mt-4'>
        <BookingFilterBar filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="container row g-3 mx-auto">
        <h2 className='text-brown'>My Bookings:</h2>

        {filteredBookings.length === 0 ? (
          <div className="text-center col-12">
            No bookings match the selected filters.
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={booking.id}>
              <BookingCard booking={booking} />
            </div>
          ))
        )}
      </div>

      {/* Prev/Next Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}  `}>
                <button className="page-link text-navyBlue" onClick={handlePrevious}>Previous</button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Page {page} of {totalPages}</span>
              </li>
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link text-navyBlue" onClick={handleNext}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default MyBookings;
