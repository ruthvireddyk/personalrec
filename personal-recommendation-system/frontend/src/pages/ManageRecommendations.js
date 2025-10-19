import React, { useEffect, useState } from "react";

function ManageRecommendations() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const updateMovie = async (id, updatedMovie) => {
    try {
      await fetch(`http://localhost:5001/api/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/movies/${id}`, {
        method: "DELETE",
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (movie) => {
    const newTitle = prompt("Enter new title:", movie.title);
    const newGenres = prompt("Enter new genres:", movie.genres);
    if (newTitle && newGenres) {
      updateMovie(movie.id, { title: newTitle, genres: newGenres });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#1f1c2c",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
        ⚙️ Manage Recommendations
      </h1>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <thead>
            <tr style={{ background: "#333" }}>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Genres</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} style={{ textAlign: "center" }}>
                <td style={styles.td}>{movie.title}</td>
                <td style={styles.td}>{movie.genres}</td>
                <td style={styles.td}>
                  <div style={styles.actionContainer}>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteMovie(movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: { padding: "10px", border: "1px solid #444", color: "#fff" },
  td: { padding: "10px", border: "1px solid #444" },
  actionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  editBtn: {
    padding: "6px 15px",
    border: "none",
    borderRadius: "5px",
    background: "#3498db",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  deleteBtn: {
    padding: "6px 15px",
    border: "none",
    borderRadius: "5px",
    background: "#e74c3c",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default ManageRecommendations;

// import React, { useEffect, useState } from "react";

// function ManageRecommendations() {
//   // State to manage which table is visible
//   const [currentView, setCurrentView] = useState('movies'); // 'movies', 'books', or 'songs'

//   // State for each data type
//   const [movies, setMovies] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [songs, setSongs] = useState([]);

//   // Loading state for each table
//   const [loadingMovies, setLoadingMovies] = useState(true);
//   const [loadingBooks, setLoadingBooks] = useState(true);
//   const [loadingSongs, setLoadingSongs] = useState(true);

//   // --- Generic Fetch Function ---
//   const fetchData = async (dataType, setData, setLoading) => {
//     setLoading(true);
//     try {
//       const res = await fetch(http://localhost:5001/api/${dataType});
//       const data = await res.json();
//       
//       // Map 'index' from Flask backend to 'id' for React keys/updates
//       if (dataType === 'movies' || dataType === 'songs' || dataType === 'books') {
//         setData(data.map(item => ({ ...item, id: item.index })));
//       } else {
//         setData(data.map((item, idx) => ({ ...item, id: item.index !== undefined ? item.index : idx })));
//       }
//     } catch (err) {
//       console.error(Error fetching ${dataType}:, err);
//       setData([]); // Set to empty array on failure
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Initial Data Fetch on Component Mount ---
//   useEffect(() => {
//     fetchData("movies", setMovies, setLoadingMovies);
//     fetchData("books", setBooks, setLoadingBooks);
//     fetchData("songs", setSongs, setLoadingSongs);
//   }, []);

//   // --- Generic Update and Delete Functions ---
//   const updateItem = async (dataType, id, updatedItem) => {
//     try {
//       const res = await fetch(http://localhost:5001/api/${dataType}/${id}, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedItem),
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || Update failed for ${dataType});
//       }
//       
//       // Re-fetch data for the updated table
//       if (dataType === 'movies') fetchData("movies", setMovies, setLoadingMovies);
//       if (dataType === 'books') fetchData("books", setBooks, setLoadingBooks);
//       if (dataType === 'songs') fetchData("songs", setSongs, setLoadingSongs);

//     } catch (err) {
//       console.error(Error updating ${dataType}:, err.message);
//       alert(Update Error: ${err.message});
//     }
//   };

//   // DELETE is a placeholder (assuming backend doesn't support it yet)
//   const deleteItem = async (dataType, id) => {
//     alert(Delete action for ${dataType}/${id} is currently not implemented in the backend logic.);
//   };

//   // --- Edit Handlers ---
//   const handleEditMovie = (movie) => {
//     const newTitle = prompt("Enter new title:", movie.title);
//     const genresStr = Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres;
//     const newGenres = prompt("Enter new genres (comma-separated):", genresStr);
//     
//     if (newTitle !== null && newGenres !== null) {
//       updateItem('movies', movie.id, { 
//         title: newTitle, 
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '') 
//       });
//     }
//   };
//   
//   const handleEditBook = (book) => {
//     const newTitle = prompt("Enter new title:", book.title);
//     const newAuthor = prompt("Enter new author:", book.authors);
//     
//     const genresStr = Array.isArray(book.genres) ? book.genres.join(", ") : (book.genres || "");
//     const newGenres = prompt("Enter new genres (comma-separated):", genresStr);
//     
//     if (newTitle !== null && newAuthor !== null && newGenres !== null) {
//       updateItem('books', book.id, { 
//         title: newTitle, 
//         authors: newAuthor,
//         // Send genres back as an array for Flask to process
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '')
//       });
//     }
//   };

//   const handleEditSong = (song) => {
//     const newTrackName = prompt("Enter new track name:", song.track_name);
//     const newArtistName = prompt("Enter new artist name:", song.artist_name);
//     const genresStr = Array.isArray(song.genres) ? song.genres.join(", ") : (song.genres || "");
//     const newGenres = prompt("Enter new genres (comma-separated):", genresStr);
//     
//     if (newTrackName !== null && newArtistName !== null && newGenres !== null) {
//       updateItem('songs', song.id, { 
//         track_name: newTrackName, 
//         artist_name: newArtistName,
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '')
//       });
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.mainHeading}>⚙ Manage Content</h1>

//       {/* ----------- VIEW SWITCHER BUTTONS ----------- */}
//       <div style={styles.viewSwitcher}>
//         <button 
//           onClick={() => setCurrentView('movies')}
//           style={currentView === 'movies' ? styles.activeButton : styles.inactiveButton}>
//             🎬 Movies
//         </button>
//         <button 
//           onClick={() => setCurrentView('books')}
//           style={currentView === 'books' ? styles.activeButton : styles.inactiveButton}>
//             📚 Books
//         </button>
//         <button 
//           onClick={() => setCurrentView('songs')}
//           style={currentView === 'songs' ? styles.activeButton : styles.inactiveButton}>
//             🎵 Songs
//         </button>
//       </div>

//       {/* ----------------- MOVIES TABLE ----------------- */}
//       {currentView === 'movies' && (
//         <div style={styles.section}>
//           <h2>Movie Data ({movies.length} items)</h2>
//           {loadingMovies ? <p>Loading movies...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   {/* Explicit width control for fixed layout */}
//                   <th style={{ ...styles.th, width: '40%' }}>Title</th>
//                   <th style={{ ...styles.th, width: '25%' }}>Genres</th>
//                   <th style={{ ...styles.th, width: '10%' }}>Age Group</th>
//                   <th style={{ ...styles.th, width: '10%' }}>Rating</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {movies.map((movie) => (
//                   <tr key={movie.id} style={styles.tr}>
//                     <td style={styles.td}>{movie.title}</td>
//                     <td style={styles.td}>{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</td>
//                     <td style={styles.tdCenter}>{movie.age_group || 'N/A'}</td>
//                     <td style={styles.tdCenter}>{movie.rating ? movie.rating.toFixed(2) : 'N/A'}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditMovie(movie)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('movies', movie.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* ----------------- BOOKS TABLE ----------------- */}
//       {currentView === 'books' && (
//         <div style={styles.section}>
//           <h2>Book Data ({books.length} items)</h2>
//           {loadingBooks ? <p>Loading books...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   {/* Explicit width control for fixed layout */}
//                   <th style={{ ...styles.th, width: '35%' }}>Title</th>
//                   <th style={{ ...styles.th, width: '20%' }}>Author(s)</th>
//                   <th style={{ ...styles.th, width: '20%' }}>Genres (Tags)</th>
//                   <th style={{ ...styles.th, width: '15%' }}>Average Rating</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book) => (
//                   <tr key={book.id} style={styles.tr}> 
//                     <td style={styles.td}>{book.title}</td>
//                     <td style={styles.td}>{book.authors || 'N/A'}</td>
//                     <td style={styles.td}>{Array.isArray(book.genres) ? book.genres.join(', ') : book.genres}</td>
//                     <td style={styles.tdCenter}>{book.average_rating ? book.average_rating.toFixed(2) : 'N/A'}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditBook(book)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('books', book.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* ----------------- SONGS TABLE ----------------- */}
//       {currentView === 'songs' && (
//         <div style={styles.section}>
//           <h2>Song Data ({songs.length} items)</h2>
//           {loadingSongs ? <p>Loading songs...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   {/* Explicit width control for fixed layout */}
//                   <th style={{ ...styles.th, width: '30%' }}>Track Name</th>
//                   <th style={{ ...styles.th, width: '20%' }}>Artist Name</th>
//                   <th style={{ ...styles.th, width: '20%' }}>Genres</th>
//                   <th style={{ ...styles.th, width: '20%' }}>Album Name</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {songs.map((song) => (
//                   <tr key={song.id} style={styles.tr}>
//                     <td style={styles.td}>{song.track_name}</td>
//                     <td style={styles.td}>{song.artist_name}</td>
//                     <td style={styles.td}>{Array.isArray(song.genres) ? song.genres.join(', ') : song.genres}</td>
//                     <td style={styles.td}>{song.album_name || 'N/A'}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditSong(song)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('songs', song.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// /* |--------------------------------------------------------------------------
// | Final Compact Styles Definition
// |--------------------------------------------------------------------------
// | - Uses 'tableLayout: fixed' and explicit widths to control horizontal spacing.
// | - Reduced padding for tighter vertical rows.
// | - Tighter, small rectangular buttons.
// */
// const styles = {
//   // Page & Header Styles
//   page: { padding: "30px", background: "#1f1c2c", color: "#fff", minHeight: "100vh" },
//   mainHeading: { marginBottom: "20px", textAlign: "center", fontSize: "2.5rem" },
//   viewSwitcher: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" },
//   activeButton: { padding: "10px 20px", fontSize: "0.9rem", cursor: "pointer", border: "2px solid #f39c12", background: "#f39c12", color: "#fff", borderRadius: "50px", fontWeight: "bold" },
//   inactiveButton: { padding: "10px 20px", fontSize: "0.9rem", cursor: "pointer", border: "2px solid #555", background: "transparent", color: "#aaa", borderRadius: "50px", fontWeight: "bold" },
//   section: { marginBottom: "50px" },
//   
//   // Table Layout KEY CHANGES: tableLayout: 'fixed'
//   table: { width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden", tableLayout: 'fixed' },
//   trHeader: { background: "#333" },
//   tr: { borderBottom: "1px solid #444" },
//   
//   // Standard Table Cell Styles (Reduced Padding)
//   th: { padding: "6px 8px", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", textAlign: "center", overflow: 'hidden' },
//   // Left align data, reduced vertical padding
//   td: { padding: "6px 8px", fontSize: "0.9rem", textAlign: "left", overflow: 'hidden' }, 
//   
//   // Centered content for rating/group columns
//   tdCenter: { padding: "6px 8px", fontSize: "0.9rem", textAlign: "center", overflow: 'hidden' }, 
//   
//   // Specific Styles for the 'Actions' Column (Fixed Width for consistent alignment)
//   thActions: { padding: "6px 8px", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", width: "120px", textAlign: "center" }, 
//   tdActions: { padding: "4px 8px", fontSize: "0.9rem", width: "120px", textAlign: "center" }, 
//   
//   // Button and Action Container Styles (Tighter Buttons)
//   actionContainer: { 
//     display: "flex", 
//     justifyContent: "center", 
//     gap: "5px",
//     // Ensure the container doesn't stretch the row unnecessarily
//     padding: '2px 0' 
//   },
//   // Tighter, rectangular buttons
//   editBtn: { 
//     padding: "4px 8px", // Very little vertical padding
//     border: "none", 
//     borderRadius: "2px", // Sharp rectangle corners
//     background: "#3498db", 
//     color: "#fff", 
//     fontWeight: "bold", 
//     cursor: "pointer", 
//     fontSize: "0.75rem",
//     whiteSpace: 'nowrap' // Prevents text from wrapping if window is resized
//   },
//   deleteBtn: { 
//     padding: "4px 8px", // Very little vertical padding
//     border: "none", 
//     borderRadius: "2px", 
//     background: "#e74c3c", 
//     color: "#fff", 
//     fontWeight: "bold", 
//     cursor: "pointer", 
//     fontSize: "0.75rem",
//     whiteSpace: 'nowrap'
//   },
// };

// export default ManageRecommendations;
// import React, { useEffect, useState } from "react";

// function ManageRecommendations() {
//   const [currentView, setCurrentView] = useState('movies'); // 'movies', 'books', 'songs'
//   const [movies, setMovies] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [songs, setSongs] = useState([]);
//   const [loadingMovies, setLoadingMovies] = useState(true);
//   const [loadingBooks, setLoadingBooks] = useState(true);
//   const [loadingSongs, setLoadingSongs] = useState(true);

//   const fetchData = async (dataType, setData, setLoading) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5001/api/${dataType}`);
//       const data = await res.json();

//       // ✅ Take only the top 100 items
//       const top100 = data.slice(0, 100);
//       setData(top100.map((item, idx) => ({ ...item, id: item.index ?? idx })));
//     } catch (err) {
//       console.error(`Error fetching ${dataType}:, err);
//       setData([]);
//     } finally {
//       setLoading(false`);
//     }
//   };

//   useEffect(() => {
//     fetchData("movies", setMovies, setLoadingMovies);
//     fetchData("books", setBooks, setLoadingBooks);
//     fetchData("songs", setSongs, setLoadingSongs);
//   }, []);

//   const updateItem = async (dataType, id, updatedItem) => {
//     try {
//       const res = await fetch(`http://localhost:5001/api/${dataType}/${id}, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedItem),
//       }`);
//       if (!res.ok) throw new Error(`Update failed for ${dataType}`);
//       if (dataType === 'movies') fetchData("movies", setMovies, setLoadingMovies);
//       if (dataType === 'books') fetchData("books", setBooks, setLoadingBooks);
//       if (dataType === 'songs') fetchData("songs", setSongs, setLoadingSongs);
//     } catch (err) {
//       console.error(`Error updating ${dataType}:, err.message`);
//       alert(`Update Error: ${err.message}`);
//     }
//   };

//   const deleteItem = async (dataType, id) => {
//     alert(`Delete for ${dataType}/${id} not implemented yet.`);
//   };

//   const handleEditMovie = (movie) => {
//     const newTitle = prompt("Enter new title:", movie.title);
//     const newGenres = prompt("Enter new genres (comma-separated):", Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres);
//     if (newTitle !== null && newGenres !== null) {
//       updateItem('movies', movie.id, { 
//         title: newTitle, 
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '') 
//       });
//     }
//   };

//   const handleEditBook = (book) => {
//     const newTitle = prompt("Enter new title:", book.title);
//     const newAuthor = prompt("Enter new author:", book.authors);
//     const newGenres = prompt("Enter new genres (comma-separated):", Array.isArray(book.genres) ? book.genres.join(", ") : book.genres || "");
//     if (newTitle !== null && newAuthor !== null && newGenres !== null) {
//       updateItem('books', book.id, { 
//         title: newTitle, 
//         authors: newAuthor,
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '')
//       });
//     }
//   };

//   const handleEditSong = (song) => {
//     const newTrack = prompt("Enter new track name:", song.track_name);
//     const newArtist = prompt("Enter new artist name:", song.artist_name);
//     const newGenres = prompt("Enter new genres (comma-separated):", Array.isArray(song.genres) ? song.genres.join(", ") : song.genres || "");
//     if (newTrack !== null && newArtist !== null && newGenres !== null) {
//       updateItem('songs', song.id, { 
//         track_name: newTrack, 
//         artist_name: newArtist,
//         genres: newGenres.split(',').map(g => g.trim()).filter(g => g !== '')
//       });
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.mainHeading}>⚙ Manage Content</h1>
//       <div style={styles.viewSwitcher}>
//         <button onClick={() => setCurrentView('movies')} style={currentView === 'movies' ? styles.activeButton : styles.inactiveButton}>🎬 Movies</button>
//         <button onClick={() => setCurrentView('books')} style={currentView === 'books' ? styles.activeButton : styles.inactiveButton}>📚 Books</button>
//         <button onClick={() => setCurrentView('songs')} style={currentView === 'songs' ? styles.activeButton : styles.inactiveButton}>🎵 Songs</button>
//       </div>

