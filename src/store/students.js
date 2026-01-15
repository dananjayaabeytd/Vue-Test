import Vue from 'vue'
import axios from 'axios'

// Configure axios base URL
const API_URL = 'http://localhost:8000/api'

// Simple reactive store for student data
export const store = Vue.observable({
  students: [],
  loading: false,
  error: null
})

export const mutations = {
  async fetchStudents() {
    store.loading = true
    store.error = null
    try {
      const response = await axios.get(`${API_URL}/students`)
      store.students = response.data
    } catch (error) {
      store.error = error.message
      console.error('Error fetching students:', error)
    } finally {
      store.loading = false
    }
  },

  async addStudent(student) {
    store.loading = true
    store.error = null
    try {
      const response = await axios.post(`${API_URL}/students`, {
        name: student.name,
        email: student.email,
        age: parseInt(student.age),
        course: student.course,
        enrollment_date: student.enrollmentDate,
        gpa: parseFloat(student.gpa),
        image: student.image
      })
      store.students.unshift(response.data)
      return response.data
    } catch (error) {
      store.error = error.response?.data?.message || error.message
      console.error('Error adding student:', error)
      throw error
    } finally {
      store.loading = false
    }
  },
  
  async updateStudent(id, updatedStudent) {
    store.loading = true
    store.error = null
    try {
      const response = await axios.put(`${API_URL}/students/${id}`, {
        name: updatedStudent.name,
        email: updatedStudent.email,
        age: parseInt(updatedStudent.age),
        course: updatedStudent.course,
        enrollment_date: updatedStudent.enrollmentDate,
        gpa: parseFloat(updatedStudent.gpa),
        image: updatedStudent.image
      })
      const index = store.students.findIndex(s => s.id === id)
      if (index !== -1) {
        Vue.set(store.students, index, response.data)
      }
      return response.data
    } catch (error) {
      store.error = error.response?.data?.message || error.message
      console.error('Error updating student:', error)
      throw error
    } finally {
      store.loading = false
    }
  },
  
  async deleteStudent(id) {
    store.loading = true
    store.error = null
    try {
      await axios.delete(`${API_URL}/students/${id}`)
      const index = store.students.findIndex(s => s.id === id)
      if (index !== -1) {
        store.students.splice(index, 1)
      }
    } catch (error) {
      store.error = error.response?.data?.message || error.message
      console.error('Error deleting student:', error)
      throw error
    } finally {
      store.loading = false
    }
  },
  
  async fetchStudent(id) {
    store.loading = true
    store.error = null
    try {
      const response = await axios.get(`${API_URL}/students/${id}`)
      return response.data
    } catch (error) {
      store.error = error.response?.data?.message || error.message
      console.error('Error fetching student:', error)
      throw error
    } finally {
      store.loading = false
    }
  },
  
  getStudent(id) {
    return store.students.find(s => s.id === parseInt(id))
  }
}
