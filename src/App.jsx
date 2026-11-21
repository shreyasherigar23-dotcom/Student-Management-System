
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentPages';
import StudentFormPage from './pages/StudentFormPage';
import './App.css';

// Name used to save student list in the browser
const STORAGE_KEY = 'student-management-students';

function App() {

  // Read saved students when the app starts
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // Save students whenever the list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Get the current URL path
  const path = window.location.pathname;

  // Check whether the user wants to edit a student
  const editMatch = path.match(/^\/edit\/([^/]+)$/);

  const studentToEdit = editMatch
    ? students.find((student) => student.id === editMatch[1])
    : null;

  // Add a new student
  function addStudent(studentDetails) {
    const updatedStudents = [
      ...students,
      { ...studentDetails, id: Date.now().toString() },
    ];

    setStudents(updatedStudents);
    window.location.href = '/students';
    console.log('add students data:', updatedStudents);
  }

  // Update student details
  function updateStudent(updatedStudent) {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );

    setStudents(updatedStudents);
    window.location.href = '/students';
  }

  // Delete a student
  function deleteStudent(id) {
    if (window.confirm('Delete this student?')) {
      setStudents(students.filter((student) => student.id !== id));
    }
  }

  // Choose which page to display
  let page;

  if (path === '/students') {
    page = (
      <StudentsPage
        students={students}
        onDelete={deleteStudent}
      />
    );
  } else if (path === '/add-student') {
    page = <StudentFormPage onSave={addStudent} />;
  } else if (editMatch && studentToEdit) {
    page = (
      <StudentFormPage
        student={studentToEdit}
        onSave={updateStudent}
      />
    );
  } else {
    page = <HomePage studentCount={students.length} />;
  }
  console.log('students data',students);

  // Display navbar and selected page
  return (
    <>
      <Navbar />
      {page}
    </>
  );
}

export default App;