//       {/* Movies Table */}
//       {currentView === 'movies' && (
//         <div style={styles.section}>
//           <h2> Movies</h2>
//           {loadingMovies ? <p>Loading movies...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   <th style={{...styles.th, width:'50%'}}>Title</th>
//                   <th style={{...styles.th, width:'30%'}}>Genres</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {movies.map(movie => (
//                   <tr key={movie.id} style={styles.tr}>
//                     <td style={styles.td}>{movie.title}</td>
//                     <td style={styles.td}>{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditMovie(movie)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('movies', movie.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* Books Table */}
//       {currentView === 'books' && (
//         <div style={styles.section}>
//           <h2> Books</h2>
//           {loadingBooks ? <p>Loading books...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   <th style={{...styles.th, width:'45%'}}>Title</th>
//                   <th style={{...styles.th, width:'25%'}}>Author(s)</th>
//                   <th style={{...styles.th, width:'30%'}}>Genres (Tags)</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map(book => (
//                   <tr key={book.id} style={styles.tr}>
//                     <td style={styles.td}>{book.title}</td>
//                     <td style={styles.td}>{book.authors || 'N/A'}</td>
//                     <td style={styles.td}>{Array.isArray(book.genres) ? book.genres.join(', ') : book.genres}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditBook(book)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('books', book.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* Songs Table */}
//       {currentView === 'songs' && (
//         <div style={styles.section}>
//           <h2>Songs</h2>
//           {loadingSongs ? <p>Loading songs...</p> : (
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.trHeader}>
//                   <th style={{...styles.th, width:'35%'}}>Track Name</th>
//                   <th style={{...styles.th, width:'25%'}}>Artist Name</th>
//                   <th style={{...styles.th, width:'30%'}}>Genres</th>
//                   <th style={styles.thActions}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {songs.map(song => (
//                   <tr key={song.id} style={styles.tr}>
//                     <td style={styles.td}>{song.track_name}</td>
//                     <td style={styles.td}>{song.artist_name}</td>
//                     <td style={styles.td}>{Array.isArray(song.genres) ? song.genres.join(', ') : song.genres}</td>
//                     <td style={styles.tdActions}>
//                       <div style={styles.actionContainer}>
//                         <button style={styles.editBtn} onClick={() => handleEditSong(song)}>Edit</button>
//                         <button style={styles.deleteBtn} onClick={() => deleteItem('songs', song.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//     </div>
//   );
// }

