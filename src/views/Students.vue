<template>
  <div class="students-page">
    <div class="header">
      <h1>👥 All Students</h1>
      <router-link to="/students/add" class="btn btn-add">
        ➕ Add New Student
      </router-link>
    </div>

    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 Search by name, email, or course..."
        class="search-input"
      />
    </div>

    <div v-if="filteredStudents.length === 0" class="empty-state">
      <p>No students found</p>
    </div>

    <div v-else class="students-grid">
      <div 
        v-for="student in filteredStudents" 
        :key="student.id"
        class="student-card"
      >
        <div class="student-avatar" v-if="student.image">
          <img :src="`/std-images/${student.image}`" :alt="student.name" />
        </div>
        <div class="student-avatar" v-else>
          {{ student.name.charAt(0).toUpperCase() }}
        </div>
        <div class="student-info">
          <h3>{{ student.name }}</h3>
          <p class="student-email">📧 {{ student.email }}</p>
          <p class="student-course">📚 {{ student.course }}</p>
          <div class="student-meta">
            <span class="badge">Age: {{ student.age }}</span>
            <span class="badge gpa">GPA: {{ student.gpa }}</span>
          </div>
        </div>
        <div class="student-actions">
          <router-link 
            :to="`/students/${student.id}`" 
            class="btn-icon"
            title="View Details"
          >
            👁️
          </router-link>
          <router-link 
            :to="`/students/${student.id}/edit`" 
            class="btn-icon"
            title="Edit"
          >
            ✏️
          </router-link>
          <button 
            @click="confirmDelete(student)" 
            class="btn-icon btn-delete"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '../store/students'

export default {
  name: 'Students',
  data() {
    return {
      searchQuery: '',
      students: store.students
    }
  },
  computed: {
    filteredStudents() {
      const query = this.searchQuery.toLowerCase().trim()
      if (!query) return this.students
      
      return this.students.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
      )
    }
  },
  mounted() {
    // Fetch students when component mounts
    mutations.fetchStudents()
  },
  methods: {
    async confirmDelete(student) {
      if (confirm(`Are you sure you want to delete ${student.name}?`)) {
        try {
          await mutations.deleteStudent(student.id)
        } catch (error) {
          alert('Error deleting student: ' + error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.students-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
}

.btn-add {
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.search-bar {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 1.2rem;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.student-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  align-items: start;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.student-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  overflow: hidden;
}

.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-info {
  flex: 1;
  min-width: 0;
}

.student-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.student-email,
.student-course {
  margin: 5px 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.student-meta {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 12px;
  background: #e9ecef;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #495057;
  font-weight: 500;
}

.badge.gpa {
  background: #d4edda;
  color: #155724;
}

.student-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 1.1rem;
}

.btn-icon:hover {
  background: #e9ecef;
  transform: scale(1.1);
}

.btn-delete:hover {
  background: #fee;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
  }
}
</style>
