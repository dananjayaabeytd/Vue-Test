import Vue from 'vue'

// Simple reactive store for student data
export const store = Vue.observable({
  students: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 20,
      course: 'Computer Science',
      enrollmentDate: '2023-09-01',
      gpa: 3.8
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: 22,
      course: 'Business Administration',
      enrollmentDate: '2023-09-01',
      gpa: 3.6
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      age: 21,
      course: 'Engineering',
      enrollmentDate: '2023-09-01',
      gpa: 3.9
    }
  ],
  nextId: 4
})

export const mutations = {
  addStudent(student) {
    store.students.push({
      ...student,
      id: store.nextId++
    })
  },
  
  updateStudent(id, updatedStudent) {
    const index = store.students.findIndex(s => s.id === id)
    if (index !== -1) {
      Vue.set(store.students, index, { ...updatedStudent, id })
    }
  },
  
  deleteStudent(id) {
    const index = store.students.findIndex(s => s.id === id)
    if (index !== -1) {
      store.students.splice(index, 1)
    }
  },
  
  getStudent(id) {
    return store.students.find(s => s.id === parseInt(id))
  }
}