// const styles = {
//   page: { padding: "30px", background: "#1f1c2c", color: "#fff", minHeight: "100vh" },
//   mainHeading: { marginBottom: "20px", textAlign: "center", fontSize: "2.5rem" },
//   viewSwitcher: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" },
//   activeButton: { padding: "10px 20px", fontSize: "0.9rem", cursor: "pointer", border: "2px solid #f39c12", background: "#f39c12", color: "#fff", borderRadius: "50px", fontWeight: "bold" },
//   inactiveButton: { padding: "10px 20px", fontSize: "0.9rem", cursor: "pointer", border: "2px solid #555", background: "transparent", color: "#aaa", borderRadius: "50px", fontWeight: "bold" },
//   section: { marginBottom: "50px" },
//   table: { width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden", tableLayout: 'fixed' },
//   trHeader: { background: "#333" },
//   tr: { borderBottom: "1px solid #444" },
//   th: { padding: "6px 8px", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", textAlign: "center", overflow: 'hidden' },
//   td: { padding: "6px 8px", fontSize: "0.9rem", textAlign: "left", overflow: 'hidden' },
//   tdCenter: { padding: "6px 8px", fontSize: "0.9rem", textAlign: "center", overflow: 'hidden' },
//   thActions: { padding: "6px 8px", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", width: "100px", textAlign: "center" },
//   tdActions: { padding: "4px 6px", fontSize: "0.85rem", width: "100px", textAlign: "center" },
//   actionContainer: { display: "flex", justifyContent: "center", gap: "4px", padding: '2px 0' },
//   editBtn: { padding: "2px 6px", border: "none", borderRadius: "2px", background: "#3498db", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "0.7rem" },
//   deleteBtn: { padding: "2px 6px", border: "none", borderRadius: "2px", background: "#e74c3c", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "0.7rem" },
// };

// export default ManageRecommendations;
